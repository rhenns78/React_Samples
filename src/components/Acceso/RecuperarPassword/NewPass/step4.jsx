import React from 'react';
// import { Button, TextBox } from "devextreme-react";
// import styles from "../../../../styles/stylesgenerales";
// import { Tooltip } from "devextreme-react/ui/tooltip";
import PasswordFields from '../../../Shared/PasswordFields';

const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

class Step4 extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pass: '',
      isValid: false,
      passRepeat: '',
      showTooltip: false,
    }
  }

  handlePaste = (e) => {
    e.event.preventDefault();
  }

  handleChange = (e) => {
    let valid = true;
    switch (e.element.id) {
      case 'password':
        valid = strongRegex.test(e.value);
        e.component.option({
          validationError: { message: "Contraseña no cumple con los parámetros mínimos" },
          isValid: valid,
        });
        this.setState({pass: e.value});
        if (this.state.passRepeat !== '') {
          this.setState({isValid: e.value === this.state.passRepeat });
          e.component.option({
            validationError: { message: "La contraseña no coincide" },
            isValid: e.value === this.state.passRepeat,
          })
        }
        break;
      case 'passwordRepeat':
        if (this.state.pass !== null) {
          valid = this.state.pass === e.value;
        }
        e.component.option({
          validationError: { message: "La contraseña no coincide con la anterior" },
          isValid: valid,
        });
        this.setState({passRepeat: e.value, isValid: valid});
        break;
      default:
        break;
    }
  }

  render() {
    const {
      nextStep,
    } = this.props;
    return (
      <div className="acceso row" style={{ justifyContent: "center" }}>
        <PasswordFields 
          callBack={(pass, repeat) => nextStep(pass, repeat)}
        />
      </div>
    );
  }
}

export default Step4;
