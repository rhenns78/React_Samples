import React from "react";
import { TextBox, Validator } from "devextreme-react";

class TextField extends React.PureComponent {
  render() {
    const setValidationRules = [
      {
        type: "required",
        message: "Este campo es requerido",
      },
    ];
    const {
      label,
      mode,
      disabled,
      value,
      onChange,
      id,
      optional,
      customRules,
      ...rest
    } = this.props;

    if (customRules !== undefined) {
      setValidationRules.push(customRules);
    }
    return (
      <div className="field-newDenuncia" style={{ marginLeft: optional ? 20 : 0 }}>
        <h3><p>{label}</p></h3>
        <TextBox
          mode={mode || null}
          disabled={disabled}
          value={value}
          onValueChanged={onChange}
          id={id}
          {...rest}
        >
          <Validator
            validationRules={setValidationRules}

          />
        </TextBox>
      </div>
    );
  }
}

export default TextField;
