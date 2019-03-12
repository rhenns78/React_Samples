import React from 'react';
import { Button, TextBox } from "devextreme-react";
import styles from "../../../../styles/stylesgenerales";
// import { replaceAt } from '../../../../helpers/strings';

const codeInputStyle = {
  fontSize: 20,
  marginLeft: 5,
}

class Step3 extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fullcode: '',
      codeLength: 7,
      focus: 0,
    }

    this.textInput = React.createRef();
  }

  handleFocus = (e) => {
    if (e.previousValue.trim() === '' && e.value.trim() !== '' && this.state.focus < this.state.codeLength - 1) {
      this.setState(prevState => ({focus: prevState.focus + 1}));
    }
    this.textInput.focus();
  }

  handleChange = (e) => {
    // let newValue = e.value === '' ? ' ' : e.value;
    // let newCode = replaceAt(this.state.fullcode, this.state.focus, newValue);
    // this.setState({fullcode: newCode});

    if (e.value.trim().length === this.state.codeLength ) {
      this.props.handleFullCode(e.value);
    } else {
      this.props.handleFullCode(false);
    }

    // this.handleFocus(e);
  }

  render() {
    const {
      nextStep,
      codeError,
      disabled,
      reSend,
    } = this.props;

    // let codeInputs = [];
    // for(let index = 0; index < this.state.codeLength; index++) {
    //   codeInputs.push(
    //     <TextBox
    //       key={`code${index}`}
    //       id={`code${index}`}
    //       maxLength="1"
    //       width="31"
    //       onFocusIn={() => this.setState({focus: index})}
    //       ref={ (ref) => ref !== null && index === this.state.focus ? this.textInput = ref.instance : null }
    //       mode='tel'
    //       tabIndex={index}
    //       height="31"
    //       style={codeError ? {...codeInputStyle, border: '1px solid red'} : codeInputStyle}
    //       onValueChanged={this.handleChange}
    //       valueChangeEvent="input"
    //     />);
    // }

    return (
      <div className="acceso row" style={{ justifyContent: "center" }}>
        <div className="tituloLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
          <h3>Ingrese código </h3>

          <div style={{textAlign: 'justify'}}>
            <h5>Tu código verificador ha sido enviado a tu correo, en caso de no recibir el mensaje revisa tu carpeta de Spam y Correos no deseados.</h5>
          </div>
        </div>

        <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{display: 'flex', justifyContent: 'center'}}>
          {/* {codeInputs} */}
          <TextBox
            key="code1"
            id="code1"
            maxLength="7"
            // mask="C C C C C C C"
            // useMaskedValue
            width="100"
            mode='tel'
            tabIndex={1}
            height="31"
            style={codeError ? {...codeInputStyle, border: '1px solid red'} : codeInputStyle}
            onValueChanged={this.handleChange}
            valueChangeEvent="input"
          />
        </div>
        {codeError && <span style={{color: 'red'}}>Código inválido</span>}

        <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: "center" }}>
          <Button style={styles.fullWidth} text="Validar código" type="default" disabled={disabled} onClick={nextStep} />
          <Button style={{...styles.fullWidth, marginTop: 20}} text="Reenviar código" type="success" onClick={reSend} />
        </div>
      </div>
    );
  }
}

export default Step3;
