import React from "react";
import { connect } from "react-redux";
import Stepper from "react-stepper-horizontal";

import styles from "../../../styles/stylesgenerales";
import logo from "../../../images/logoachs.png";

// import { changeRouteApp } from "../../Main/actions";

import PersonalData from "./DatosPersonales/view";

import Conditions from "./Condiciones/view";
import QuestionsFrom from "./Preguntas/view";
import CreatePassword from "./CrearPassword/view";
import ValidateUserInfo from "./ValidarDatosPersonales/view";

class Registro extends React.Component {
  getActiveStep = () => {
    if (this.props.steps.stepOne) return 0;
    if (this.props.steps.stepTwo) return 1;
    if (this.props.steps.stepThree) return 2;
    if (this.props.steps.stepFour) return 2;
    if (this.props.steps.stepFive) return 3;
    if (this.props.steps.stepSuccess) return 4;
    return 0;
  }

  // paso cuatro
  renderSuccess() {
    return (
      <center>
        <div className="acceso row">
          <div className="tituloLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
              Se ha registrado con éxito
          </div>
          <div className="componenteLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
              Se ha enviado un correo electrónico a la dirección {this.props.UserInfo.Email},
              con la información de su usuario registrado en ACHS. <br />
              Si no recibe el correo revise en la carpeta de Spam o Correos no deseado.
          </div>
          <div className="componenteLogin col-xs-12 col-sm-12 col-md-12 col-lg-12">
           
          </div>
        </div>
      </center>
    );
  }


  render() {
    const activeStep = this.getActiveStep();
    const steps = [
      { title: "Términos y Condiciones" },
      { title: "Registro" },
      { title: "Validar identidad" },
      { title: "Contraseña" },
      { title: "Enviar solicitud" },
    ];

    const stepsAD = [
      { title: "Términos y Condiciones" },
      { title: "Registro" },
      { title: "Validar identidad" },
    ];

    return (
      <div className="zero row" style={{ justifyContent: "center", height: "100%", overflowY: "auto" }}>
        <div className="zero col-xs-12 col-sm-12 col-md-6 col-lg-5 col-xl-4" >
          <div className="zero container-fluid">
            <div className="zero row">
              <div className="col-12" >
              </div>
            </div>
            <center>
              <div className="zero row">
                <div className="headerLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                  <img src={logo} alt="" style={styles.logoLogin} height="65px" />
                </div>
              </div>
              <div className="zero row">
                <div className="tituloLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                  <h2 style={{ textAlign: "center" }}> Registrar Usuario </h2>
                  {!(this.props.emailValid || this.props.rutValid) && <Stepper
                    className="stepper-registro"
                    activeStep={activeStep}
                    circleTop={15}
                    activeColor="#00963a"
                    completeColor="#0C652F"
                    steps={this.props.UserInfo.TempBD ? steps : stepsAD}
                  />}
                </div>
              </div>
              <div className="zero row">
                { this.props.steps.stepOne && <Conditions /> }
                { this.props.steps.stepTwo && <PersonalData />}
                { this.props.steps.stepThree && <QuestionsFrom />}
                { this.props.steps.stepFour && <ValidateUserInfo />}
                { this.props.steps.stepFive && <CreatePassword />}
                { this.props.steps.stepSuccess && this.renderSuccess() }

              </div>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  steps: state.userRegister.steps,
  UserInfo: state.userRegister.UserInfo,
  emailValid: state.userRegister.emailValid,
  rutValid: state.userRegister.rutValid,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Registro);

