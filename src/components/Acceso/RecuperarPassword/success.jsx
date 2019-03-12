import React from 'react';
import { Button } from "devextreme-react";
import styles from "../../../styles/stylesgenerales";

class Step5 extends React.PureComponent {
  render() {
    const {
      nextStep,
      disabled,
    } = this.props;
    return (
      <div className="acceso row" style={{ justifyContent: "center" }}>
        <div className="tituloLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
          <h3>Contraseña restablecida con éxito </h3>

          <div style={{textAlign: 'justify', backgroundColor: '#F8F8F8', padding: 20}}>
            Su contraseña fue restablecida con éxito, intente ingresar con su rut o email y su nueva contraseña a la Surcursal Virtual.
          </div>
        </div>

          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: "center" }}>
            <Button style={styles.fullWidth} text="Volver" type="default" disabled={disabled} onClick={nextStep} />
          </div>
      </div>
    );
  }
}

export default Step5;
