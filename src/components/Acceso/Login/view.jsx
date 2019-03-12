import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { TextBox, Button } from "devextreme-react";

import ReactAI from "react-appinsights";
import createHistory from "history/createBrowserHistory";
import validacion from "../../../helpers/validaciones";
import styles from "../../../styles/stylesgenerales";
import logo from "../../../images/logoachs.png";
// import appStore from "../../../images/appStore.png";
// import googlePlay from "../../../images/googlePlay.png";
import Campanias from "../../Acceso/Campanias/view";
// import { Tooltip } from "devextreme-react/ui/tooltip";
import { paths } from "../../../config/routes";
import {
  setDataLogin, doLogin, setMessageLogin, disableButton,
  doValidation, showPassInput, accountIsActive, doResendActivation, doLoginTemp,
} from "./actions";

import LoadingOverlay from "../../Shared/LoadingOverlay";
import { cleanRegisterStep } from "../Registro/actions";

const history = createHistory();
ReactAI.init({ instrumentationKey: "8a1c69be-30ce-4375-9d1b-3868061eb863" }, history);

// setMessageLogin
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.userRegitserView = this.userRegitserView.bind(this);
  }

  componentDidMount = () => {
    this.props.dispatch(setMessageLogin(""));
  }

  handleLoginSteps = () => {
    if (!this.props.data.Username) {
      this.props.dispatch(setMessageLogin("Ingresa tu rut o email"));
      return;
    }
    if (this.props.showPassInput) {
      if (!this.props.data.Password) {
        this.props.dispatch(setMessageLogin("Ingresa tu contraseña"));
        return;
      }
      this.logIn();
    } else {
      this.props.dispatch(doValidation(this.props.data));
    }
  }

  handleResendActivation = () => {
    this.props.dispatch(doResendActivation(this.props.activeUserData, this.props.data));
  }

  resetLoginview = () => {
    this.props.dispatch(showPassInput(false));
    this.props.dispatch(accountIsActive(true));
    this.props.dispatch(disableButton(true));
    this.props.dispatch(setMessageLogin());
    this.props.dispatch(setDataLogin({
      Username: null,
      Password: null,
      AuthType: null,
    }));
  }

  handleChange(e) {
    const ident = (typeof e === "object") ? e.element.id : "";
    const { data } = this.props;

    switch (ident) {
      case "email": {
        if (this.props.showPassInput) {
          if (e.value === "") {
            this.resetLoginview();
          }
          return;
        }
        this.props.dispatch(setMessageLogin());
        let errorEmailRut = "";
        let isValid = true;
        let validacionTpo = "";

        e.value = e.value.replace(/\s+/g, " ").replace(/^\s+|\s+$/, "").trim();

        if (validacion.validarEmail(e.value) === false && validacion.validateRut(e.value) === false) {
          errorEmailRut = "Formato de rut o correo electrónico inválido";
          isValid = false;
        } else if (validacion.validarEmail(e.value)) {
          validacionTpo = "EMAIL";
        } else if (validacion.validateRut(e.value)) {
          validacionTpo = "RUN";
        }

        let { value } = e;
        if (validacionTpo === "RUN") {
          value = validacion.formatRut(e.value, { showDots: true, showHyphen: true });
        }

        e.component.option({
          validationError: { message: errorEmailRut },
          isValid,
        });

        data.AuthType = validacionTpo;
        data.Username = value;
        this.props.dispatch(disableButton(!isValid));
        break;
      }
      case "pass": {
        if (e.value === "") {
          e.component.option({
            validationError: { message: "Contraseña no puede estar vacía" },
            isValid: false,
          });
          this.props.dispatch(disableButton(true));
          break;
        }

        this.props.dispatch(setMessageLogin());
        this.props.dispatch(disableButton(false));
        data.Password = e.value;
        break;
      }

      default:
        break;
    }
    this.props.dispatch(setDataLogin(data));
  }

  logIn() {
    if (this.props.isAccountTemp) {
      this.props.dispatch(doLoginTemp(this.props.data));
    } else {
      this.props.dispatch(doLogin(this.props.data));
    }
  }

  userRegitserView() {
    this.resetLoginview();
    this.props.dispatch(cleanRegisterStep());
    this.props.dispatch(push(paths.registro));
  }

  passwordRecoveryView = () => {
    this.props.dispatch(push(paths.recuperarContraseña));
  }

  render() {
    const typeBoton = (this.props.data.Username && this.props.data.Password) ? "default" : "default";

    return (
      <div className="zero row" style={{ position: "relative" }}>
        <div className="zero d-none d-md-block col-xs-8 col-sm-8 col-md-6 col-lg-7 col-xl-8" style={{ backgroundColor: "#004A52", height: "100vh" }} >
          <Campanias />
        </div>
        <div
          className="zero col-xs-12 col-sm-12 col-md-6 col-lg-5 col-xl-4"
          style={{
            overflowY: "auto", position: "absolute", right: 0, height: "100%",
          }}
        >
          <center>
            <div className="zero container-fluid">
              <div className="zero row">
                <div className="headerLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                  <img src={logo} alt="" style={styles.logoLogin} height="65px" />
                </div>
              </div>

              <div className="acceso row" >
                {this.props.isLoading && <LoadingOverlay style={{ height: 660 }} />}
                <div className="tituloLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                  <h2>Iniciar Sesión</h2>
                </div>
                {!this.props.isAccountActive &&
                  <div className="componentesLogin justify-content-md-center col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                    <h2>
                      <p style={{ color: "#E62A3B" }} className="danger">
                        Su cuenta aún no se encuentra activada, puede reenviar el correo de activación, activarla, restablecer su contraseña e ingresar.
                      </p>
                    </h2>
                  </div>
                }
                <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >

                  <h3> <p className="text-left success">Usuario</p></h3>
                  <TextBox
                    id="email"
                    onEnterKey={this.props.data.Username !== "" && this.props.data.Username !== null ? this.handleLoginSteps : null}
                    className={this.props.showPassInput ? "color-input" : "input"}
                    // onFocusIn={() => this.setState({ showTooltip: true })}
                    // onFocusOut={() => this.setState({ showTooltip: false })}
                    placeholder="Rut o dirección de correo electrónico"
                    onValueChanged={this.handleChange}
                    valueChangeEvent={this.props.showPassInput ? "input" : "focusout"}
                    value={this.props.data.Username}
                    activeStateEnabled={!this.props.showPassInput}
                    showClearButton={this.props.showPassInput}
                  />
                </div>
                {this.props.showPassInput && this.props.isAccountActive
                  && (
                    <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                      <h3><p className="text-left success">Contraseña</p></h3>
                      <TextBox
                        id="pass"
                        placeholder="Contraseña"
                        mode="password"
                        onValueChanged={this.handleChange}
                        value={this.props.data.Password}
                        valueChangeEvent="focusout"
                      />
                    </div>
                  )}
                <div className="componentesLogin justify-content-md-center col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                  <h3>{this.props.message == null ? "" : <p style={{ color: "#E62A3B" }} className="danger" > {this.props.message} </p>}</h3>
                </div>

                <div className="componentesLogin justify-content-md-center col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  {this.props.isAccountActive ?
                    <Button
                      style={styles.fullWidth}
                      text="Iniciar Sesión"
                      type={typeBoton}
                      onClick={this.handleLoginSteps}
                    /> :
                    <Button
                      style={styles.fullWidth}
                      text="Reenviar correo de activación"
                      type="success"
                      onClick={this.handleResendActivation}
                    />
                  }
                </div>

                <div className="contrasena justify-content-center col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  {/* eslint-disable-next-line */}
                  <a onClick={this.passwordRecoveryView} style={{ cursor: 'pointer', textDecoration: "underline" }}><h5> ¿Olvidaste tu contraseña? </h5></a>
                </div>

                <div className="registro justify-content-center col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <Button style={styles.fullWidth} text="Registrar Usuario" type="success" onClick={() => this.userRegitserView()} />
                </div>
              </div>
            </div>
          </center>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.login.data,
  message: state.login.message,
  isLoading: state.global.isLoading,
  showPassInput: state.login.showPassInput,
  isAccountTemp: state.login.isAccountTemp,
  disableButton: state.login.disableButton,
  isAccountActive: state.login.isAccountActive,
  activeUserData: state.login.activeUserData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login); ReactAI.withTracking(Login);

