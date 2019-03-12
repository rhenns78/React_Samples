import React from "react";
import { connect } from "react-redux";

import styles from "../../../../styles/stylesgenerales";
import { Button, TextBox, DateBox, ValidationGroup, ValidationSummary, Validator } from "devextreme-react";
import { setUserInfo, userRegisterStep, createUserAD } from "../actions";
import validaciones from "../../../../helpers/validaciones";
import LoadingOverlay from "../../../Shared/LoadingOverlay";

class PersonalDataValidate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Birthdate: null,
    };

    // Paso Uno
    this.validateUser = this.validateUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getBirthDate = this.getBirthDate.bind(this);
  }
  // Paso Uno
  handleChange(e) {
    const ident = (typeof e === "object") ? e.element.id : "";
    const personalData = this.props.UserInfo;

    switch (ident) {
      case "firstName": {
        personalData.FirstName = e.value;
        break;
      }
      case "lastName": {
        personalData.LastName = e.value;
        break;
      }
      case "mothersName": {
        personalData.MothersName = e.value;
        break;
      }
      default:
        break;
    }

    this.props.dispatch(setUserInfo(personalData));
  }

  getBirthDate = (evento) => {
    if (evento.value) {
      this.setState({ Birthdate: validaciones.getDateFormat(evento.value) });
    } else {
      this.setState({ Birthdate: null });
    }
  };

  personalData() {
    return (
      <ValidationGroup>
        <center>
          <div className="acceso row">
            { this.props.isLoading && <LoadingOverlay style={{ height: 600 }} /> }
            <div className="tituloLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
              <h4>Validación de datos personales </h4>
              <ValidationSummary />
            </div>
            <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
              <h3><p className="text-left">Rut</p></h3>
              <TextBox
                id="rut"
                placeholder="Rut"
                onValueChanged={this.handleChange}
                value={this.props.UserInfo.Rut}
                valueChangeEvent="input"
                disabled={this.props.UserInfo.Rut !== null}
              >
                <Validator
                  validationRules={[{
                    type: "required",
                    message: "Rut es requerido",
                  }]}
                />
              </TextBox>
            </div>
            <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
              <h3><p className="text-left">Nombre</p></h3>
              <TextBox
                id="firstName"
                placeholder="Nombre"
                onValueChanged={this.handleChange}
                value={this.props.UserInfo.FirstName}
                valueChangeEvent="input"
              >
                <Validator
                  validationRules={[{
                    type: "required",
                    message: "Nombre es requerido",
                  }]}
                />
              </TextBox>
            </div>
            <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
              <h3><p className="text-left">Apellido Paterno</p></h3>
              <TextBox
                id="lastName"
                placeholder="Apellido Paterno"
                value={this.props.UserInfo.LastName}
                onValueChanged={this.handleChange}
                valueChangeEvent="input"
              >
                <Validator
                  validationRules={[{
                    type: "required",
                    message: "Apellido Paterno es requerido",
                  }]}
                />
              </TextBox>
            </div>
            <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
              <h3><p className="text-left">Apellido Materno</p></h3>
              <TextBox
                id="mothersName"
                placeholder="Apellido Materno"
                onValueChanged={this.handleChange}
                value={this.props.UserInfo.MothersName}
                valueChangeEvent="input"
              >
                <Validator
                  validationRules={[{
                    type: "required",
                    message: "Apellido Materno es requerido",
                  }]}
                />
              </TextBox>
            </div>
            <div className="componentesLogin text-left col-xs-12 col-sm-12 col-md-12 col-lg-12" >
              <h3><p className="text-left">Fecha Nacimiento </p></h3>
              <DateBox
                // max={new Date()}
                min="1900-01-01"
                id="DayBirth"
                placeholder="DD/MM/AAAA"
                onValueChanged={this.getBirthDate}
                displayFormat="dd-MM-yyy"
                useMaskBehavior
                showClearButton
                value={this.props.UserInfo.Birthdate ? validaciones.getDateFormat(this.props.UserInfo.Birthdate) : this.state.Birthdate}
                disabled={!!this.props.UserInfo.Birthdate}
                type="date"
                fullWidth

              >
                <Validator
                  validationRules={[{
                    type: "required",
                    message: "Fecha Nacimiento es requerido",
                  }]}
                />
              </DateBox>
            </div>
            <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: "center" }}>
              <Button style={styles.fullWidth} text="Siguiente" type="default" onClick={this.validateUser} />
            </div>
          </div>
        </center>
      </ValidationGroup>
    );
  }
  validateUser(params) {
    const result = params.validationGroup.validate();
    if (result.isValid) {
      // Paso 5
      const steps = {
        stepOne: false,
        stepTwo: false,
        stepThree: false,
        stepFour: false,
        stepFive: true,
        stepSuccess: false,
      };

      const personalData = this.props.UserInfo;

      if (personalData.Birthdate === null) {
        personalData.Birthdate = this.state.Birthdate;
        this.props.dispatch(setUserInfo(personalData));
      }
      if (personalData.TempBD === false) {
        // se crea una String random como password y se crea el usuario AD
        personalData.UserType = "emailAddress";
        personalData.Password = Math.random().toString(36).substring(2);
        this.props.dispatch(createUserAD(personalData));
      } else {
        this.props.dispatch(userRegisterStep(steps));
      }
    }
  }
  render() {
    return (

      <div className="zero container-fluid">
        {this.personalData()}
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  UserInfo: state.userRegister.UserInfo,
  isLoading: state.global.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDataValidate);

