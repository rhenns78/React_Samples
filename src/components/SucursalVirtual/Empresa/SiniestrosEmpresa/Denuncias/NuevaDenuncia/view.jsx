import React from "react";
import { connect } from "react-redux";
import { Button, Popup } from "devextreme-react";
import { setShowHideForm, setCleanDataComplain, doCreateDraft, doUpdateDraft, openCloseModalBorrador, doDeleteDraft, setStep, editingDraft, callListMyData } from "../actions";
import InfoDenuncia from "./Formularios/infoDenuncia";
import InfoTrabjador from "./Formularios/InfoTrabjador";
import DatoSiniestro from "./Formularios/DatoSiniestro";
import Denunciante from "./Formularios/Denunciante";
import DatosEmpresa from "./Formularios/DatosEmpresa";
import EnvioDenuncia from "./Formularios/EnvioDenuncia";
import validaciones from "../../../../../../helpers/validaciones";
import LoadingOverlay from "../../../../../Shared/LoadingOverlay";
import DatosEnfermedad from "./Formularios/DatosEnfermedad";

class FormNuevaDenuncia extends React.PureComponent {
  constructor(props) {
    super(props);

    if (this.props.listaSexos.length === 0 || this.props.listaNacionalidades.length === 0 || this.props.listaPueblosOriginarios.length === 0 ||
      this.props.listaCategoriasOcupacionales.length === 0 || this.props.listaTiposIngreso.length === 0 || this.props.listaTiposContrato.length === 0 ||
      this.props.listaTiposCalle.length === 0 || this.props.listaClasificacionesAccidentes.length === 0 || this.props.listaMediosPrueba.length === 0) {
      const lista = {
        listaSexos: this.props.listaSexos.length === 0,
        listaNacionalidades: this.props.listaNacionalidades.length === 0,
        listaPueblosOriginarios: this.props.listaPueblosOriginarios.length === 0,
        listaCategoriasOcupacionales: this.props.listaCategoriasOcupacionales.length === 0,
        listaTiposIngreso: this.props.listaTiposIngreso.length === 0,
        listaTiposContrato: this.props.listaTiposContrato.length === 0,
        listaTiposCalle: this.props.listaTiposCalle.length === 0,
        listaClasificacionesAccidentes: this.props.listaClasificacionesAccidentes.length === 0,
        listaMediosPrueba: this.props.listaMediosPrueba.length === 0,
      };
      this.props.dispatch(callListMyData("", lista));
    }

    this.autoSaveTimer = null;
  }

  componentDidUpdate = (prevProps) => {
    if ((!prevProps.showHideForm && this.props.showHideForm) && this.props.editingDraft) {
      this.startTimer();
    }

    if (this.props.showHideForm && !prevProps.editingDraft && this.props.editingDraft) {
      this.startTimer();
    }

    if (prevProps.showHideForm && !this.props.showHideForm) {
      this.stoptimer();
    }
  }

  getJsonData = () => {
    const Data = {};
    Data.Rut = validaciones.formatRut(this.props.jsonData.formInfoDenuncia.rutTxt, { showDots: false, showHyphen: true });
    Data.CompanyRut = this.props.companyId;
    Data.UserRut = this.props.userData.RUT;

    Data.jsonData = { ...this.props.jsonData };
    Data.jsonData.currentStep = this.props.activeStep;
    Data.jsonData.lastCompletedStep = this.props.lastCompletedStep;
    Data.jsonData = JSON.stringify(Data.jsonData);
    return Data;
  }

  startTimer = () => {
    this.autoSaveTimer = setTimeout(this.handleAutoSave, 1 * 60 * 1000);
  }

  stoptimer = () => {
    if (this.autoSaveTimer) {
      clearTimeout(this.autoSaveTimer);
    }
  }

  ListComplains = () => {
    if (this.props.isModified) {
      this.props.dispatch(openCloseModalBorrador(true));
    } else {
      this.props.dispatch(setShowHideForm(false));
      this.props.dispatch(setCleanDataComplain());
    }
  }

  handleAutoSave = () => {
    console.log("AUTO SAVING....");
    const data = this.getJsonData();
    this.props.dispatch(doUpdateDraft(data, false));
  }

  handleCreate = () => {
    const data = this.getJsonData();
    this.props.dispatch(doCreateDraft(data, false));
    this.props.dispatch(editingDraft(true));
  }

  handleSave = () => {
    const Data = this.getJsonData();
    if (this.props.editingDraft) {
      this.props.dispatch(doUpdateDraft(Data, true));
    } else {
      this.props.dispatch(doCreateDraft(Data, true));
    }
  }

  handleCerrar = (doDelete) => {
    this.props.dispatch(openCloseModalBorrador(false));
    if (doDelete) {
      const idComplaint = this.props.jsonData.Id;
      this.props.dispatch(setShowHideForm(false));
      this.props.dispatch(setCleanDataComplain());
      this.props.dispatch(doDeleteDraft(idComplaint));
    }
  }

