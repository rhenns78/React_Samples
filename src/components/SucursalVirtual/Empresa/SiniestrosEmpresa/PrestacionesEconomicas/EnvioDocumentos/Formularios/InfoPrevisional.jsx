import React from "react";
import { connect } from "react-redux";
import { Button, ValidationGroup, CheckBox, List } from "devextreme-react";
import { lastStep, nextStep, setDataForms, doUploadFile, doDeleteSingleFile } from "../../actions";
import helper from "../../../../../../../helpers/validaciones";
import FileUploaderField from "../../../../../../Shared/fields/FileUploaderField";
import SelectField from "../../../../../../Shared/fields/SelectField";
import NumberField from "../../../../../../Shared/fields/NumberField";
const IsapresCmbx = [
  { Id: "1", Description: "Banmédica" },
  { Id: "2", Description: "Colmena Golden Cross S.A" },
  { Id: "3", Description: "Consalud S.A." },
  { Id: "4", Description: "Cruz Blanca S.A" },
  { Id: "5", Description: "Nueva Masvida S.A." },
  { Id: "6", Description: "Vida Tres S.A." },

];

class InfoPrevisional extends React.PureComponent {
  constructor(props) {
    super(props);

    this.topRef = React.createRef();
    if (!props.jsonData.formInfoPrevisional) {
      props.dispatch(setDataForms({
        ...props.jsonData,
        formInfoPrevisional: {},
      }));
    }
  }

  handleBack = () => {
    this.topRef.current.scrollIntoView();

    this.props.dispatch(lastStep());
  }
  handleNext = (params) => {
    const result = params.validationGroup.validate();
    if (result.isValid) {
      this.topRef.current.scrollIntoView();
      const jsonData = { ...this.props.jsonData };
      jsonData.step1Complete = this.props.jsonData.step1Complete;
      jsonData.step2Complete = this.props.jsonData.step2Complete;
      jsonData.step3Complete = true;
      jsonData.step4Complete = false;
      this.props.dispatch(setDataForms(jsonData));
      this.props.dispatch(nextStep());
      this.props.onSave(false);
    }
  }

