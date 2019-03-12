import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import styles from "../../../../styles/stylesgenerales";
import { Button, TextBox } from "devextreme-react";
import validacion from "../../../../helpers/validaciones";
import { doValidateEmailRut, cleanRegisterStep, setValidNSerieCI } from "../actions";
import LoadingOverlay from "../../../Shared/LoadingOverlay";
import { Tooltip } from "devextreme-react/ui/tooltip";
import CarnetImg from "../../../../images/carnet.png";
import { paths } from "../../../../config/routes";
import validaciones from "../../../../helpers/validaciones";


class PersonalData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      fromOneValid: false,
      showTooltip: false,
      showTooltip2: false,
      personalData: {
        rutUsuario: null,
        email: null,
        emailRepeat: "",
        serieCI: null,
        phone: null,
        isValidRut: false,
        isValidMail: false,
        isValidSerialCI: false,
      },
    };
    // Paso Uno
    this.validateUser = this.validateUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.emailComponent = React.createRef();
    this.repeatComponent = React.createRef();
  }
  // Paso Uno
  handleChange(e) {
    const ident = (typeof e === "object") ? e.element.id : "";
    let errorTxt = "";
    const personalData = Object.assign({}, this.state.personalData);
    switch (ident) {
      case "rut": {
        if (validacion.validateRut(e.value) === false) {
          errorTxt = "Formato de rut inválido";
          personalData.isValidRut = false;
        } else {
          personalData.isValidRut = true;
        }
        e.component.option({
          validationError: { message: errorTxt },
          isValid: personalData.isValidRut,
        });
        personalData.rutUsuario = e.value;
        if (personalData.isValidRut) {
          personalData.rutUsuario =  validaciones.formatRut(e.value, {showDots: true, showHyphen: true});
          // action que valida rut
        }

        break;
      }
      case "email": {
        if (!validacion.validarEmail(e.value)) {
          errorTxt = "Formato correo electrónico inválido";
          personalData.isValidMail = false;
        } else {
          personalData.isValidMail = true;
        }

        if (personalData.emailRepeat) {
          if (e.value !== personalData.emailRepeat) {
            errorTxt = "El mail no coincide";
            personalData.isValidMail = false;
          } else {
            personalData.isValidMail = true;
            this.repeatComponent.option({
              validationError: { message: errorTxt},
              isValid: personalData.isValidMail
            });
          }
        }

        e.component.option({
          validationError: { message: errorTxt },
          isValid: personalData.isValidMail,
        });
        personalData.email = e.value;


        break;
      }
      case "emailRepeat": {
        if (!validacion.validarEmail(e.value)) {
          errorTxt = "Formato correo electrónico inválido";
          personalData.isValidMail = false;
        } else {
          personalData.isValidMail = true;
        }

        if (e.value !== personalData.email) {
          errorTxt = "El mail no coincide";
          personalData.isValidMail = false;
        } else {
          personalData.isValidMail = true;
          this.emailComponent.option({
            validationError: { message: errorTxt},
            isValid: personalData.isValidMail
          });
        }
        e.component.option({
          validationError: { message: errorTxt },
          isValid: personalData.isValidMail,
        });
        personalData.emailRepeat = e.value;
        break;
      }
      case "serialCI": {
        if (!validacion.validateSeieCI(e.value)) {
          errorTxt = "Formato acepta máximo 10 caracteres, entre números o letras";
          personalData.isValidSerialCI = false;
        } else {
          personalData.isValidSerialCI = true;
        }
        e.component.option({
          validationError: { message: errorTxt },
          isValid: personalData.isValidSerialCI,
        });

        personalData.serieCI = e.value;
        !this.props.validCINumber && this.props.dispatch(setValidNSerieCI(true));

        break;
      }
      case "telefono": {
        let valid = true;
        if (e.value.length > 0) {
          if (!validacion.validateCellPhone(e.value)) {
            errorTxt = "Formato télefono invalido";
            valid = false;
          } else {
            valid = true;
          }
        }
        e.component.option({
          validationError: { message: errorTxt },
          isValid: valid,
        });
        personalData.phone = e.value;
        break;
      }

      default:
        break;
    }


    this.setState({
      personalData,
      fromOneValid: !!((personalData.isValidMail && personalData.isValidRut
      && personalData.isValidSerialCI && personalData.emailRepeat)),
    });
  }

  handlePaste = (e) => {
    e.event.preventDefault();
  }

  validateUser() {
    // validar rut and email
    this.props.dispatch(doValidateEmailRut(this.state.personalData));
  }
  redirect(url) {
    if (url === "login") {
      this.props.dispatch(cleanRegisterStep());
      this.props.dispatch(push(paths.root));
    }
    if (url === "recuperar") {
      this.props.dispatch(cleanRegisterStep());
      this.props.dispatch(push(paths.recuperarContraseña));
    }
  }
  personalDataRender() {
    const typeBtn = (this.state.personalData.personId && this.state.personalData.email && this.state.personalData.serieCI) ? "default" : "default";
    const isSerieCIValid = this.state.personalData.serieCI ? this.state.personalData.isValidSerialCI && this.props.validCINumber : true;
    const msg = this.props.emailValid ? <h4>Este correo ya fue registrado, intente iniciar sesión o restablecer su contraseña en caso que no la recuerde</h4> : this.props.rutValid ? <h4>Este rut ya fue registrado, intente iniciando sesión o restableciendo su contraseña en caso que no la recuerde</h4> : null;
    return (
      <center>
        { !this.props.emailValid && !this.props.rutValid ?
          <div className="acceso row">
            { this.props.isLoading && <LoadingOverlay style={{ height: 720 }} /> }
            <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
              <h3><p className="text-left">Rut</p></h3>
              <TextBox
                className="uppercaseText"
                id="rut"
                placeholder="Rut"
                value={this.state.personalData.rutUsuario}
                // onKeyDown={this.handlePaste}
                onValueChanged={this.handleChange}
                valueChangeEvent="focusout"
              />
            </div>
            <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
              <Tooltip
                visible={this.state.showTooltip2}
                contentRender={() => <div><img style={{ height: 320 }} src={CarnetImg} alt="carnet" /></div>}
                position="right"
                target="#serialCI"
              />
              <h3><p className="text-left">N° de Serie CI</p></h3>
              <TextBox
                id="serialCI"
                onFocusIn={() => this.setState({ showTooltip2: true })}
                onFocusOut={() => this.setState({ showTooltip2: false })}
                isValid={isSerieCIValid}
                useMaskedValue
                placeholder="Serial CI"
                maxLength={10}
                valueChangeEvent="focusout"
                onValueChanged={this.handleChange}
              />
            </div>
            <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
              <h3><p className="text-left">Mail</p></h3>
              <TextBox
                className="lowercaseText"
                id="email"
                placeholder="Mail"
                ref={(ref) => ref != null ? this.emailComponent = ref.instance : null}
                onValueChanged={this.handleChange}
                valueChangeEvent="focusout"
              />
            </div>
            <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
              <h3><p className="text-left">Repetir mail</p></h3>
              <TextBox
                className="lowercaseText"
                id="emailRepeat"
                placeholder="Repetir mail ingresado"
                ref={(ref) => ref != null ? this.repeatComponent = ref.instance : null}
                onValueChanged={this.handleChange}
                onPaste={this.handlePaste}
                valueChangeEvent="change"
                value={this.state.personalData.emailRepeat}
              />
            </div>
            <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
              <h3><p className="text-left">Teléfono</p></h3>
              <TextBox
                id="telefono"
                mask="+56\900000000"
                useMaskedValue
                placeholder="Teléfono"
                onPaste={this.handlePaste}
                valueChangeEvent="change"
                onValueChanged={this.handleChange}
                onFocusIn={() => this.setState({ showTooltip: true })}
                onFocusOut={() => this.setState({ showTooltip: false })}
              />
              <Tooltip
                visible={this.state.showTooltip}
                contentRender={() =>
                  (<div>El número que ingreses será exclusivamente para <br />
                        recuperar el acceso a tu cuenta a través de un SMS <br />
                        en caso que pierdas tu contraseña
                  </div>)}
                position="right"
                target="#telefono"
              />
            </div>
            <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: "center" }}>
              <Button style={styles.fullWidth} text="Siguiente" type={typeBtn} disabled={!(this.state.fromOneValid)} onClick={this.validateUser} />
            </div>
          </div>
          :
          <div className="acceso row">
            <div className="tituloLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
              {msg}
            </div>
            <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: "center" }}>
              {/* eslint-disable-next-line */}
              <Button text="Iniciar sesión" style={styles.fullWidth} type={typeBtn} onClick={() => {this.redirect('login')}} />
            </div>
            <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: "center" }}>
              <Button text="Restablecer contraseña" style={styles.fullWidth} type="success" onClick={() => { this.redirect("recuperar"); }} />
            </div>
          </div>
        }
      </center>
    );
  }

  render() {
    return (

      <div className="zero container-fluid">
        {this.personalDataRender()}
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  emailValid: state.userRegister.emailValid,
  rutValid: state.userRegister.rutValid,
  validCINumber: state.userRegister.validCINumber,
  isLoading: state.global.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalData);

