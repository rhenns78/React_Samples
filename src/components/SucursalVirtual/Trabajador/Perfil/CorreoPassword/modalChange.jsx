import React from "react";
import { connect } from "react-redux";
import { Button, Popup, TextBox } from "devextreme-react";
import validacion from "../../../../../helpers/validaciones";

import { Tooltip } from "devextreme-react/ui/tooltip";
import LoadingOverlay from "../../../../Shared/LoadingOverlay";
import { mailValidation, doChangedMail, updateMyData, doChangePassword } from "../MisDatos/actions";
const cancelButtonStyle = {
  paddingLeft: 30,
  paddingRight: 30,
};

const buttonStyle = {
  paddingLeft: 30,
  paddingRight: 30,
};

class ModalMesseges extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = this.initialState;

    this.emailComponent = React.createRef();
    this.repeatComponent = React.createRef();
    this.currentPassComponent = React.createRef();
    this.passComponent = React.createRef();
    this.repeatPassComponent = React.createRef();
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):

    if (this.props.mailChanged !== prevProps.mailChanged) {
      if (this.props.mailChanged === true) {
        this.setState({
          messege: `¿Esta seguro de asociar tu cuenta al nuevo correo ${this.state.personalData.email} ?`,
          red: false,
          isEmailFormHide: true,
        });
      }
      if (this.props.mailChanged === false) {
        if (this.state.personalData.email !== null) {
          this.setState({
            messege: ` ${this.state.personalData.email}, ya existe en nuestros registros. Por favor, intente con otro correo `,
            red: true,
            isEmailFormHide: false,
            fromIsValid: false,
          });
        }
      }
    }
  }
  get initialState() {
    return {
      fromIsValid: false,
      isEmailFormHide: false,
      messege: null,
      red: false,
      personalData: {
        email: null,
        emailRepeat: null,
        isValidMail: false,
        isValidRepeat: false,

      },
      password: {
        oldPass: null,
        pass: null,
        rePass: null,
        isValidOldPass: false,
        isValidPass: false,
        isValidRepeatPass: false,
      },

      formPassValid: false,
    };
  }
  resetBuilder() {
    this.setState(this.initialState);
  }

  handleCerrar = () => {
    this.resetBuilder();
    this.props.closeModalCall();
  }


  handleUpdateEmail = () => {
    this.props.dispatch(mailValidation(this.state.personalData.email));
  }
  doUpdateEmail = () => {
    // cambio directamente el mail
    if (this.props.renderForm === "changeEmail") {
      // this.props.profile.Email = this.state.personalData.email;

      this.props.dispatch(doChangedMail(this.props.profile, this.state.personalData.email, this.props.mailChanged, this.props.UserInfo));
    } else
    if (this.props.renderForm === "alternativeEmail") {
      const profile = this.props.profile;
      profile.AlternativeEmail = this.state.personalData.email;
      this.props.dispatch(updateMyData(profile));
    }

    this.handleCerrar();
  }
  handlePaste = (e) => {
    e.event.preventDefault();
  }
  handleChangeEmail(e) {
    const ident = (typeof e === "object") ? e.element.id : "";
    let errorTxt = "";
    // const errorTxtR = "";
    const personalData = Object.assign({}, this.state.personalData);

    switch (ident) {
      case "email": {
        if (e.value !== "") {
          if (!validacion.validarEmail(e.value.toLowerCase())) {
            errorTxt = "Formato correo electrónico inválido";
            personalData.isValidMail = false;
          } else {
            personalData.isValidMail = true;
          }

          if (personalData.emailRepeat) {
            if (e.value.toLowerCase() !== personalData.emailRepeat) {
              errorTxt = "El mail no coincide here";
              personalData.isValidRepeat = false;
              this.repeatComponent.option({
                validationError: { message: errorTxt },
                isValid: personalData.isValidRepeat,
              });
            } else {
              personalData.isValidMail = true;
              personalData.isValidRepeat = true;
              this.repeatComponent.option({
                validationError: { message: errorTxt },
                isValid: personalData.isValidRepeat,
              });
            }
          }
        } else {
          errorTxt = "El mail no puede estar vacio";
          personalData.isValidMail = false;
        }
        e.component.option({
          validationError: { message: errorTxt },
          isValid: personalData.isValidMail,
        });

        personalData.email = e.value.toLowerCase();


        break;
      }
      case "emailRepeat": {
        if (e.value !== "") {
          if (!validacion.validarEmail(e.value.toLowerCase())) {
            errorTxt = "Formato correo electrónico inválido";
            personalData.isValidRepeat = false;
          } else {
            personalData.isValidRepeat = true;
          }

          if (e.value.toLowerCase() !== personalData.email) {
            errorTxt = "El mail no coincide";
            personalData.isValidRepeat = false;
          } else {
            personalData.isValidRepeat = true;
            personalData.isValidMail = true;
            this.emailComponent.option({
              validationError: { message: errorTxt },
              isValid: personalData.isValidMail,
            });
          }
        } else {
          errorTxt = "El mail no puede estar vacio";
          personalData.isValidRepeat = false;
        }

        e.component.option({
          validationError: { message: errorTxt },
          isValid: personalData.isValidRepeat,
        });
        personalData.emailRepeat = e.value.toLowerCase();

        break;
      }


      default:
        break;
    }
    this.setState({
      personalData,
      fromIsValid: !!((personalData.isValidMail && personalData.isValidRepeat)),
    });
  }
  handleChangePassword(e) {
    const ident = (typeof e === "object") ? e.element.id : "";
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

    const password = Object.assign({}, this.state.password);
    // zSv@8pg.123
    let errorTxt = "";

    switch (ident) {
      case "oldPass": {
        if (e.value !== "") {
          if (!strongRegex.test(e.value)) {
            errorTxt = "Formato contraseña inválido";
            password.isValidOldPass = false;
          } else {
            password.isValidOldPass = true;
          }
        } else {
          errorTxt = "Debe Ingresar contraseña actual";
          password.isValidPass = false;
        }
        if (password.pass) {
          if (e.value === password.pass) {
            errorTxt = "Nueva Contraseña no puede ser igual a la antigua";
            password.isValidPass = false;
          } else {
            password.isValidPass = true;
            password.isValidOldPass = true;
          }
          this.passComponent.option({
            validationError: { message: errorTxt },
            isValid: password.isValidPass,
          });
        }
        e.component.option({
          validationError: { message: errorTxt },
          isValid: password.isValidOldPass,
        });
        password.oldPass = e.value;

        console.log("oldpass:", e.value);

        break;
      }
      case "pass": {
        if (e.value !== "") {
          if (!strongRegex.test(e.value)) {
            errorTxt = "Formato contraseña inválido";
            password.isValidPass = false;
          } else {
            password.isValidPass = true;
          }
          if (password.oldPass) {
            if (e.value === password.oldPass) {
              errorTxt = "Nueva Contraseña no puede ser igual a la antigua";
              password.isValidPass = false;
            } else {
              password.isValidPass = true;
            }
          }
          if (password.rePass) {
            if (e.value !== password.rePass) {
              errorTxt = "Nueva contraseña y confirmación de contraseña no coinciden";
              password.isValidPass = false;
            } else {
              password.isValidPass = true;
              password.isValidRepeatPass = true;
            }
            this.repeatPassComponent.option({
              validationError: { message: errorTxt },
              isValid: password.isValidRepeatPass,
            });
          }
          e.component.option({
            validationError: { message: errorTxt },
            isValid: password.isValidPass,
          });
          password.pass = e.value;
        } else {
          e.component.option({
            validationError: { message: "Nueva contraseña no puede quedar vacia" },
            isValid: false,
          });
        }


        console.log("pass:", e.value);

        break;
      }
      case "rePass": {
        if (e.value !== "") {
          if (!strongRegex.test(e.value)) {
            errorTxt = "Formato contraseña inválido";
            password.isValidRepeatPass = false;
          } else {
            password.isValidRepeatPass = true;
          }
          if (password.oldPass) {
            if (password.oldPass === password.pass) {
              errorTxt = "Nueva Contraseña no puede ser igual a la antigua";
              password.isValidPass = false;
              password.isValidRepeatPass = false;
              password.isValidOldPass = false;
            } else {
              password.isValidPass = true;
              password.isValidRepeatPass = true;
              password.isValidOldPass = true;
            }
            this.passComponent.option({
              validationError: { message: errorTxt },
              isValid: password.isValidPass,
            });
          } else if (password.pass) {
            if (e.value !== password.pass) {
              errorTxt = "Nueva contraseña y confirmación de contraseña no coinciden";
              password.isValidRepeatPas = false;
              password.isValidPass = false;
            } else {
              password.isValidPass = true;
              password.isValidRepeatPass = true;
            }
            this.passComponent.option({
              validationError: { message: errorTxt },
              isValid: password.isValidPass,
            });
          }
        } else {
          errorTxt = "Confirmación de contraseña no puede quedar vacia";
          password.isValidRepeatPass = false;
        }


        e.component.option({
          validationError: { message: errorTxt },
          isValid: password.isValidRepeatPass,
        });
        password.rePass = e.value;

        console.log("oldpass:>", password.oldPass, "newpass:>", password.pass, "repass:", e.value);
        break;
      }

      default:
        break;
    }
    this.setState({
      password,
      formPassValid: !!((password.isValidPass && password.isValidRepeatPass && password.isValidOldPass)),
    });
  }

  changeMessege = (renderForm) => {
    let messge = "";
    switch (renderForm) {
      case "changeEmail": {
        if (this.state.messege === null) {
          messge = `Tu correo actual es ${this.props.profile.Email}, si lo decides cambiar recuerda que también va a cambiar tu credencial para iniciar sesión la próxima vez`;
        } else {
          messge = this.state.messege;
        }
        break;
      }
      case "alternativeEmail": {
        if (this.state.messege === null) {
          messge = "Agregar un correo alternativo te permite recuperar cuenta a través de otro correo, como también recibir notificaciones en otra dirección";
        } else {
          messge = this.state.messege;
        }
        break;
      }
      case "changePassword": {
        messge = this.state.messege;
        break;
      }


      default:
        break;
    }

    return (messge);
  }


  doChangePassword() {
    const Data = {};
    Data.Email = this.props.profile.Email;
    Data.oldPass = this.state.password.oldPass;
    Data.NewPassword = this.state.password.pass;
    Data.NewPasswordConfirmation = this.state.password.rePass;
    this.props.dispatch(doChangePassword(Data));
    this.handleCerrar();
  }
  renderChangePassword = () => (

    <React.Fragment >


      <div className="acceso row">

        <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
          <h3><p className="text-left">Contraseña Actual</p></h3>
          <TextBox
            id="oldPass"
            placeholder="Contraseña"
            mode="password"
            onValueChanged={this.handleChangePassword}
            // valueChangeEvent="focusout"
            // ref={(ref) => ref != null ? this.passComponent = ref.instance : null}

          />


        </div>
        <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
          <h3><p className="text-left">Nueva Contraseña</p></h3>
          <TextBox
            id="pass"
            placeholder="Contraseña"
            mode="password"
            onValueChanged={this.handleChangePassword}
            // valueChangeEvent="focusout"
            ref={(ref) => ref != null ? this.passComponent = ref.instance : null}
            onFocusIn={() => this.setState({ showTooltip: true })}
            onFocusOut={() => this.setState({ showTooltip: false })}
          />
          <Tooltip
            visible={this.state.showTooltip}
            contentRender={() =>
              (<div>La contraseña debe contener mínimo 8 caracteres, una mayúscula y un número
               </div>)}
            position="right"
            target="#pass"
          />

        </div>
        <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
          <h3><p className="text-left">Repetir Nueva Contraseña</p></h3>
          <TextBox
            id="rePass"
            placeholder="Repetir Contraseña"
            mode="password"
            ref={(ref) => ref != null ? this.repeatPassComponent = ref.instance : null}
            onPaste={this.handlePaste}
            onValueChanged={this.handleChangePassword}
          // valueChangeEvent="focusout"
          />
        </div>
      </div>

    </React.Fragment>
  )

  renderEmailForm = () => (

    <React.Fragment >


      <div className="acceso row">
        <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
          <h3><p className="text-left">Nuevo correo</p></h3>
          <TextBox
            className="lowercaseText"
            id="email"
            placeholder="Nuevo correo"
            ref={(ref) => ref != null ? this.emailComponent = ref.instance : null}
            onValueChanged={this.handleChangeEmail}
            valueChangeEvent="focusout"
          >

          </TextBox>
        </div>
        <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
          <h3><p className="text-left">Repetir nuevo correo</p></h3>
          <TextBox
            className="lowercaseText"
            id="emailRepeat"
            placeholder="Repetir nuevo correo"
            ref={(ref) => ref != null ? this.repeatComponent = ref.instance : null}
            onValueChanged={this.handleChangeEmail}
            onPaste={this.handlePaste}
            valueChangeEvent="focusout"
            value={this.state.personalData.emailRepeat}
          >

          </TextBox>
        </div>

      </div>

    </React.Fragment>
  )

  render() {
    const {
      open,
      title,
      renderForm,

    } = this.props;


    return (
      <Popup
        visible={open}
        dragEnabled={false}
        maxHeight={this.state.isEmailFormHide === false ? "390px" : "200px"}
        onHiding={this.handleCerrar}
        maxWidth="500px"
        title={title}
        showTitle
        contentRender={() => (<div>
          {this.props.isLoading && <LoadingOverlay />}


          <div className="col-12" style={{ justifyContent: "center" }}>
            <div
              style={{
                color: (this.state.red ? "red" : "#787878"), width: "100%", textAlign: "center", fontSize: 12,
              }}
            >
              { this.changeMessege(renderForm) }
            </div>
          </div>

          {(renderForm === "changeEmail" || renderForm === "alternativeEmail") && this.state.isEmailFormHide === false && this.renderEmailForm()}
          {(renderForm === "changePassword") && this.state.isEmailFormHide === false && this.renderChangePassword()}
          <div
            style={{
              position: "fixed", bottom: 10, width: "87%", textAlign: "center",
            }}
          >
            <Button
              text="Cerrar"
              type="normal"
              onClick={this.handleCerrar}
              style={{ ...cancelButtonStyle, marginRight: 15 }}
            />
            {/* boton changemail */}
            {renderForm === "changeEmail" || renderForm === "alternativeEmail" ?
              <Button
                text={this.state.isEmailFormHide === false ? "Aceptar" : "Cambiar"}
                type="success"
                style={buttonStyle}
                onClick={this.state.isEmailFormHide === false ? this.handleUpdateEmail : this.doUpdateEmail}
                disabled={!(this.state.fromIsValid)}
              />
              :
              null
            }
            {renderForm === "changePassword" &&
              <Button
                text="Cambiar"
                type="success"
                style={buttonStyle}
                disabled={!(this.state.formPassValid)}
                onClick={() => this.doChangePassword()}

              />}

          </div>

        </div>)}
      />
    );
  }
}


const mapStateToProps = (state) => ({
  isLoading: state.misDatos.isLoading,
  UserInfo: state.global.userData,
  profile: state.misDatos.profile,
  mailChanged: state.misDatos.mailChanged,
  preventNavigation: state.global.preventNavigation,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalMesseges);
