import React from "react";
import { connect } from "react-redux";

import styles from "../../../../styles/stylesgenerales";
import { Button, TextBox } from "devextreme-react";
import {
  // createUserAD,
  doCreateUserTempBD } from "../actions";
import { paths } from "../../../../config/routes";
import LoadingOverlay from "../../../Shared/LoadingOverlay";
import { Tooltip } from "devextreme-react/ui/tooltip";

class CreatePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: null,
      rePass: null,
      formPassValid: false,
      showTooltip: false,
    };


    // paso cuatro
    this.handleChangePassword = this.handleChangePassword.bind(this);

    // success
  }

  handlePaste = (e) => {
    e.event.preventDefault();
  }

  // paso cuatro
  handleChangePassword(e) {
    const ident = (typeof e === "object") ? e.element.id : "";
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    // zSv@8pg.123

    switch (ident) {
      case "pass": {
        let valid = true;
        valid = strongRegex.test(e.value);
        e.component.option({
          validationError: { message: "Contraseña no cumple con los parámetros mínimos" },
          isValid: valid,
        });

        this.setState({ pass: e.value });

        break;
      }
      case "rePass": {
        let valid = true;
        if (this.state.pass !== null) {
          valid = this.state.pass === e.value;
        }
        e.component.option({
          validationError: { message: "La contraseña no coincide con la anterior" },
          isValid: valid,
        });
        this.setState({ rePass: e.value, formPassValid: valid });

        break;
      }

      default:
        break;
    }
  }
  doCreateUser() {
    const personalData = this.props.UserInfo;
    personalData.Password = this.state.pass;
    personalData.UserType = "emailAddress";

    if (this.props.UserInfo.TempBD) {
      // llamo action para agregar registro en base temporal
      this.props.dispatch(doCreateUserTempBD(personalData, paths.registroEmpresa));
    }
  }
  renderCreatePassword() {
    const typeBtn = (this.state.formPassValid) ? "default" : "default";
    return (
      <center>
        <div className="acceso row">
          { this.props.isLoading && <LoadingOverlay style={{ height: 700 }} /> }
          <div className="tituloLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
            <h4> Crear Contraseña</h4>
          </div>
          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
            <p style={{ color: "#E62A3B" }} className="danger text-center"> {this.props.messageCreateUser} </p>
          </div>
          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
            <h3><p className="text-left">Contraseña</p></h3>
            <Tooltip
              visible={this.state.showTooltip}
              contentRender={() =>
                (<div>La contraseña debe contener mínimo 8 caracteres, una mayúscula y un número
                </div>)}
              position="right"
              target="#pass"
            />
            <TextBox
              id="pass"
              placeholder="Contraseña"
              mode="password"
              onValueChanged={this.handleChangePassword}
              valueChangeEvent="focusout"
              onFocusIn={() => this.setState({ showTooltip: true })}
              onFocusOut={() => this.setState({ showTooltip: false })}
            />
          </div>
          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >

            <h3><p className="text-left">Repetir Contraseña</p></h3>
            <TextBox
              id="rePass"
              placeholder="Repetir Contraseña"
              mode="password"
              onPaste={this.handlePaste}
              onValueChanged={this.handleChangePassword}
              valueChangeEvent="focusout"
            />
          </div>
          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                 Utiliza ocho caracteres como mínimo con una combinación de letras, números y símbolos
          </div>
          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: "center" }}>
            <Button text="Siguiente" style={styles.fullWidth} type={typeBtn} disabled={!(this.state.formPassValid)} onClick={() => this.doCreateUser()} />
          </div>
        </div>
      </center>);
  }


  render() {
    return (

      <div className="container-fluid" style={{ padding: 0, margin: 0 }}>
        {this.renderCreatePassword()}
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  UserInfo: state.userRegister.UserInfo,
  messageCreateUser: state.userRegister.messageCreateUser,
  isLoading: state.global.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePassword);

