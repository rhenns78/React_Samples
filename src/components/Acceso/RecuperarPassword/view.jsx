import React from "react";
import { connect } from "react-redux";

import styles from "../../../styles/stylesgenerales";
import validacion from "../../../helpers/validaciones";
import Campanias from "../../Acceso/Campanias/view";
import logo from "../../../images/logoachs.png";

import {
  setCodeError, resetState, doGetUserOptions, disableNext,
  doSendCode, doValidateCode, doChangePassword, enableNext,
} from "./actions";

import Step1 from "./DatosPersonales/Step1";
import Step2 from "./SendCode/Step2";
import Step3 from "./ValidateCode/step3";
import Step4 from "./NewPass/step4";
import Step5 from "./success";
import LoadingOverlay from "../../Shared/LoadingOverlay";
import validaciones from "../../../helpers/validaciones";


class RecuperarPassword extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      code: "",
      type: null,
      select: "",
    };

    props.dispatch(resetState());
  }

  validateUser = () => {
    let user = this.state.user;
    if (this.state.type === "RUN") {
      user = validaciones.formatRut(user, { showDots: false, showHyphen: true });
    }
    this.props.dispatch(doGetUserOptions(user));
  }

  handleSendCode = () => {
    this.props.dispatch(doSendCode(
      this.state.select,
      this.props.email,
      this.props.isTemporal,
    ));
  }

  handleValidateCode = () => {
    this.props.dispatch(doValidateCode(this.state.code, this.props.email));
  }

  handleNewPass = (newPassword, passConfirmation) => {
    this.props.dispatch(doChangePassword({
      email: this.props.email,
      code: this.state.code,
      isTemporal: this.props.isTemporal,
      pass: newPassword,
      passConfirmation,
    }));
  }

  handleFullCode = (fullCode) => {
    if (fullCode) {
      this.props.dispatch(setCodeError(false));
      this.setState({ code: fullCode });
      this.props.dispatch(enableNext());
    } else {
      this.setState({ fullCode: "" });
      this.props.dispatch(disableNext());
    }
  }

  handleChange = (e) => {
    switch (e.element.id) {
      case "user":
        let errorEmailRut = "";
        let isValid = true;
        let validacionTpo = "";
        let value = e.value;

        if (validacion.validarEmail(e.value) === false && validacion.validateRut(e.value) === false) {
          errorEmailRut = "Formato de rut o correo electrónico inválido";
          isValid = false;
        } else if (validacion.validarEmail(e.value)) {
          validacionTpo = "EMAIL";
        } else if (validacion.validateRut(e.value)) {
          validacionTpo = "RUN";
        }

        if (isValid) this.props.dispatch(enableNext());
        else this.props.dispatch(disableNext());

        if (validacionTpo === "RUN") {
          value = validaciones.formatRut(value, { showDots: true, showHyphen: true });
        }

        this.setState({
          user: value,
          type: validacionTpo,
        });
        e.component.option({
          validationError: { message: errorEmailRut },
          isValid,
        });
        break;
      case "rut":
        this.setState({ select: e.value });
        this.props.dispatch(enableNext());
        break;
      default:
        break;
    }
  }

  renderBody = () => {
    switch (this.props.step) {
      case 0:
        return (
          <Step1
            disabled={this.props.disableNext}
            handleChange={this.handleChange}
            error={this.props.userInfoError}
            nextStep={this.validateUser}
            value={this.state.user}
          />);
      case 1:
        const {
          email, phone,
        } = this.props;
        return (
          <Step2
            nextStep={this.handleSendCode}
            options={[email, phone]}
            handleChange={this.handleChange}
            disabled={this.props.disableNext}
          />);
      case 2:
        return (
          <Step3
            nextStep={this.handleValidateCode}
            codeError={this.props.codeError}
            disabled={this.props.disableNext}
            reSend={this.handleSendCode}
            handleFullCode={this.handleFullCode}
          />);
      case 3:
        return (
          <Step4
            nextStep={this.handleNewPass}
            disabled={this.props.disableNext}

          />
        );
      case 4:
        return (
          <Step5 nextStep={this.backToLogin} />);
      default:
        break;
    }
  }

  render() {
    return (
      <div className="zero row">
        <div className="zero d-none d-md-block col-xs-8 col-sm-8 col-md-6 col-lg-7 col-xl-8" style={{ backgroundColor: "#004A52", height: "100vh" }} >
          <Campanias />
        </div>
        <div className="zero col-xs-12 col-sm-12 col-md-6 col-lg-5 col-xl-4" >
          <div className="zero container-fluid">
            <div className="zero row" >
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" >
              </div>
            </div>
            <center>
              <div className="zero row">
                <div className="headerLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                  <img src={logo} alt="" style={styles.logoLogin} height="65px" />
                  <h2 style={{ textAlign: "center", paddingTop: 20 }}> Restablecer contraseña </h2>
                </div>
              </div>
              {this.props.isLoading && <LoadingOverlay />}

              {this.renderBody()}
            </center>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  step: state.recover.step,
  validationCode: state.recover.validationCode,
  codeError: state.recover.codeError,
  email: state.recover.email,
  phone: state.recover.phone,
  isLoading: state.recover.isLoading,
  userInfoError: state.recover.userInfoError,
  isTemporal: state.recover.isTemporal,
  disableNext: state.recover.disableNext,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(RecuperarPassword);
