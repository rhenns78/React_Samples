import React from "react";
import { DateBox, Validator } from "devextreme-react";

class DateField extends React.PureComponent {
  render() {
    const {
      label,
      type,
      disabled,
      value,
      onChange,
      id,
      optional,
      ...rest
    } = this.props;

    let format = "dd-MM-yyyy HH:MM";
    if (type === "time") format = null;
    if (type === "date") format = "dd-MM-yyyy";

    return (
      <div className="field-newDenuncia" style={{ marginLeft: optional ? 20 : 0 }}>
        <h3><p>{label}</p></h3>
        <DateBox
          value={value}
          onValueChanged={onChange}
          id={id}
          disabled={disabled}
          displayFormat={format}
          cancelButtonText="Cancelar"
          applyButtonText="Acceptar"
          max={format ? new Date() : null}
          type={type}
          style={{ width: "100%" }}
          {...rest}
        >
          <Validator
            validationRules={[{
              type: "required",
              message: "Este campo es requerido",
            }]}
          />
        </DateBox>
      </div>
    );
  }
}

export default DateField;
