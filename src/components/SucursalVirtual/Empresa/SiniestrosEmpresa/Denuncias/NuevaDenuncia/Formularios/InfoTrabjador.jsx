import React from "react";
import { connect } from "react-redux";
import { Button, ValidationGroup } from "devextreme-react";
import validaciones from "../../../../../../../helpers/validaciones";
import { lastStep, nextStep, getWorkerData, setDataNewComplain } from "../../actions";
import TextField from "../../../../../../Shared/fields/TextField";
import SelectField from "../../../../../../Shared/fields/SelectField";
import DirectionFields from "../fields/DirectionsFields";
import DateField from "../../../../../../Shared/fields/DateField";
import { ChangeAddressAutocomplete } from "../../../../../../Maps/actions";
class InfoTrabajador extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      firstEdit: !props.editingDraft,
    };

    this.topRef = React.createRef();
  }

  componentDidMount = () => {
    this.props.dispatch(getWorkerData(
      this.props.showHideForm,
      this.props.jsonData,
      validaciones.formatRut(this.props.jsonData.formInfoDenuncia.rutTxt, { showDots: false, showHyphen: true })
    ));
  }

  handleBack = () => {
    this.topRef.current.scrollIntoView();
    this.props.dispatch(lastStep());
  }

  handleNext = (params) => {
    const result = params.validationGroup.validate();
    if (result.isValid) {
      this.topRef.current.scrollIntoView();
      // Limpiar el autocomplete de la direccion google
      this.props.dispatch(ChangeAddressAutocomplete(""));
      this.props.dispatch(nextStep());
      this.props.onSave(false);
    }
  }

  handleChange = (e) => {
    const jsonData = { ...this.props.jsonData };

    jsonData.formInfoTrabajador[e.element.id] = e.value;

    this.props.dispatch(setDataNewComplain(jsonData));
    if (this.state.firstEdit && !this.props.editingDraft) {
      this.setState({ firstEdit: false });
      this.props.onCreate();
    }
  }

  render() {
    const form = this.props.jsonData.formInfoTrabajador;

    if (!form.TipoDireccion) form.TipoDireccion = "Google Maps";

    return (
      <ValidationGroup className="row">
        <div className="col-12 newDenuncia-title" ref={this.topRef}>
          <h2>Información del trabajador</h2>
          <p>Debe llenar todos los datos para pasar a la siguiente sección</p>
        </div>
        <div className="col-12">
          <h4 className="newDenuncia-subtitle">Datos trabajador</h4>

          <TextField
            label="Rut"
            disabled
            id="Rut"
            value={this.props.jsonData.formInfoDenuncia.rutTxt}
            onChange={this.handleChange}
          />

          <TextField
            label="Nombres"
            disabled={this.props.dataTrabajador.FirstName != null}
            id="FirstName"
            value={form.FirstName}
            onChange={this.handleChange}
          />

          <TextField
            label="Apellido paterno"
            disabled={this.props.dataTrabajador.LastName != null}
            id="LastName"
            value={form.LastName}
            onChange={this.handleChange}
          />

          <TextField
            label="Apellido materno"
            disabled={this.props.dataTrabajador.MothersName != null}
            id="MothersName"
            value={form.MothersName}
            onChange={this.handleChange}
          />

          <DateField
            label="Fecha de nacimiento"
            id="Birthdate"
            value={form.Birthdate}
            onChange={this.handleChange}
            type="date"
          />

          <SelectField
            label="Sexo"
            id="Sexo"
            value={form.Sexo}
            dataSource={this.props.listaSexos}
            displayExpr="Sexo"
            valueExpr="Sexo"
            onChange={this.handleChange}
          />

          <SelectField
            label="Nacionalidad"
            id="Nacionalidad"
            value={form.Nacionalidad}
            dataSource={this.props.listaNacionalidades}
            displayExpr="Nacionalidad"
            valueExpr="Nacionalidad"
            onChange={this.handleChange}
          />

          <SelectField
            label="Pueblo originario"
            id="PuebloOriginario"
            value={form.PuebloOriginario}
            dataSource={this.props.listaPueblosOriginarios}
            displayExpr="PuebloOriginario"
            valueExpr="PuebloOriginario"
            onChange={this.handleChange}
          />

          <div className="row zero-vertical">
            <div className="col-4 zero-right">
              <SelectField
                id="Code"
                label="Código de área"
                value={form.Code}
                onValueChanged={this.handleChange}
                items={["02", "41", "42", "43"]}
              />

            </div>
            <div className="col-8">
              <TextField
                label="Teléfono"
                id="Phone"
                mask="000 0000"
                value={form.Phone}
                onValueChanged={this.handleChange}
              />

            </div>
          </div>
        </div>

        <div className="col-12">
          <h4 className="newDenuncia-subtitle">Dirección personal del trabajador</h4>

          <DirectionFields
            onChange={this.handleChange}
            form={form}
          />
        </div>

        <div className="col-12">
          <h4 className="newDenuncia-subtitle">Información laboral del trabajador</h4>

          <SelectField
            label="Profesión u oficio"
            id="ProfecionOficio"
            value={form.ProfecionOficio}
            items={["Profecion 1", "Oficio 1"]}
            onChange={this.handleChange}
          />

          <SelectField
            label="Categoria ocupacional"
            id="CategoriaOcupacional"
            value={form.CategoriaOcupacional}
            dataSource={this.props.listaCategoriasOcupacionales}
            displayExpr="CategoriaOcupacional"
            valueExpr="CategoriaOcupacional"
            onChange={this.handleChange}
          />

          <SelectField
            label="Tipo de ingreso"
            id="TipoIngreso"
            value={form.TipoIngreso}
            dataSource={this.props.listaTiposIngreso}
            displayExpr="TipoIngreso"
            valueExpr="TipoIngreso"
            onChange={this.handleChange}
          />

          <SelectField
            label="Tipo de contrato"
            id="TipoContrato"
            value={form.TipoContrato}
            dataSource={this.props.listaTiposContrato}
            displayExpr="TipoContrato"
            valueExpr="TipoContrato"
            onChange={this.handleChange}
          />

          <div className="row zero-vertical">
            <div className="col-6 zero-right">
              <DateField
                id="HoraIngreso"
                label="Hora de ingreso al trabajo"
                value={form.HoraIngreso}
                onChange={this.handleChange}
                type="time"
              />
            </div>
            <div className="col-6">
              <DateField
                id="HoraSalida"
                label="Hora de salida del trabajo"
                value={form.HoraSalida}
                onChange={this.handleChange}
                type="time"
              />
            </div>
          </div>
        </div>

        <div className="col-12">
          <h4 className="newDenuncia-subtitle">Sucursal donde trabaja</h4>
          <SelectField
            label="Sucursal"
            id="Sucursal"
            value={form.Sucursal}
            items={["Sucursal 1", "Sucursal 2"]}
            onChange={this.handleChange}
          />
          <SelectField
            label="Región"
            id="RegionSucursal"
            value={form.RegionSucursal}
            items={["Region 1", "Region 2"]}
            onChange={this.handleChange}
          />
          <SelectField
            label="Comuna"
            id="ComunaSucursal"
            value={form.ComunaSucursal}
            items={["Comuna 1", "Comuna 2"]}
            onChange={this.handleChange}
          />
          <SelectField
            label="Tipo de calle"
            id="TipoCalleSucursal"
            value={form.TipoCalleSucursal}
            dataSource={this.props.listaTiposCalle}
            displayExpr="TipoCalle"
            valueExpr="TipoCalle"
            onChange={this.handleChange}
          />

          <TextField
            label="Nombre de la calle"
            id="NombreCalleSucursal"
            value={form.NombreCalleSucursal}
            onChange={this.handleChange}
          />

          <TextField
            label="Número"
            id="NumeroCalleSucursal"
            value={form.NumeroCalleSucursal}
            onChange={this.handleChange}
          />

          <TextField
            label="Poblacion o villa"
            id="PoblacionVillaSucursal"
            value={form.PoblacionVillaSucursal}
            onChange={this.handleChange}
          />
          <SelectField
            label="Ciudad o localidad"
            id="CiudadLocalidadSucursal"
            value={form.CiudadLocalidadSucursal}
            items={["Ciudad 1", "Ciudad 2", "Localidad 1", "Localidad 2"]}
            onChange={this.handleChange}
          />

          <div className="row zero-vertical">
            <div className="col-4 zero-right">
              <SelectField
                label="Código de área"
                id="SucursalCode"
                value={form.SucursalCode}
                onValueChanged={this.handleChange}
                items={["02", "41", "42", "43"]}
              />
            </div>
            <div className="col-8">
              <TextField
                label="Teléfono"
                id="SucursalPhone"
                mask="000 0000"
                value={form.SucursalPhone}
                onValueChanged={this.handleChange}
              />

            </div>
          </div>

        </div>

        <div className="col-12">
          {/* <Button text="Volver" className="newDenuncia-back-button" onClick={this.handleBack} /> */}
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
  showHideForm: state.denuncias.showHideForm,
  editingDraft: state.denuncias.editingDraft,
  dataTrabajador: state.denuncias.dataTrabajador,
  listaSexos: state.global.listaSexos,
  listaNacionalidades: state.global.listaNacionalidades,
  listaPueblosOriginarios: state.global.listaPueblosOriginarios,
  listaCategoriasOcupacionales: state.global.listaCategoriasOcupacionales,
  listaTiposIngreso: state.global.listaTiposIngreso,
  listaTiposContrato: state.global.listaTiposContrato,
  listaTiposCalle: state.global.listaTiposCalle,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoTrabajador);
