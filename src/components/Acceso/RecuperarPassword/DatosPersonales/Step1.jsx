import React from 'react';
import { Button, TextBox } from "devextreme-react";
import styles from "../../../../styles/stylesgenerales";
// import { Tooltip } from "devextreme-react/ui/tooltip";

class Step1 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false,
  };
}
  render() {
    const {
      handleChange,
      nextStep,
      disabled,
      value,
      error,
    } = this.props;
    return (
      <div className="acceso row" style={{ justifyContent: "center" }}>
        <div className="tituloLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
          <h4>Ingrese sus datos personales </h4>

          <div style={{textAlign: 'justify'}}>
            <p>Para restablecer tu contraseña debes ingresar tu Rut o el correo electrónico vinculado a tu cuenta ACHS.
            Recibirás un correo con un código verificador que deberás ingresar a continuación para restablecer tu contraseña.
            </p>
          </div>
        </div>


        <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
          <h3><p className="text-left">Usuario</p></h3>
          {/* <Tooltip
            visible={this.state.showTooltip}
            contentRender={() =>
              (<div>El Rut debe tener guion <br />
                  Ej: 14635551-3
              </div>)}
            position="left"
            target="#user"
          /> */}
          <TextBox
            id="user"
            placeholder="Rut o dirección de correo electrónico"
            onValueChanged={handleChange}
            valueChangeEvent='focusout'
            value={value}
            onFocusIn={() => this.setState({ showTooltip: true })}
            onFocusOut={() => this.setState({ showTooltip: false })}
          />
          <span style={{color: 'red', marginTop: 10}}>{error}</span>
        </div>

          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: "center" }}>
            <Button style={styles.fullWidth} text="Siguiente" type="default" disabled={disabled} onClick={nextStep} />
          </div>
      </div>
    );
  }
}

export default Step1;
