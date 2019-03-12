import React from 'react';
import { Button, RadioGroup } from "devextreme-react";
import styles from "../../../../styles/stylesgenerales";
import { replaceFromTo } from '../../../../helpers/strings';

const hideText = (text) => {
  let hiddenText;
  if (text.indexOf('@') !== -1 ) {
    let index = text.indexOf('@');
    hiddenText = replaceFromTo(text, Math.round(index/2) - 1, index - 1, '\u25CF');
  } else if (/\d/.test(text)) {
    hiddenText = replaceFromTo(text, 7, text.length, '\u25CF');
  }
  return hiddenText;
}

const isValid = (text) => {
  if (typeof(text) === 'string') return text.indexOf('@') !== -1 || /\d/.test(text);
  return false;
}

class Step2 extends React.PureComponent {
  render() {
    const {
      handleChange,
      nextStep,
      disabled,
      options,
    } = this.props;

    let item = [];
    options.forEach(option => {
      if (isValid(option)) {
        item.push({
          text: hideText(option),
          value: option,
        })
      }
    })

    return (
      <div className="acceso row" style={{ justifyContent: "center" }}>
        <div className="tituloLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
          <h4>Enviar código verificador </h4>

          <div style={{textAlign: 'center'}}>
            <h5>Seleccione el medio por el cuál se hará envío del código</h5>
          </div>
        </div>

        <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-9" style={{display: 'flex'}}>
          <RadioGroup 
            items={item} 
            id="rut"
            style={{textAlign: 'start'}}
            onValueChanged={handleChange}
            displayExpr="text"
            valueExpr="value"
          />
        </div>

        <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: "center" }}>
          <Button style={styles.fullWidth} text="Siguiente" type="default" disabled={disabled} onClick={nextStep} />
        </div>
      </div>
    );
  }
}

export default Step2;
