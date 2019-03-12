import React from "react";
import { FileUploader, Validator } from "devextreme-react";
// Validator
class FileUploaderField extends React.PureComponent {
  render() {
    const {
      multiple,
      label,
      text,
      disabled,
      onChange,
      id,
      optional,
      onUploadStarted,
      uploadMode,
      uploadUrl,
      validar,
      ...rest
    } = this.props;


    return (
      <div className="field-newDenuncia" style={{ marginLeft: optional ? 20 : 0 }}>
        <h3><p>{label}</p></h3>
        <FileUploader
          accept="*"
          type="default"
          multiple={multiple}
          selectButtonText={text}
          disabled={disabled}
          onValueChanged={onChange}
          uploadUrl={uploadUrl}
          uploadMode={uploadMode}
          onUploadStarted={onUploadStarted}
          id={id}
          {...rest}
        >
          {validar === true ? (
            <Validator
              validationRules={[{
                type: "required",
                message: "Este campo es requerido",
              }]}
            />
          ) :
            <Validator
              validationRules={[]}
            />
          }

        </FileUploader>
      </div>
    );
  }
}

export default FileUploaderField;