  handleChange = (e) => {
    const jsonData = { ...this.props.jsonData };
    jsonData.formInfoPrevisional[e.element.id] = e.value;

    if (jsonData.formInfoPrevisional.checkAllMonth) {
      this.shareInfoAllMonth(jsonData.formInfoPrevisional.checkAllMonth);
    }

    // switch (e.element.id) {
    //   case "tipoPervisionSaludMesUno": {
    //     if (e.value && jsonData.formInfoPrevisional.checkAllMonth === true) {

    //     }
    //     break;
    //   }
    //   default:
    //     break;
    // }

    this.props.dispatch(setDataForms(jsonData));
  }
  shareInfoAllMonth = (value) => {
    const jsonData = { ...this.props.jsonData };
    const form = jsonData.formInfoPrevisional;
    const monthsDisplay = this.props.jsonData.monthsDisplay;
    const rutWorker = helper.formatRut(jsonData.formInfoTrabajador.Rut, { showDots: false, showHyphen: true });

    if (form.tipoPervisionSaludMesUno ||
      form.valorPlanMesUno || form.unidadMesUno || form.afpMesUno || form.adjuntoAfiliacionMesUno) {
      if (monthsDisplay.length >= 2) {
        if (form.hasOwnProperty("adjuntoAfiliacionMesDos") && form.adjuntoAfiliacionMesDos !== undefined
            && value === true && form.adjuntoAfiliacionMesDos !== form.adjuntoAfiliacionMesUno) {
          this.props.dispatch(doDeleteSingleFile({
            rutTrabajador: rutWorker,
            rutUsuario: this.props.userData.RUT,
            idPrestacion: jsonData.idFinancialBenefit,
            NombreArchivo: jsonData.formInfoPrevisional.adjuntoAfiliacionMesDos,
          }, false));
        }


        form.tipoPervisionSaludMesDos = value === true ? form.tipoPervisionSaludMesUno : null;
        form.valorPlanMesDos = value === true ? form.valorPlanMesUno : null;
        form.unidadMesDos = value === true ? form.unidadMesUno : null;
        form.afpMesDos = value === true ? form.afpMesUno : null;
        form.adjuntoAfiliacionMesDos = value === true ? form.adjuntoAfiliacionMesUno : null;
        form.IsapreMesDos = value === true ? form.IsapreMesUno : null;
      }
      if (monthsDisplay.length === 3) {
        if (form.hasOwnProperty("adjuntoAfiliacionMesTres") && form.adjuntoAfiliacionMesTres !== undefined
          && form.adjuntoAfiliacionMesTres !== form.adjuntoAfiliacionMesUno && value === true) {
          this.props.dispatch(doDeleteSingleFile({
            rutTrabajador: rutWorker,
            rutUsuario: this.props.userData.RUT,
            idPrestacion: jsonData.idFinancialBenefit,
            NombreArchivo: jsonData.formInfoPrevisional.adjuntoAfiliacionMesTres,
          }, false));
        }
        form.tipoPervisionSaludMesTres = value === true ? form.tipoPervisionSaludMesUno : null;
        form.valorPlanMesTres = value === true ? form.valorPlanMesUno : null;
        form.unidadMesTres = value === true ? form.unidadMesUno : null;
        form.afpMesTres = value === true ? form.afpMesUno : null;
        form.adjuntoAfiliacionMesTres = value === true ? form.adjuntoAfiliacionMesUno : null;
        form.IsapreMesTres = value === true ? form.IsapreMesUno : null;
      }
    }


    form.checkAllMonth = value;
    jsonData.formInfoPrevisional = form;
    this.props.dispatch(setDataForms(jsonData));
  }
  handeChangeDctos = (e) => {
    const jsonData = { ...this.props.jsonData };

    const rutWorker = helper.formatRut(jsonData.formInfoTrabajador.Rut, { showDots: false, showHyphen: true });
    jsonData.container = `${rutWorker}${this.props.userData.RUT}${jsonData.idFinancialBenefit}`;
    const data = {};
    data.rutTrabajador = rutWorker;
    data.rutUsuario = this.props.userData.RUT;
    data.idPrestacion = jsonData.idFinancialBenefit;
    switch (e.element.id) {
      case "adjuntoAfiliacionMesUno": {
        if (e.value) {
          const archivo = e.value[0];

          data.files = archivo;
          if (jsonData.formInfoPrevisional.hasOwnProperty("adjuntoAfiliacionMesUno") === true) {
            this.props.dispatch(doDeleteSingleFile({
              rutTrabajador: rutWorker,
              rutUsuario: this.props.userData.RUT,
              idPrestacion: jsonData.idFinancialBenefit,
              NombreArchivo: jsonData.formInfoPrevisional.adjuntoAfiliacionMesUno,
            }, false));
          }
          jsonData.formInfoPrevisional.adjuntoAfiliacionMesUno = archivo.name;
          this.props.dispatch(doUploadFile(data));
          if (jsonData.formInfoPrevisional.checkAllMonth) {
            this.shareInfoAllMonth(jsonData.formInfoPrevisional.checkAllMonth);
          }
        }
        break;
      }

      case "adjuntoAfiliacionMesDos": {
        if (e.value) {
          const archivo = e.value[0];
          data.files = archivo;
          if (jsonData.formInfoPrevisional.hasOwnProperty("adjuntoAfiliacionMesUno") === true) {
            this.props.dispatch(doDeleteSingleFile({
              rutTrabajador: rutWorker,
              rutUsuario: this.props.userData.RUT,
              idPrestacion: jsonData.idFinancialBenefit,
              NombreArchivo: jsonData.formInfoPrevisional.adjuntoAfiliacionMesDos,
            }, false));
          }
          jsonData.formInfoPrevisional.adjuntoAfiliacionMesDos = archivo.name;
          this.props.dispatch(doUploadFile(data));
        }
        break;
      }

      case "adjuntoAfiliacionMesTres": {
        if (e.value) {
          const archivo = e.value[0];
          data.files = archivo;
          if (jsonData.formInfoPrevisional.hasOwnProperty("adjuntoAfiliacionMesUno") === true) {
            this.props.dispatch(doDeleteSingleFile({
              rutTrabajador: rutWorker,
              rutUsuario: this.props.userData.RUT,
              idPrestacion: jsonData.idFinancialBenefit,
              NombreArchivo: jsonData.formInfoPrevisional.adjuntoAfiliacionMesTres,
            }, false));
          }
          jsonData.formInfoPrevisional.adjuntoAfiliacionMesTres = archivo.name;
          this.props.dispatch(doUploadFile(data));
        }
        break;
      }

      default:
        break;
    }

    this.props.dispatch(setDataForms(jsonData));
  }
  eliminoDcto(dcto, property) {
    const jsonData = { ...this.props.jsonData };
    const rutWorker = helper.formatRut(jsonData.formInfoTrabajador.Rut, { showDots: false, showHyphen: true });
    jsonData.container = `${rutWorker}${this.props.userData.RUT}${jsonData.idFinancialBenefit}`;
    jsonData.formInfoPrevisional[property] = null;

    if (property === "adjuntoAfiliacionMesUno") {
      if (jsonData.formInfoPrevisional.adjuntoAfiliacionMesDos === dcto) jsonData.formInfoPrevisional.adjuntoAfiliacionMesDos = null;
      if (jsonData.formInfoPrevisional.adjuntoAfiliacionMesTres === dcto) jsonData.formInfoPrevisional.adjuntoAfiliacionMesTres = null;
    }

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

  render() {
    const form = { ...this.props.jsonData.formInfoPrevisional };
    const monthsDisplay = this.props.jsonData.monthsDisplay;


    return (
      <div className="row" >


        <div className="col-12 newDenuncia-title" ref={this.topRef}>
          <h2>Información del Previsional</h2>
          <p>Debe llenar todos los datos para pasar a la siguiente sección</p>
        </div>
        { monthsDisplay.length > 1 &&
          <div className="col-12" style={{ marginBottom: 10 }}>
            <CheckBox
              id="checkAllMonths"
              className="newDenuncia-subtitle"
              text="Repetir la información en todos los meses"
              // disabled={
              //   !((form.tipoPervisionSaludMesUno &&
              //   form.valorPlanMesUno && form.unidadMesUno && form.afpMesUno && form.adjuntoAfiliacionMesUno))

              // }
              value={form.checkAllMonth}
              onValueChanged={(check) => this.shareInfoAllMonth(check.value)}
            />
          </div>
        }
        <ValidationGroup >
          <div className="col-12">
            <h4 className="newDenuncia-subtitle"> Información previsional de {monthsDisplay[0]}
              {form.checkAllMonth === true && monthsDisplay.length >= 2 ? `- ${monthsDisplay[1]}` : null }
              {form.checkAllMonth === true && monthsDisplay.length === 3 ? `- ${monthsDisplay[2]}` : null }

            </h4>
            <SelectField
              label="Previsón de salud"
              id="tipoPervisionSaludMesUno"
              onValueChanged={this.handleChange}
              value={form && form.tipoPervisionSaludMesUno ? form.tipoPervisionSaludMesUno : null}
              items={["Isapre", "Fonasa", "Capredena"]}
            />
            { form.hasOwnProperty("tipoPervisionSaludMesUno") && form.tipoPervisionSaludMesUno === "Isapre" ?
              <React.Fragment>
                <SelectField
                  label="Isapre"
                  id="IsapreMesUno"
                  value={form && form.IsapreMesUno ? form.IsapreMesUno : null}
                  dataSource={IsapresCmbx}
                  displayExpr="Description"
                  valueExpr="Description"
                  onValueChanged={this.handleChange}
                />
                <div className="row zero-vertical">
                  <div className="col-8 zero-right">
                    <NumberField
                      label="Valor Plan"
                      id="valorPlanMesUno"
                      value={form && form.valorPlanMesUno ? parseInt(form.valorPlanMesUno, 10) : null}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-4">
                    <SelectField
                      label="Unidad"
                      id="unidadMesUno"
                      value={form.unidadMesUno}
                      onValueChanged={this.handleChange}
                      items={["UF", "Pesos", "UTM"]}
                    />

                  </div>
                </div>
              </React.Fragment>
              :
              ""
            }


            <FileUploaderField
              id="adjuntoAfiliacionMesUno"
              label="Adjuntar FUN o certificado de afiliación a isarpe"
              text="Adjuntar Archivo"
              multiple={false}
              uploadMode="useForm"
              onChange={this.handeChangeDctos}
              validar={form.adjuntoAfiliacionMesUno === null}

            />
            {
              this.props.listaDocumentosIngresados && this.props.listaDocumentosIngresados.length > 0 && this.renderDocument(form.adjuntoAfiliacionMesUno, "adjuntoAfiliacionMesUno", `Documento afiliación de ${monthsDisplay[0]}`)
            }

            <SelectField
              label="AFP"
              id="afpMesUno"
              value={form && form.afpMesUno ? form.afpMesUno : null}
              dataSource={this.props.listaAfp}
              displayExpr="Text"
              valueExpr="Text"
              onValueChanged={this.handleChange}
            />

          </div>
          {monthsDisplay.length >= 2 && form.checkAllMonth === false ?

            <div className="col-12">
              <h4 className="newDenuncia-subtitle"> Información previsional de {monthsDisplay[1]}</h4>
              <SelectField
                label="Previsón de salud"
                id="tipoPervisionSaludMesDos"
                onValueChanged={this.handleChange}
                value={form && form.tipoPervisionSaludMesDos ? form.tipoPervisionSaludMesDos : null}
                items={["Isapre", "Fonasa", "Capredena"]}
              />
              {form.hasOwnProperty("tipoPervisionSaludMesDos") && form.tipoPervisionSaludMesDos === "Isapre" ?
                <React.Fragment>
                  <SelectField
                    label="Isapre"
                    id="IsapreMesDos"
                    value={form && form.IsapreMesDos ? form.IsapreMesDos : null}
                    dataSource={IsapresCmbx}
                    displayExpr="Description"
                    valueExpr="Description"
                    onValueChanged={this.handleChange}
                  />
                  <div className="row zero-vertical">
                    <div className="col-8 zero-right">
                      <NumberField
                        label="Valor Plan"
                        id="valorPlanMesDos"
                        value={form && form.valorPlanMesDos ? parseInt(form.valorPlanMesDos, 10) : null}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col-4">
                      <SelectField
                        label="Unidad"
                        id="unidadMesDos"
                        value={form.unidadMesDos}
                        onValueChanged={this.handleChange}
                        items={["UF", "Pesos", "UTM"]}
                      />

                    </div>
                  </div>
                </React.Fragment>
                :
                ""
              }

              <FileUploaderField
                id="adjuntoAfiliacionMesDos"
                label="Adjuntar FUN o certificado de afiliación a isarpe"
                text="Adjuntar Archivo"
                multiple={false}
                uploadMode="useForm"
                onChange={this.handeChangeDctos}
                validar={form.adjuntoAfiliacionMesDos === null}
              />
              {
                this.props.listaDocumentosIngresados && this.props.listaDocumentosIngresados.length > 0 && this.renderDocument(form.adjuntoAfiliacionMesDos, "adjuntoAfiliacionMesDos", `Documento afiliación de ${monthsDisplay[1]}`)
              }
              <SelectField
                label="AFP"
                id="afpMesDos"
                value={form && form.afpMesDos ? form.afpMesDos : null}
                dataSource={this.props.listaAfp}
                displayExpr="Text"
                valueExpr="Text"
                onValueChanged={this.handleChange}
              />

            </div>
            :
            ""

          }


          {monthsDisplay.length === 3 && form.checkAllMonth === false ?

            <div className="col-12">
              <h4 className="newDenuncia-subtitle"> Información previsional de {monthsDisplay[2]}</h4>
              <SelectField
                label="Previsón de salud"
                id="tipoPervisionSaludMesTres"
                onValueChanged={this.handleChange}
                value={form && form.tipoPervisionSaludMesTres ? form.tipoPervisionSaludMesTres : null}
                items={["Isapre", "Fonasa", "Capredena"]}
              />
              {form.hasOwnProperty("tipoPervisionSaludMesTres") && form.tipoPervisionSaludMesTres === "Isapre" ?
                <React.Fragment>
                  <SelectField
                    label="Isapre"
                    id="IsapreMesTres"
                    value={form && form.IsapreMesTres ? form.IsapreMesTres : null}
                    dataSource={IsapresCmbx}
                    displayExpr="Description"
                    valueExpr="Description"
                    onValueChanged={this.handleChange}
                  />
                  <div className="row zero-vertical">
                    <div className="col-8 zero-right">
                      <NumberField
                        label="Valor Plan"
                        id="valorPlanMesTres"
                        value={form && form.valorPlanMesTres ? parseInt(form.valorPlanMesTres, 10) : null}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col-4">
                      <SelectField
                        label="Unidad"
                        id="unidadMesTres"
                        value={form.unidadMesTres}
                        onValueChanged={this.handleChange}
                        items={["UF", "Pesos", "UTM"]}
                      />

                    </div>
                  </div>
                </React.Fragment>
                :
                ""
              }

              <FileUploaderField
                id="adjuntoAfiliacionMesTres"
                label="Adjuntar FUN o certificado de afiliación a isarpe"
                text="Adjuntar Archivo"
                multiple={false}
                uploadMode="useForm"
                onChange={this.handeChangeDctos}
                validar={form.adjuntoAfiliacionMesTres === null}
              />
              {
                this.props.listaDocumentosIngresados && this.props.listaDocumentosIngresados.length > 0 && this.renderDocument(form.adjuntoAfiliacionMesTres, "adjuntoAfiliacionMesTres", `Documento afiliación de ${monthsDisplay[2]}`)
              }
              <SelectField
                label="AFP"
                id="afpMesTres"
                value={form && form.afpMesTres ? form.afpMesTres : null}
                dataSource={this.props.listaAfp}
                displayExpr="Text"
                valueExpr="Text"
                onValueChanged={this.handleChange}
              />

            </div>
            :
            ""
          }


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
      </div >
    );
  }
}
const mapStateToProps = (state) => ({
  jsonData: state.prestacionesEmpresa.jsonData,
  listaAfp: state.global.listaAfp,
  userData: state.global.userData,
  listaDocumentosIngresados: state.prestacionesEmpresa.listaDocumentosIngresados,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoPrevisional);
