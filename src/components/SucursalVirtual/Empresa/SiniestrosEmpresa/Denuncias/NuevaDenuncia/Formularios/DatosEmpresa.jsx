import React from "react";
import { connect } from "react-redux";
import { Button, NumberBox, ValidationGroup } from "devextreme-react";
import { lastStep, nextStep, setDataNewComplain } from "../../actions";
// import TextField from "../fields/TextField";
import TextField from "../../../../../../Shared/fields/TextField";
import validaciones from "../../../../../../../helpers/validaciones";
import SelectField from "../../../../../../Shared/fields/SelectField";

class DatosEmpresa extends React.PureComponent {
  constructor(props) {
    super(props);

    this.topRef = React.createRef();
  }

  handleBack = () => {
    this.props.dispatch(lastStep());
  }

  handleNext = (params) => {
    const result = params.validationGroup.validate();
    if (result.isValid) {
      this.topRef.current.scrollIntoView();
      this.props.onSave(false);
      this.props.dispatch(nextStep());
    }
  }

  handleChange = (e) => {
    const jsonData = { ...this.props.jsonData };

    switch (e.element.id) {
      case "RutEmpresa": {
        let errorTxt = "";
        let isValidRut;
        if (validaciones.validateRut(e.value) === false) {
          errorTxt = "Formato de rut inválido";
          isValidRut = false;
          jsonData.formDatosEmpresa.RutEmpresa = e.value;
        } else {
          jsonData.formDatosEmpresa.RutEmpresa = validaciones.formatRut(e.value, { showDots: true, showHyphen: true });
          isValidRut = true;
        }

        e.component.option({
          validationError: { message: errorTxt },
          isValid: isValidRut,
        });

        break;
      }
      case "NombreRazon": {
        jsonData.formDatosEmpresa.NombreRazon = e.value;
        break;
      }
      case "TipoEmpresa": {
        jsonData.formDatosEmpresa.TipoEmpresa = e.value;
        break;
      }
      case "ActividadEconomica": {
        jsonData.formDatosEmpresa.Actividad = e.value;
        break;
      }
      case "ActividadPrincipal": {
        jsonData.formDatosEmpresa.ActividadPrincipal = e.value;
        break;
      }
      case "Propiedad": {
        jsonData.formDatosEmpresa.Propiedad = e.value;
        break;
      }
      case "TotalHombres": {
        jsonData.formDatosEmpresa.TotalHombres = e.value;
        break;
      }
      case "TotalMujeres": {
        jsonData.formDatosEmpresa.TotalMujeres = e.value;
        break;
      }
      default:
        break;
    }

    this.props.dispatch(setDataNewComplain(jsonData));
  }

  render() {
    const form = this.props.jsonData.formDatosEmpresa;
    const company = this.props.listaEmpresas.find((c) => c.RutEmpresa === this.props.selectedCompany);
    form.RutEmpresa = company.RutEmpresa;
    form.NombreRazon = company.Nombre;

    return (
      <ValidationGroup className="row">
        <div className="col-12 newDenuncia-title" ref={this.topRef}>
          <h2>Datos de la empresa</h2>
          <p>Debe llenar todos los datos para pasar a la siguiente sección</p>
        </div>
        <div className="col-12">
          <h4 className="newDenuncia-subtitle">Información de la empresa</h4>
        </div>
        <div className="col-12">
          <TextField
            label="Rut"
            id="RutEmpresa"
            onChange={this.handleChange}
            value={form.RutEmpresa}
          />
          <TextField
            id="NombreRazon"
            label="Nombre o razón social"
            onChange={this.handleChange}
            value={form.NombreRazon}
          />

          <SelectField
            label="Tipo de empresa"
            id="TipoEmpresa"
            value={form.TipoEmpresa}
            onChange={this.handleChange}
            items={["Principal", "Tipo 1", "Tipo 2", "Tipo 3"]}
          />

          <SelectField
            label="Actividad económica"
            id="ActividadEconomica"
            value={form.Actividad}
            onChange={this.handleChange}
            items={["Actividad 1", "Actividad 2", "Actividad 3"]}
          />

          {form.Actividad && (
            <SelectField
              label="Actividad económica principal de la empresa"
              id="ActividadPrincipal"
              optional
              value={form.ActividadPrincipal}
              onChange={this.handleChange}
              items={["Actividad Principal 1", "Actividad Principal 2", "Actividad Principal 3"]}
            />
          )}

          <SelectField
            label="Propiedad de la empresa"
            id="Propiedad"
            value={form.Propiedad}
            onChange={this.handleChange}
            items={["Privada", "Publica"]}
          />

          <div className="row zero-vertical">
            <div className="col-6">
              <div className="field-newDenuncia">
                <h3><p>Total trabajadores hombres</p></h3>
                <NumberBox
                  id="TotalHombres"
                  value={form.TotalHombres}
                  onValueChanged={this.handleChange}
                />
              </div>

            </div>
            <div className="col-6 zero-left">
              <div className="field-newDenuncia">
                <h3><p>Total trabajadores mujeres</p></h3>
                <NumberBox
                  id="TotalMujeres"
                  value={form.TotalMujeres}
                  onValueChanged={this.handleChange}
                />
              </div>

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
  UserInfo: state.userRegister.UserInfo,
  jsonData: state.denuncias.jsonData,
  selectedCompany: state.global.companyId,
  listaEmpresas: state.global.listaEmpresas,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(DatosEmpresa);
