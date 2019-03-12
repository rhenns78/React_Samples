import React from "react";
import { connect } from "react-redux";
import { Button, Popup } from "devextreme-react";
// import { setShowHideForm, setCleanDataComplain, doCreateDraft, doUpdateDraft, openCloseModalBorrador, doDeleteDraft, setStep, editingDraft } from "../actions";
import { setStep, setShowHideForm, setCleanDataDraft, openCloseModalBorrador,
  doCreateDraft, doDeleteDraft, doUpdateDraft, editingDraft, doGetDocuements } from "../actions";
import validaciones from "../../../../../../helpers/validaciones";
import LoadingOverlay from "../../../../../Shared/LoadingOverlay";

import InfoTrabajador from "./Formularios/InfoTrabjador";
import InfoLaboral from "./Formularios/InfoLaboral";
import InfoPrevisional from "./Formularios/InfoPrevisional";
import ResumenFinal from "./Formularios/EnvioDocumentacion";

class FormDocumentacion extends React.PureComponent {
  constructor(props) {
    super(props);

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
    if (prevProps.jsonData !== this.props.jsonData) {
      const rutWorker = validaciones.formatRut(this.props.jsonData.formInfoTrabajador.Rut, { showDots: false, showHyphen: true });

      const data = {
        rutUsuario: this.props.userData.RUT,
        rutTrabajador: rutWorker,
        idPrestacion: this.props.jsonData.idFinancialBenefit,

      };
      console.log("ACTUALIZA LISTA DOCUMENTOS...");
      this.props.dispatch(doGetDocuements(data));
    }
  }

  getJsonData = () => {
    const Data = {};
    Data.Rut = validaciones.formatRut(this.props.jsonData.formInfoTrabajador.Rut, { showDots: false, showHyphen: true });
    Data.CompanyRut = this.props.companyId;
    Data.UserRut = this.props.userData.RUT;
    Data.idFinancialBenefit = "00687544"; // this.props.jsonData.idFinancialBenefit;
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

  ListPrestacionesEconomicas = () => {
    if (this.props.isModified) {
      this.props.dispatch(openCloseModalBorrador(true));
    } else {
      this.props.dispatch(setShowHideForm(false));
      this.props.dispatch(setCleanDataDraft());
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
      const jsonData = this.props.jsonData;
      const rutWorker = validaciones.formatRut(jsonData.formInfoTrabajador.Rut, { showDots: false, showHyphen: true });
      const data = {
        rutUsuario: this.props.userData.RUT,
        rutTrabajador: rutWorker,
        idPrestacion: jsonData.idFinancialBenefit,
      };

      this.props.dispatch(setShowHideForm(false));
      this.props.dispatch(setCleanDataDraft());
      this.props.dispatch(doDeleteDraft(idComplaint, data));
    }
  }

  renderSteps(item, index) {
    // const isStepCompleted = item.id <= this.props.lastCompletedStep;
    const isLastCompleted = item.id === this.props.lastCompletedStep;
    const isStepActive = item.id === this.props.activeStep;
    const isStepEnabled = !(this.props.jsonData.middleStepsEnabled === false && item.id === 2);

    let isStepCompleted;
    switch (item.id) {
      case 1: {
        isStepCompleted = this.props.jsonData.step1Complete === true;
        break;
      }
      case 2: {
        isStepCompleted = this.props.jsonData.step2Complete === true;
        break;
      }
      case 3: {
        isStepCompleted = this.props.jsonData.step3Complete === true;
        break;
      }
      case 4: {
        isStepCompleted = this.props.jsonData.step4Complete === true;
        break;
      }
      default:
        break;
    }


    return (
      <div
        className="row zero"
        key={index}
        onClickCapture={() => {
          if (isStepCompleted && !isStepActive && isStepEnabled === true) {
            this.props.dispatch(setStep(item.id));
          }
        }}
        style={{
          userSelect: "none",
          marginTop: 3,
          cursor: isStepCompleted ? "pointer" : "",
        }}
      >
        <div
          className="numberCircle"
          style={{
            background: isStepEnabled === false ? "#787878" : isStepActive ? "#FFFF" : isStepCompleted ? "#9DC551" : "#00B2A9",
          }}
        >
          <div className="numberCircleText" style={{ color: isStepEnabled === false ? "#8A8A8A" : isStepActive ? "#004A52" : "#FFFF" }}>
            {
              isStepEnabled === false ? item.id :
                isStepCompleted && !isStepActive && !isLastCompleted ? <i className="material-icons">done</i> : item.id}
          </div>
        </div>
        <div className="contentTextStep col-10 zero-right">
          <div>
            <h4 style={{ color: "#FFFF" }}>
              {item.text}
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
          <p> ¿Quieres guardar como borrador y terminar la gestión más tarde? </p>
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
          right: 0,
          bottom: 0,
          backgroundColor: "white",
          zIndex: 1500,
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
            <h2 style={{ color: "#fff" }}>Documentación prestación económica</h2>
          </div>
          <div className="col-12">
            { this.props.steps.map((item, index) => this.renderSteps(item, index))
            }
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
                  onClick={this.ListPrestacionesEconomicas}
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
              {this.props.activeStep === 1 && <InfoTrabajador onSave={this.handleAutoSave} onCreate={this.handleCreate} />}
              {this.props.activeStep === 2 && this.props.jsonData.middleStepsEnabled === true && <InfoLaboral onSave={this.handleAutoSave} />}
              {this.props.activeStep === 3 && <InfoPrevisional onSave={this.handleAutoSave} />}
              {this.props.activeStep === 4 && <ResumenFinal onSave={this.handleAutoSave} />}
              <Popup
                visible={this.props.isOpenModalBorrador}
                dragEnabled={false}
                maxHeight="270px"
                onHiding={() => this.handleCerrar(false)}
                maxWidth="500px"
                title="Guardar Draft en proceso"
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
  lastCompletedStep: state.prestacionesEmpresa.lastCompletedStep,
  isLoading: state.prestacionesEmpresa.isLoading,
  steps: state.prestacionesEmpresa.steps,
  activeStep: state.prestacionesEmpresa.activeStep,
  showHideForm: state.prestacionesEmpresa.showHideForm,
  isOpenModalBorrador: state.prestacionesEmpresa.isOpenModalBorrador,
  editingDraft: state.prestacionesEmpresa.editingDraft,
  isModified: state.prestacionesEmpresa.isModified,
  companyId: state.global.companyId,
  userData: state.global.userData,
  jsonData: state.prestacionesEmpresa.jsonData,
  stepsComplete: state.prestacionesEmpresa.stepsComplete,
  listaDocumentosIngresados: state.prestacionesEmpresa.listaDocumentosIngresados,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDocumentacion);
