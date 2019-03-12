import React from "react";
import { connect } from "react-redux";
import { Button, ValidationGroup, List } from "devextreme-react";

import { setDataForms, nextStep, doUploadFile, doDeleteSingleFile, loading } from "../../actions";
import TextField from "../../../../../../Shared/fields/TextField";
import SelectField from "../../../../../../Shared/fields/SelectField";
import RadioGroupfield from "../../../../../../Shared/fields/RadioGroupField";
import FileUploaderField from "../../../../../../Shared/fields/FileUploaderField";
import helper from "../../../../../../../helpers/validaciones";
import DateField from "../../../../../../Shared/fields/DateField";
import NumberField from "../../../../../../Shared/fields/NumberField";

const TipoCuentaCmbx = [
  { Id: "1", Description: "Corriente" },
  { Id: "2", Description: "Vista" },
  { Id: "3", Description: "Ahorro" },

];

class InfoTrabajador extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      firstEdit: !props.editingDraft,


    };

    this.topRef = React.createRef();
  }

  componentDidMount = () => {

  }


  handleNext = (params) => {
    const result = params.validationGroup.validate();
    const jsonData = { ...this.props.jsonData };
    if (result.isValid) {
      this.topRef.current.scrollIntoView();
      jsonData.step1Complete = true;
      jsonData.step2Complete = false;
      jsonData.step3Complete = false;
      jsonData.step4Complete = false;

      this.props.dispatch(setDataForms(jsonData));
      this.props.onSave(false);
      this.props.dispatch(nextStep());
    }
  }


  handleChange = (e) => {
    const jsonData = { ...this.props.jsonData };
    jsonData.formInfoTrabajador[e.element.id] = e.value;

    switch (e.element.id) {
      case "fechaContrato": {
        if (e.value) {
          this.props.dispatch(loading(true));
          const result = helper.calculoMeses(e.value, jsonData.fechaSiniestro);
          jsonData.monthsDisplay = result.Meses;
          jsonData.middleStepsEnabled = result.middleStepsEnabled;

          if (result.numeroMeses === 0) {
            jsonData.formInfoLaboral = {};
            jsonData.step1Complete = true;
            jsonData.step2Complete = false;
            jsonData.step3Complete = false;
            jsonData.step4Complete = false;
          }
          this.props.dispatch(loading(false));
        }

        break;
      }
      case "FormaPago": {
        if (e.value === "Vale Vista") {
          jsonData.formInfoTrabajador.Bank = "BANCO SANTANDER-CHILE";
        }
        break;
      }
      case "contratoTrabajo": {
        const rutWorker = helper.formatRut(jsonData.formInfoTrabajador.Rut, { showDots: false, showHyphen: true });
        jsonData.container = `${rutWorker}${this.props.userData.RUT}${jsonData.idFinancialBenefit}`;

        if (e.value) {
          const archivo = e.value[0];
          const data = {};
          data.rutTrabajador = rutWorker;
          data.rutUsuario = this.props.userData.RUT;
          data.idPrestacion = jsonData.idFinancialBenefit;
          data.files = archivo;
          if (jsonData.formInfoTrabajador.contratoTrabajo !== "") {
            this.props.dispatch(doDeleteSingleFile({
              rutTrabajador: rutWorker,
              rutUsuario: this.props.userData.RUT,
              idPrestacion: jsonData.idFinancialBenefit,
              NombreArchivo: jsonData.formInfoTrabajador.contratoTrabajo[0].name,
            }, false));
          }
          jsonData.formInfoTrabajador.contratoTrabajo = archivo.name;
          this.props.dispatch(doUploadFile(data));
        }
        break;
      }
      case "oficio": {
        const rutWorker = helper.formatRut(jsonData.formInfoTrabajador.Rut, { showDots: false, showHyphen: true });
        jsonData.container = `${rutWorker}${this.props.userData.RUT}${jsonData.idFinancialBenefit}`;

        if (e.value) {
          const archivo = e.value[0];
          const data = {};
          data.rutTrabajador = rutWorker;
          data.rutUsuario = this.props.userData.RUT;
          data.idPrestacion = jsonData.idFinancialBenefit;
          data.files = archivo;
          if (jsonData.formInfoTrabajador.oficio !== "") {
            this.props.dispatch(doDeleteSingleFile({
              rutTrabajador: rutWorker,
              rutUsuario: this.props.userData.RUT,
              idPrestacion: jsonData.idFinancialBenefit,
              NombreArchivo: jsonData.formInfoTrabajador.oficio[0].name,
            }, false));
          }
          jsonData.formInfoTrabajador.oficio = archivo.name;
          this.props.dispatch(doUploadFile(data));
        }
        break;
      }


      default:
        break;
    }


    this.props.dispatch(setDataForms(jsonData));
    if (this.state.firstEdit && !this.props.editingDraft && jsonData.Id === null) {
      this.setState({ firstEdit: false });
      // se crea el draf
      this.props.onCreate();
    }
  }


  emailValidation=(e) => {
    if (helper.validarEmail(e.value)) {
      return true;
    }
    return false;
  }
  verDcto(dcto) {
    console.log("veo", dcto);
  }
  eliminoDcto(dcto, property) {
    const jsonData = { ...this.props.jsonData };
    const rutWorker = helper.formatRut(jsonData.formInfoTrabajador.Rut, { showDots: false, showHyphen: true });
    jsonData.container = `${rutWorker}${this.props.userData.RUT}${jsonData.idFinancialBenefit}`;
    jsonData.formInfoTrabajador[property] = null;
    this.props.dispatch(doDeleteSingleFile({
      rutTrabajador: rutWorker,
      rutUsuario: this.props.userData.RUT,
      idPrestacion: jsonData.idFinancialBenefit,
      NombreArchivo: dcto,
    }, true));
    this.props.dispatch(setDataForms(jsonData));
  }

  renderDocument = (nmbDcto, property, titulo) => {
    const list = this.props.listaDocumentosIngresados.filter((item) => item.Nombre === nmbDcto);
    return (
      <React.Fragment>
        <div style={{ marginBottom: 10 }}>
          <span className="title">  {titulo} </span>
          <List
            className="draf-document-list"
            scrollByContent
            selectedIndex={2}
            noDataText="Sin documentos"
            items={list}
            itemComponent={(item) => (
              <div className="list-document-wrapper">
                <div className="text">
                  <span className="text"> <i className="material-icons" style={{ fontSize: 10 }} > attach_file </i> {item.Nombre}</span>
                </div>

                <div style={{ paddingLeft: 5 }} >
                  <Button
                    stylingMode="text"
                    className="material-icons"
                    style={{
                      backgroundColor: "Transparent",
                      border: "none",
                    }}
                    key={`${item.Nombre}_eliminar`}
                    onClick={() => this.eliminoDcto(item.Nombre, property)}
                  >
                    <i className="material-icons" style={{ fontSize: 10 }} > delete </i>
                  </Button>
                </div>


              </div>
            )}
          />
        </div >
      </React.Fragment>
    );
  }
  renderFormasDePago = (form) => {
    let seccion = null;

    if (form.FormaPago === "Vale Vista") {
      seccion = (
        <SelectField
          label="Banco"
          id="Bank"
          value={form.FormaPago !== "Vale Vista" ? form.Bank : "BANCO SANTANDER-CHILE"}
          dataSource={this.props.listaBancos}
          displayExpr="Banco"
          valueExpr="Banco"
          disabled
          onValueChanged={this.handleChange}
        />
      );
    }
    if (form.FormaPago === "Transferencia electrónica") {
      seccion = (
        <React.Fragment>
          <SelectField
            label="Banco"
            id="Bank"
            value={form.Bank}
            dataSource={this.props.listaBancos}
            displayExpr="Banco"
            valueExpr="Banco"
            onValueChanged={this.handleChange}
          />
          <SelectField
            label="Tipo cuenta"
            id="AccountType"
            value={form.AccountType}
            onValueChanged={this.handleChange}
            dataSource={TipoCuentaCmbx}
            displayExpr="Description"
            valueExpr="Description"
          />
          <NumberField
            label="Número de cuenta"
            id="AccountNumber"
            value={parseInt(form.AccountNumber, 10)}
            onChange={this.handleChange}

          />
        </React.Fragment>

      );
    }

    return seccion;
  }

  render() {
    const form = { ...this.props.jsonData.formInfoTrabajador };


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
            value={form.Rut}
            onChange={this.handleChange}
          />


          <TextField
            label="Nombre trabajador"
            disabled
            id="Nombre"
            value={`${form.FirstName} ${form.LastName}`}
            onChange={this.handleChange}
          />
          <TextField
            label="Correo electrónico"
            id="email"
            value={form.email}
            onChange={this.handleChange}
            customRules={{
              type: "custom",
              validationCallback: this.emailValidation,
              message: "El mail no coincide",
            }
            }
          />


        </div>


        <div className="col-12">
          <h4 className="newDenuncia-subtitle">Contrato de trabajo</h4>

          <DateField
            label="Fecha de contratación del trabajador"
            id="fechaContrato"
            value={form.fechaContrato}
            onChange={this.handleChange}
            type="date"
          />

          <FileUploaderField
            id="contratoTrabajo"
            label="Adjuntar contrato de trabajo"
            text="Adjuntar contrato"
            multiple={false}
            uploadMode="useForm"
            onChange={this.handleChange}
            validar={form.contratoTrabajo === null}
          />
          {
            this.props.listaDocumentosIngresados && this.props.listaDocumentosIngresados.length > 0 && this.renderDocument(form.contratoTrabajo, "contratoTrabajo", "Contrato de trabajo")
          }


        </div>

        <div className="col-12">
          <h4 className="newDenuncia-subtitle">Retenciones judiciales del trabajador</h4>

          <RadioGroupfield
            label="El trabajador tiene retenciones judiciales"
            items={["Si", "No"]}
            id="RetencionesJudiciales"
            value={form.RetencionesJudiciales ? form.RetencionesJudiciales : "No"}
            onValueChanged={this.handleChange}
            layout="horizontal"
          />
          { form.RetencionesJudiciales === "Si" &&
            (
              <React.Fragment>
                <FileUploaderField
                  id="oficio"
                  text="Adjuntar oficio"
                  label="Adjuntar oficio"
                  disabled={!((this.state.enabledOficio === true || form.RetencionesJudiciales === "Si"))}
                  multiple={false}
                  uploadMode="useForm"
                  onChange={this.handleChange}
                  validar={form.oficio === null}
                />

                {form.oficio !== null && this.renderDocument(form.oficio, "oficio", "Retenciones judiciales")}
              </React.Fragment>
            )

          }


        </div>

        <div className="col-12">
          <h4 className="newDenuncia-subtitle">Medio de pago trabajador</h4>
          <SelectField
            label="Medio de pago"
            id="FormaPago"
            value={form.FormaPago}
            onValueChanged={this.handleChange}
            items={["Transferencia electrónica", "Vale Vista"]}
          />

          {this.renderFormasDePago(form)}


        </div>

        <div className="col-12">

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
  jsonData: state.prestacionesEmpresa.jsonData,
  showHideForm: state.prestacionesEmpresa.showHideForm,
  editingDraft: state.prestacionesEmpresa.editingDraft,
  listaBancos: state.global.listaBancos,
  userData: state.global.userData,
  listaDocumentosIngresados: state.prestacionesEmpresa.listaDocumentosIngresados,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoTrabajador);
