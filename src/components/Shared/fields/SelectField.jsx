import React from "react";
import { SelectBox, Validator } from "devextreme-react";

class SelectField extends React.PureComponent {
  render() {
    const {
      label,
      displayExpr,
      valueExpr,
      searchEnabled,
      dataSource,
      defaultValue,
      items,
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
        <SelectBox
          placeholder=""
          items={items}
          dataSource={dataSource}
          disabled={disabled}
          defaultValue={defaultValue}
          value={value}
          onValueChanged={onChange}
          displayExpr={displayExpr}
          valueExpr={valueExpr}
          id={id}
          {...rest}
        >
          <Validator
            validationRules={[{
              type: "required",
              message: "Este campo es requerido",
            }]}
          />
        </SelectBox>
      </div>
    );
  }
}

export default SelectField;