  renderSteps(item, index) {
    const isStepCompleted = item.id <= this.props.lastCompletedStep;
    const isLastCompleted = item.id === this.props.lastCompletedStep;
    const isStepActive = item.id === this.props.activeStep;
    return (
      <div
        className="row zero"
        key={index}
        onClickCapture={() => {
          if (isStepCompleted && !isStepActive && item.id !== 1) {
            this.props.dispatch(setStep(item.id));
          }
        }}
        style={{
          userSelect: "none",
          marginTop: 3,
          cursor: isStepCompleted && item.id !== 1 ? "pointer" : "",
        }}
      >
        <div
          className="numberCircle"
          style={{
            background: isStepActive ? "#FFFF" : isStepCompleted ? "#9DC551" : "#00B2A9",
          }}
        >
          <div className="numberCircleText" style={{ color: isStepActive ? "#004A52" : "#FFFF" }}>
            {isStepCompleted && !isStepActive && !isLastCompleted ? <i className="material-icons">done</i> : item.id}
          </div>
        </div>
        <div className="contentTextStep col-10 zero-right">
          <div>
            <h4 style={{ color: "#FFFF" }}>
              {(index === 2 && this.props.jsonData.formInfoDenuncia.tipoDenuncia === "DIEP") ? item.text2 : item.text}
            </h4>
          </div>
          {isStepActive ? <p style={{ color: "white", marginBottom: 10 }}>{item.subtext}</p> : ""}
        </div>
      </div>
    );
  }

  renderCrearDenuncia = () => (
    <div>
      <div className="col-12" style={{ justifyContent: "center" }}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <p> ¿Quieres guardar la denuncia como borrador y terminar la gestión más tarde? </p>
        </div>

      </div>
      <div
        className="col-12"
        style={{
          position: "fixed", bottom: 10, width: "87%", textAlign: "center",
        }}
      >
        <Button
          text="Descartar borrador"
          type="normal"
          onClick={() => this.handleCerrar(true)}
          style={{ marginRight: 15 }}
        />
        <Button
          text="Guardar Borrador"
          type="success"

          onClick={this.handleSave}

        />

      </div>
    </div>
  )

  render() {
    return (
      <div
        className="row zero formDenunicas"
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          top: 0,
          left: this.props.showHideForm ? 0 : 2000,
          opacity: this.props.showHideForm ? 1 : 0,
          right: 0,
          bottom: 0,
          backgroundColor: "white",
          zIndex: 300,
          display: "flex",
          flexWrap: "nowrap",
        }}
      >
        {this.props.isLoading && <LoadingOverlay />}
        <div
          style={{
            paddingTop: 20, backgroundColor: "#004A52", minWidth: 290, maxWidth: 290,
          }}
        >
          <div className="tituloLogin col-12">
            <h2 style={{ color: "#fff" }}>Nueva Denuncia</h2>
          </div>
          <div className="col-12">
            {this.props.steps.map((item, index) => this.renderSteps(item, index))}
          </div>
        </div>

        <div
          style={{
            overflowY: "auto", right: 0, height: "100%", width: "100%",
          }}
        >
          <div className="zero container-fluid">
            {this.props.showHideForm && (
              <div className="BtnCloseAlign">
                <Button
                  style={{
                    borderRadius: "50%",
                    background: "#EEEEEE",
                  }}
                  onClick={this.ListComplains}
                >
                  <i className="material-icons" style={{ fontSize: 20, color: "#8A8A8A", fontWeight: 700 }} > clear </i>
                </Button>
              </div>
            )}
            <div
              className="row zero"
              style={{
                maxWidth: 600, minWidth: 370, marginLeft: 15, marginBottom: 60, paddingRight: 70,
              }}
            >
              {this.props.activeStep === 1 && <InfoDenuncia onSave={this.handleAutoSave} />}
              {this.props.activeStep === 2 && <InfoTrabjador onSave={this.handleAutoSave} onCreate={this.handleCreate} />}
              {this.props.activeStep === 3 && (this.props.jsonData.formInfoDenuncia.tipoDenuncia === "DIAT" ?
                <DatoSiniestro onSave={this.handleAutoSave} /> : <DatosEnfermedad onSave={this.handleAutoSave} />)}
              {this.props.activeStep === 4 && <Denunciante onSave={this.handleAutoSave} />}
              {this.props.activeStep === 5 && <DatosEmpresa onSave={this.handleAutoSave} />}
              {this.props.activeStep === 6 && <EnvioDenuncia onSave={this.handleAutoSave} />}

              <Popup
                visible={this.props.isOpenModalBorrador}
                dragEnabled={false}
                maxHeight="270px"
                onHiding={() => this.handleCerrar(false)}
                maxWidth="500px"
                title="Guardar denuncia en proceso"
                showTitle
                contentRender={() => (this.renderCrearDenuncia())}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  lastCompletedStep: state.denuncias.lastCompletedStep,
  isLoading: state.denuncias.isLoading,
  steps: state.denuncias.steps,
  activeStep: state.denuncias.activeStep,
  showHideForm: state.denuncias.showHideForm,
  isOpenModalBorrador: state.denuncias.isOpenModalBorrador,
  editingDraft: state.denuncias.editingDraft,
  isModified: state.denuncias.isModified,
  companyId: state.global.companyId,
  userData: state.global.userData,
  jsonData: state.denuncias.jsonData,

  listaSexos: state.global.listaSexos,
  listaNacionalidades: state.global.listaNacionalidades,
  listaPueblosOriginarios: state.global.listaPueblosOriginarios,
  listaCategoriasOcupacionales: state.global.listaCategoriasOcupacionales,
  listaTiposIngreso: state.global.listaTiposIngreso,
  listaTiposContrato: state.global.listaTiposContrato,
  listaTiposCalle: state.global.listaTiposCalle,
  listaClasificacionesAccidentes: state.global.listaClasificacionesAccidentes,
  listaMediosPrueba: state.global.listaMediosPrueba,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(FormNuevaDenuncia);
