import React from "react";
import { connect } from "react-redux";
import { Button, ValidationGroup } from "devextreme-react";
import validaciones from "../../../../../../../helpers/validaciones";
import { lastStep, nextStep, setDataNewComplain } from "../../actions";
import TextField from "../../../../../../Shared/fields/TextField";
import SelectField from "../../../../../../Shared/fields/SelectField";

class Denunciante extends React.PureComponent {
  constructor(props) {
    super(props);

    this.topRef = React.createRef();

    if (!props.jsonData.formDenunciante.FirstName) {
      props.dispatch(setDataNewComplain({
        ...props.jsonData,
        formDenunciante: {
          FirstName: props.userData.FirstName,
          LastName: props.userData.LastName,
          MothersName: props.userData.MothersName,
          Rut: props.userData.RUT,
        },
      }));
    }
  }
  handleNext = (params) => {
    const result = params.validationGroup.validate();
    if (result.isValid) {
      this.topRef.current.scrollIntoView();
      this.props.dispatch(nextStep());
      this.props.onSave(false);
    }
  }

  handleBack = () => {
    this.topRef.current.scrollIntoView();
    this.props.dispatch(lastStep());
  }

  handleChange = (e) => {
    const jsonData = { ...this.props.jsonData };

    switch (e.element.id) {
      case "FirstName": {
        jsonData.formDenunciante.FirstName = e.value;
        break;
      }
      case "ApellidoPaterno": {
        jsonData.formDenunciante.LastName = e.value;
        break;
      }
      case "ApellidoMaterno": {
        jsonData.formDenunciante.MothersName = e.value;
        break;
      }
      case "Rut": {
        jsonData.formDenunciante.Rut = e.value;
        break;
      }
      case "telefono": {
        jsonData.formDenunciante.Phone = e.value;
        break;
      }
      case "codigo": {
        jsonData.formDenunciante.Code = e.value;
        break;
      }
      default:
        break;
    }

    this.props.dispatch(setDataNewComplain(jsonData));
  }

  render() {
    const form = this.props.jsonData.formDenunciante;

    return (
      <ValidationGroup className="row">
        <div className="col-12 newDenuncia-title" ref={this.topRef}>
          <h2>Denunciante</h2>
          <p>Debe llenar todos los datos para pasar a la siguiente sección</p>
        </div>
        <div className="col-12">
          <h4 className="newDenuncia-subtitle">Datos del denunciante</h4>
        </div>
        <div className="col-12">
          <TextField
            label="Nombres"
            id="Nombres"
            disabled={this.props.userData.FirstName != null}
            onChange={this.handleChange}
            value={form.FirstName}
          />
          <TextField
            label="Apellido paterno"
            id="ApellidoPaterno"
            disabled={this.props.userData.LastName != null}
            onChange={this.handleChange}
            value={form.LastName}
          />
          <TextField
            label="Apellido materno"
            id="ApellidoMaterno"
            disabled={this.props.userData.MothersName != null}
            onChange={this.handleChange}
            value={form.MothersName}
          />
          <TextField
            label="Rut"
            disabled={this.props.userData.RUT != null}
            id="Rut"
            onChange={this.handleChange}
            value={validaciones.formatRut(form.Rut, { showDots: true, showHyphen: true })}
          />

          <div className="row zero-vertical">
            <div className="col-4 zero-right">
              <SelectField
                label="Código de área"
                id="codigo"
                value={form.Code}
                onValueChanged={this.handleChange}
                items={["02", "41", "42", "43"]}
              />
            </div>
            <div className="col-8">
              <TextField
                label="Teléfono"
                id="telefono"
                mask="000 0000"
                value={form.Phone}
                onValueChanged={this.handleChange}
              />

            </div>
          </div>

          <Button text="Volver" className="newDenuncia-back-button" onClick={this.handleBack} />
          <Button
            text="Siguiente"
            type="success"
            className="newDenuncia-next-button"
            onClick={this.handleNext}
            useSubmitBehavior
          />

        </div>
      </ValidationGroup>
    );
  }
}
const mapStateToProps = (state) => ({
  userData: state.global.userData,
  jsonData: state.denuncias.jsonData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Denunciante);
