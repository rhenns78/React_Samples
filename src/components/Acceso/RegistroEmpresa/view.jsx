import React from "react";
import { connect } from "react-redux";
import Stepper from "react-stepper-horizontal";
import styles from "../../../styles/stylesgenerales";
import validacion from "../../../helpers/validaciones";
import { Button, TextBox, TextArea } from "devextreme-react";
import { push } from "connected-react-router";
import { paths } from "../../../config/routes";
import { doSendNewSolicitud, cleanRequestCompanyId, setMessageRutCompany } from "./actions";
import LoadingOverlay from "../../Shared/LoadingOverlay";
import logo from "../../../images/logoachs.png";

class RegistroTemporal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formValid: false,
      companyData: {
        rut: null,
        isValidRut: false,
      },
      description: props.skipValidation ? "La identidad del usuario no pudo ser validada" : null,
      isValidDesc: !!props.skipValidation,


    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    if (this.props.UserInfo.Rut == null) {
      this.backToLogin();
    }
  }

  backToLogin() {
    this.props.dispatch(push(paths.root));
  }

  newCompanyRequest() {
    this.props.dispatch(cleanRequestCompanyId());
    this.setState({ formValid: false, companyData: { rut: null, isValidRut: false } });
  }

  handleChange(e) {
    const ident = (typeof e === "object") ? e.element.id : "";
    let errorTxt = "";
    const companyData = Object.assign({}, this.state.companyData);
    let description = this.state.description;
    let isValidDesc = this.state.isValidDesc;
    this.props.dispatch(setMessageRutCompany(""));

    switch (ident) {
      case "rutEmpresa": {
        if (validacion.validateRut(e.value) === false) {
          errorTxt = "Formato de rut inválido";
          companyData.isValidRut = false;
        } else {
          companyData.isValidRut = true;
        }

        if (companyData.isValidRut) {
          e.value = validacion.formatRut(e.value, { showDots: true, showHyphen: true });
        }

        e.component.option({
          validationError: { message: errorTxt },
          isValid: companyData.isValidRut,
        });
        companyData.rut = e.value;

        break;
      }
      case "descSolicitud": {
        description = e.value;

        if (e.value == null || e.value.trim() === "") {
          isValidDesc = false;
        } else {
          isValidDesc = true;
        }

        break;
      }


      default:
        break;
    }
    this.setState({
      isValidDesc, description, companyData, formValid: !!companyData.isValidRut,
    });
  }
  sendCompanyId() {
    const rutEmpresa = validacion.formatRut(this.state.companyData.rut, { showDots: false, showHyphen: true });
    this.props.UserInfo.Rut = validacion.formatRut(this.props.UserInfo.Rut, { showDots: false, showHyphen: true });
    this.props.dispatch(doSendNewSolicitud(this.props.UserInfo, rutEmpresa, this.state.description));
  }

  rendeRegistroTemporal() {
    const typeBtn = (this.state.formValid) ? "default" : "default";
    return (
      <center>
        <div className="acceso row">
          <Stepper
            activeStep={4}
            circleTop={15}
            activeColor="#00963a"
            completeColor="#0C652F"
            steps={[
              { title: "Registro" },
              { title: "Terminos y Condiciones" },
              { title: "Validar identidad" },
              { title: "Contraseña" },
              { title: "Enviar solicitud" },
            ]}
          />
          <div className="tituloLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
            <h2> Solicitar acceso a una empresa</h2>
          </div>
          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
            <p className="text-center"> Ingrese el rut de la empresa a la cual quiere solicitar acceso </p>
          </div>
          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
            <h3><p className="text-left">Rut empresa</p></h3>
            <TextBox
              id="rutEmpresa"
              placeholder="Rut empresa"
              onValueChanged={this.handleChange}
              valueChangeEvent="focusout"
              value={this.state.companyData.rut}
            />
            {!this.props.skipValidation && <React.Fragment><h3 style={{ marginTop: 10 }}><p className="text-left">Descripción solicitud</p></h3>
              <TextArea
                id="descSolicitud"
                placeholder="Descripción"
                maxLength={200}
                height={100}
                value={this.state.description}
                onValueChanged={this.handleChange}
                valueChangeEvent="focusout"
              />
                                           </React.Fragment>}
          </div>
          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
            <p style={{ color: "#E62A3B" }} className="danger text-center"> {this.props.messageRutCompany} </p>
          </div>
          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: "center" }}>
            {this.props.numCompanyRequest === 5 ?
              <Button text="Finalizar" style={styles.fullWidth} type="default" onClick={() => this.backToLogin()} />
              :
              <Button text="Enviar" style={styles.fullWidth} type={typeBtn} disabled={!(this.state.formValid && this.state.isValidDesc)} onClick={() => this.sendCompanyId()} />

            }


          </div>
        </div>
      </center>);
  }

  rendeRegistroSuccess() {
    return (
      <center>
        <div className="acceso row">
          <div className="tituloLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
            <h2> Solicitud Enviada</h2>
          </div>
          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
            <p className="text-center"> La solicitud fue enviada, puede ingresar otra solicitud o revisar su estado al acceder a ACHS Virtual con tus credenciales. </p>
          </div>


          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: "center" }}>
            <Button text="Finalizar" style={styles.fullWidth} type="default" onClick={() => this.backToLogin()} />
          </div>
          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: "center" }}>
            <Button text="Enviar Nueva Solicitud" style={styles.fullWidth} type="success" onClick={() => this.newCompanyRequest()} />
          </div>
        </div>
      </center>);
  }

  render() {
    return (
      <div className="zero row" style={{ justifyContent: "center", height: "100%", overflowY: "auto" }}>
        <div className="zero col-xs-12 col-sm-12 col-md-6 col-lg-5 col-xl-4" >
          <div className="zero container-fluid">
            { this.props.isLoading && <LoadingOverlay style={{ height: 700 }} /> }
            <div className="zero row">
              <div className="col-12" >
                <Button style={styles.backLogin} icon="back" onClick={() => this.backToLogin()} />
              </div>
            </div>
            <center>
              <div className="zero row">
                <div className="headerLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                  <img src={logo} alt="" style={styles.logoLogin} height="65px" />
                  {/* <h1 style={{ textAlign: "center", paddingTop: 20 }}> Solicitar Empresa </h1> */}
                </div>
              </div>
              <div className="zero row">
                { !this.props.rutValid ? this.rendeRegistroTemporal() : this.rendeRegistroSuccess()}
              </div>
            </center>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  UserInfo: state.userRegister.UserInfo,
  messageRutCompany: state.userTemp.messageRutCompany,
  rutValid: state.userTemp.rutValid,
  numCompanyRequest: state.userTemp.numCompanyRequest,
  isLoading: state.global.isLoading,
  skipValidation: state.userRegister.skipValidation,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistroTemporal);

