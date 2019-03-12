import React from "react";
import { NumberBox, Validator } from "devextreme-react";

class NumberField extends React.PureComponent {
  render() {
    const {
      label,
      disabled,
      value,
      onChange,
      id,
      optional,
      ...rest
    } = this.props;
    return (
      <div className="field-newDenuncia" style={{ marginLeft: optional ? 20 : 0 }}>
        <h3><p>{label}</p></h3>
        <NumberBox
          disabled={disabled}
          value={value}
          onValueChanged={onChange}
          id={id}
          {...rest}
        >
          <Validator
            validationRules={[{
              type: "required",
              message: "Este campo es requerido",
            },


            ]}
          />
        </NumberBox>
      </div>
    );
  }
}

export default NumberField;
