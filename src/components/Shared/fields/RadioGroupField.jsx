import React from "react";
import { RadioGroup, Validator } from "devextreme-react";

class RadioGroupfield extends React.PureComponent {
  render() {
    const {
      label,
      items,
      layout,
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
        <RadioGroup
          items={items}
          layout={layout}
          id={id}
          disabled={disabled}
          value={value}
          onValueChanged={onChange}
          {...rest}
        >
          <Validator
            validationRules={[{
              type: "required",
              message: "Este campo es requerido",
            }]}
          />
        </RadioGroup>
      </div>
    );
  }
}

export default RadioGroupfield;
