import React from "react";
import { Button, TextBox } from "devextreme-react";
import styles from "../../styles/stylesgenerales";
import { Tooltip } from "devextreme-react/ui/tooltip";

const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

class PasswordFields extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pass: "",
      isValid: false,
      isValidRepeat: false,
      passRepeat: "",
      showTooltip: false,
    };
  }

  handlePaste = (e) => {
    e.event.preventDefault();
  }

  handleButtonClick = () => {
    this.props.callBack(this.state.pass, this.state.passRepeat);
  }

  handleChange = (e) => {
    let valid = true;

    switch (e.element.id) {
      case "password":
        valid = strongRegex.test(e.value);

        if (this.state.passRepeat !== "") {
          valid = e.value === this.state.passRepeat;
          e.component.option({
            validationError: { message: "La contraseña no coincide" },
            isValid: valid,
          });
        } else {
          e.component.option({
            validationError: { message: "Contraseña no cumple con los parámetros mínimos" },
            isValid: valid,
          });
        }

        this.setState({ pass: e.value, isValid: valid });
        break;
      case "passwordRepeat":
        if (this.state.pass !== null) {
          valid = this.state.pass === e.value;
        }
        e.component.option({
          validationError: { message: "La contraseña no coincide con la anterior" },
          isValid: valid,
        });
        this.setState({
          passRepeat: e.value,
          isValidRepeat: valid,
        });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
          <h3><p className="text-left">Contraseña</p></h3>
          <Tooltip
            visible={this.state.showTooltip}
            contentRender={() =>
              (<div>La contraseña debe contener mínimo 8 caracteres,<br />  una mayúscula, un número y un símbolo.
               </div>)}
            position="top"
            target="#password"
          />
          <TextBox
            id="password"
            placeholder="Contraseña"
            mode="password"
            onValueChanged={this.handleChange}
            valueChangeEvent="input"
            onFocusIn={() => this.setState({ showTooltip: true })}
            onFocusOut={() => this.setState({ showTooltip: false })}
          />
        </div>

        <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
          <h3><p className="text-left">Repetir contraseña</p></h3>
          <TextBox
            id="passwordRepeat"
            mode="password"
            onPaste={this.handlePaste}
            placeholder="Repetir contraseña"
            onValueChanged={this.handleChange}
            valueChangeEvent="input"
          />
        </div>

        <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: "center" }}>
          <Button
style={styles.fullWidth}
text="Siguiente"
type="default"
            disabled={!(this.state.isValid && this.state.isValidRepeat)}
onClick={this.handleButtonClick}
            />
        </div>

      </React.Fragment>
    );
  }

}

export default PasswordFields;
