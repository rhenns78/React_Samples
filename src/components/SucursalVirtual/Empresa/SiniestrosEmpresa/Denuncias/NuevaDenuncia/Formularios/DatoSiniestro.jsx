import React from "react";
import { connect } from "react-redux";
import { Button, ValidationGroup } from "devextreme-react";
import { lastStep, nextStep, setDataNewComplain } from "../../actions";
import { ChangeAddressAutocomplete } from "../../../../../../Maps/actions";
import TextField from "../../../../../../Shared/fields/TextField";
import RadioGroupfield from "../../../../../../Shared/fields/RadioGroupField";
import SelectField from "../../../../../../Shared/fields/SelectField";
import DirectionFields from "../fields/DirectionsFields";
import DateField from "../../../../../../Shared/fields/DateField";

class DatoSiniestro extends React.PureComponent {
  constructor(props) {
    super(props);

    this.topRef = React.createRef();
  }

  handleBack = () => {
    this.topRef.current.scrollIntoView();
    this.props.dispatch(ChangeAddressAutocomplete(""));
    this.props.dispatch(lastStep());
  }
  handleNext = (params) => {
    const result = params.validationGroup.validate();
    if (result.isValid) {
      this.topRef.current.scrollIntoView();
      this.props.dispatch(ChangeAddressAutocomplete(""));
      this.props.dispatch(nextStep());
      this.props.onSave(false);
    }
  }

  handleChange = (e) => {
    const jsonData = { ...this.props.jsonData };

    jsonData.formDatoSiniestro[e.element.id] = e.value;

    this.props.dispatch(setDataNewComplain(jsonData));
  }

  render() {
    const form = this.props.jsonData.formDatoSiniestro;

    if (!form.TipoDireccion) form.TipoDireccion = "Google Maps";

    return (
      <ValidationGroup className="row">
        <div className="col-12 newDenuncia-title" ref={this.topRef}>
          <h2>Datos del accidente</h2>
          <p>Debe llenar todos los datos para pasar a la siguiente sección</p>
        </div>
        <div className="col-12">
          <h4 className="newDenuncia-subtitle">Dirección del accidente</h4>
        </div>

        <div className="col-12">
          <DirectionFields
            onChange={this.handleChange}
            form={form}
          />
        </div>

        <div className="col-12">
          <h4 className="newDenuncia-subtitle">Antecedentes del accidente</h4>
        </div>

        <div className="col-12">

          <SelectField
            label="Tipo de accidente"
            id="TipoAccidente"
            value={form.TipoAccidente}
            onValueChanged={this.handleChange}
            items={["Trayecto", "Tipo 1", "Tipo 2", "Tipo 3"]}
          />

          {form.TipoAccidente === "Trayecto" &&
            <SelectField
              label="Tipo de accidente de trayecto"
              optional
              id="TipoAccidenteTrayecto"
              value={form.TipoAccidenteTrayecto}
              onValueChanged={this.handleChange}
              items={["Accidente 1", "Accidente 2", "Accidente 3"]}
            />
          }

          <SelectField
            label="Clasificación del accidente (grado)"
            id="ClasificacionAccidente"
            value={form.ClasificacionAccidente}
            onValueChanged={this.handleChange}
            dataSource={this.props.listaClasificacionesAccidentes}
            displayExpr="ClasificacionAccidente"
            valueExpr="ClasificacionAccidente"
          />

          <DateField
            label="Fecha y hora del accidente"
            id="FechaHoraAccidente"
            value={form.FechaHoraAccidente}
            onValueChanged={this.handleChange}
            type="datetime"
          />

          <TextField
            id="SitioAccidente"
            label="Sitio preciso del accidente"
            value={form.SitioAccidente}
            onValueChanged={this.handleChange}
          />

          <TextField
            id="TrabajoHabitual"
            label="Trabajo habitual del trabajador"
            value={form.TrabajoHabitual}
            onValueChanged={this.handleChange}
          />

          <TextField
            id="ActividadAntesAccidente"
            label="Actividad realizada antes del accidente"
            value={form.ActividadAntesAccidente}
            onValueChanged={this.handleChange}
          />

          <RadioGroupfield
            label="¿Al momento del accidente realizaba su trabajo habitual?"
            items={["Si", "No"]}
            layout="horizontal"
            id="RealizabaSuTrabajo"
            onValueChanged={this.handleChange}
            value={form.RealizabaSuTrabajo}
          />

          <TextField
            id="AlMomentoDelAccidente"
            label="Al momento del accidente el trabajador se encontraba"
            value={form.AlMomentoDelAccidente}
            onValueChanged={this.handleChange}
          />

          <TextField
            id="CausaAccidente"
            label="Lo que ocurrió fue que (causa del accidente)"
            value={form.CausaAccidente}
            onValueChanged={this.handleChange}
          />

          <TextField
            id="Agente"
            label="Se accidentó (agente)"
            value={form.Agente}
            onValueChanged={this.handleChange}
          />

          <TextField
            id="Consecuencia"
            label="La lesión que presenta es (consecuencia)"
            value={form.Consecuencia}
            onValueChanged={this.handleChange}
          />

          <TextField
            id="ZonaAfectada"
            label="La zona afectada es (indique lateralidad cuando corresponda)"
            value={form.ZonaAfectada}
            onValueChanged={this.handleChange}
          />

          <RadioGroupfield
            label="¿Tiene testigos presenciales de su accidente?"
            items={["Tiene testigos de su accidente", "No tiene testigos de su accidente"]}
            layout="vertical"
            id="Testigos"
            onValueChanged={this.handleChange}
            value={form.Testigos}
          />

          {form.Testigos === "Tiene testigos de su accidente" &&
            <TextField
              id="DatosTestigo"
              optional
              label="El nombre y cargo del testigo es"
              value={form.DatosTestigo}
              onValueChanged={this.handleChange}
            />
          }

          <RadioGroupfield
            label="¿Avisó a la empresa sobre el accidente?"
            items={["Si", "No"]}
            layout="horizontal"
            id="Aviso"
            value={form.Aviso}
            onValueChanged={this.handleChange}
          />

          <TextField
            id="NombreCargoPersonaAviso"
            label="¿Nombre y cargo de la persona a la que dio aviso del accidente?"
            value={form.NombreCargoPersonaAviso}
            onValueChanged={this.handleChange}
          />

          <DateField
            label="Fecha y hora en que avisó a su empresa sobre el accidente"
            id="FechaHoraAviso"
            value={form.FechaHoraAviso}
            onValueChanged={this.handleChange}
            type="datetime"
          />

          <RadioGroupfield
            label="En condiciones ligeramente diferentes ¿Usted cree que este accidente pudo haber sido más grave o fatal?"
            items={["Si", "No"]}
            layout="horizontal"
            id="CondicionesAccidente"
            onValueChanged={this.handleChange}
            value={form.CondicionesAccidente}
          />

          <SelectField
            label="Medio de prueba"
            id="MedioPrueba"
            value={form.MedioPrueba}
            onValueChanged={this.handleChange}
            dataSource={this.props.listaMediosPrueba}
            displayExpr="MedioPrueba"
            valueExpr="MedioPrueba"
          />

          <TextField
            id="DetalleMedioPrueba"
            label="Detalle del medio de prueba"
            value={form.DetalleMedioPrueba}
            onValueChanged={this.handleChange}
          />

        </div>

        <div className="col-12">
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
  jsonData: state.denuncias.jsonData,
  listaMediosPrueba: state.global.listaMediosPrueba,
  listaClasificacionesAccidentes: state.global.listaClasificacionesAccidentes,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(DatoSiniestro);
