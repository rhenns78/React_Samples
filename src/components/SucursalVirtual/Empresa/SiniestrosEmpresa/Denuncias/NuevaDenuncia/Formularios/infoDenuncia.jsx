import React from "react";
import { connect } from "react-redux";

import { Column } from "devextreme-react/ui/data-grid";
import { Button, Popup, DataGrid, ValidationGroup } from "devextreme-react";
import validaciones from "../../../../../../../helpers/validaciones";
import { setDataNewComplain, nextStep, getDenunciasPendientes } from "../../actions";

import TextField from "../../../../../../Shared/fields/TextField";
import SelectField from "../../../../../../Shared/fields/SelectField";
import DateField from "../../../../../../Shared/fields/DateField";
const cancelButtonStyle = {
  paddingLeft: 30,
  paddingRight: 30,
};

const buttonStyle = {
  paddingLeft: 30,
  paddingRight: 30,
};

class InfoDenuncia extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openModalPendientes: false,
    };
  }

  handleChange = (e) => {
    const jsonData = { ...this.props.jsonData };

    switch (e.element.id) {
      case "rutTxt": {
        let errorTxt = "";
        let isValidRut;
        if (validaciones.validateRut(e.value) === false) {
          errorTxt = "Formato de rut inválido";
          isValidRut = false;
          jsonData.formInfoDenuncia.rutTxt = e.value;
        } else {
          jsonData.formInfoDenuncia.rutTxt = validaciones.formatRut(e.value, { showDots: true, showHyphen: true });
          isValidRut = true;
        }
        e.component.option({
          validationError: { message: errorTxt },
          isValid: isValidRut,
        });

        break;
      }
      default:
        jsonData.formInfoDenuncia[e.element.id] = e.value;
        break;
    }

    this.props.dispatch(setDataNewComplain(jsonData));
  }

  handleSave = () => {
    this.props.dispatch(nextStep());
  }

  openModalPendientes = () => {
    this.setState({ openModalPendientes: true });
  }

  handleCerrarPendientes = () => {
    this.setState({ openModalPendientes: false });
  }

  handleNextStep = (params) => {
    const result = params.validationGroup.validate();
    if (result.isValid) {
      this.props.dispatch(getDenunciasPendientes(
        this.openModalPendientes,
        this.props.jsonData.formInfoDenuncia.tipoDenuncia,
        this.props.jsonData.formInfoDenuncia.FechaPresentacion,
        {
          CompanyRut: this.props.companyId,
          Rut: validaciones.formatRut(this.props.jsonData.formInfoDenuncia.rutTxt, { showDots: false, showHyphen: true }),
          FechaIni: "",
          FechaEnd: "",
        }
      ));
    }
  }

  handleCompletar = (data) => {

  }

  renderDenunciasPendientes = (form) => (
    <div className="col-12" style={{ justifyContent: "center", height: "100%" }}>
      <div style={{ width: "100%", textAlign: "center", marginBottom: 20 }}>
        <p>
          Existen denuncias pendientes para el rut <span style={{ fontWeight: "bold", color: "#004A52" }}>{form.rutTxt}</span>.
          Puedes crear una nueva denuncia o completar una de las pendientes si corresponde.
        </p>
      </div>

      <DataGrid
        dataSource={this.props.pendingComplaints}
        showBorders={false}
        showColumnLines={false}
        showRowLines
        height={250}
        className="simpleHeader"
        noDataText="Sin denuncias pendientes"
        hoverStateEnabled
      >
        <Column
          dataField="TipoSiniestro"
          cellRender={(props) => <div style={{ fontWeight: "bold", color: "#004A52" }}>{props.data.TipoSiniestro}</div>}
        />
        <Column dataField="FechaSiniestro" dataType="date" caption="Fecha del siniestro" format="dd-MM-yyyy" />
        <Column dataField="IdSiniestro" caption="ID siniestro" />
        <Column
          cellRender={(props) => (
            <Button
              className="custom-button"
              text="Completar"
              onClick={() => this.handleCompletar(props.data)}
            />
          )}
        />
      </DataGrid>
      <div style={{ textAlign: "center", marginTop: 20 }} >
        <Button
          text="Cerrar"
          type="normal"
          className="custom-ouline-button"
          onClick={this.handleCerrarPendientes}
          style={{ ...cancelButtonStyle, marginRight: 15 }}
        />
        <Button
          text="Continuar nueva denuncia"
          type="success"
          style={{ ...buttonStyle }}
          disabled={this.props.disableContinueNewComplaint}
          onClick={() => {
            this.handleCerrarPendientes();
            this.handleSave();
          }}
        />
      </div>
    </div>
  )

  render() {
    const formInfoDenuncia = { ...this.props.jsonData.formInfoDenuncia };

    return (
      <ValidationGroup className="row">
        <div className="col-12 newDenuncia-title" >
          <h2>Información de la denuncia</h2>
          <p> Debe llenar todos los datos para pasar a la siguiente seccion</p>
        </div>

        <div className="col-12">
          <h4 className="newDenuncia-subtitle">Datos de la denuncia</h4>

          <TextField
            label="Rut trabajador siniestrado"
            id="rutTxt"
            value={formInfoDenuncia.rutTxt}
            onChange={this.handleChange}

          />

          <DateField
            label="Fecha de presentacion"
            id="FechaPresentacion"
            value={formInfoDenuncia.FechaPresentacion}
            onChange={this.handleChange}
            type="date"
          />

          <SelectField
            label="Selecciona el tipo de denuncia que quieres realizar"
            items={["DIEP", "DIAT"]}
            id="tipoDenuncia"
            onValueChanged={this.handleChange}
            value={formInfoDenuncia.tipoDenuncia}
          />

          <Button
            text="Siguiente"
            type="success"
            className="newDenuncia-next-button"
            onClick={this.handleNextStep}
            useSubmitBehavior
          />
        </div>

        <Popup
          visible={this.state.openModalPendientes}
          dragEnabled={false}
          maxHeight="470px"
          onHiding={this.handleCerrarPendientes}
          maxWidth="600px"
          title="Denuncia pendiente"
          showTitle
          contentRender={() => (this.renderDenunciasPendientes(formInfoDenuncia))}
        />
      </ValidationGroup>
    );
  }
}
const mapStateToProps = (state) => ({
  jsonData: state.denuncias.jsonData,
  companyId: state.global.companyId,
  pendingComplaints: state.denuncias.pendingComplaints,
  disableContinueNewComplaint: state.denuncias.disableContinueNewComplaint,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoDenuncia);
