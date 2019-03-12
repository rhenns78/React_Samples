import React from "react";
import { connect } from "react-redux";
import { Button, ValidationGroup } from "devextreme-react";
import TextField from "../../../../../../Shared/fields/TextField";
import DateField from "../../../../../../Shared/fields/DateField";
import RadioGroupfield from "../../../../../../Shared/fields/RadioGroupField";


import { setDataNewComplain, lastStep, nextStep } from "../../actions";
import { ChangeAddressAutocomplete } from "../../../../../../Maps/actions";

class DatosEnfermedad extends React.PureComponent {
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
      this.props.dispatch(ChangeAddressAutocomplete(""));
      this.topRef.current.scrollIntoView();
      this.props.dispatch(nextStep());
      this.props.onSave(false);
    }
  }

  handleChange = (e) => {
    const jsonData = { ...this.props.jsonData };

    jsonData.formDatosEnfermedad[e.element.id] = e.value;

    this.props.dispatch(setDataNewComplain(jsonData));
  }

  render() {
    const form = { ...this.props.jsonData.formDatosEnfermedad };
    return (
      <ValidationGroup className="row">
        <div className="col-12 newDenuncia-title" ref={this.topRef}>
          <h2>Datos de  la enfermedad</h2>
          <p>Debe llenar todos los datos para pasar a la siguiente sección</p>
        </div>

        <div className="col-12">
          <TextField
            label="Nombre del puesto de trabajo"
            id="NombrePuesto"
            onChange={this.handleChange}
            value={form.NombrePuesto}
          />

          <TextField
            label="Descripción del trabajo que realizaba"
            id="DescripcionTrabajo"
            onChange={this.handleChange}
            value={form.DescripcionTrabajo}
          />

          <DateField
            label="Fecha inicio de sintomas"
            id="FechaInicioSintomas"
            value={form.FechaInicioSintomas}
            onChange={this.handleChange}
            type="date"
          />

          <DateField
            label="Fecha primera exposición al agente sospechoso"
            id="FechaPrimeraExposicion"
            value={form.FechaPrimeraExposicion}
            onChange={this.handleChange}
            type="date"
          />

          <TextField
            label="Descripción de sintomas"
            id="DescripcionSintomas"
            value={form.DescripcionSintomas}
            onChange={this.handleChange}
          />

          <TextField
            label="Partes del cuerpo afectada"
            id="PartesCuerpo"
            value={form.PartesCuerpo}
            onChange={this.handleChange}
          />

          <RadioGroupfield
            label="¿Existen compañeros de trabajo con los mismos sintomas?"
            items={["Si", "No"]}
            id="ExistenCompañeros"
            value={form.ExistenCompañeros}
            onChange={this.handleChange}
            layout="horizontal"
          />

          <RadioGroupfield
            label="Antecedentes de cuadro previo?"
            items={["Si", "No"]}
            id="CuadroPrevio"
            value={form.CuadroPrevio}
            layout="horizontal"
            onChange={this.handleChange}
          />

          <TextField
            label="Agente sospechoso de causa la enfermedad"
            id="Agente"
            value={form.Agente}
            onChange={this.handleChange}
          />

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
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(DatosEnfermedad);
