import React from "react";
import { connect } from "react-redux";
import { Button, ValidationGroup, List } from "devextreme-react";
import { lastStep, nextStep, setDataForms, doUploadFile, doDeleteSingleFile } from "../../actions";

import helper from "../../../../../../../helpers/validaciones";
import FileUploaderField from "../../../../../../Shared/fields/FileUploaderField";
import SelectField from "../../../../../../Shared/fields/SelectField";
import NumberField from "../../../../../../Shared/fields/NumberField";


class InfoLaboral extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {

      openMotivoMes1: false,
      openMotivoMes2: false,
      openMotivoMes3: false,


    };
    this.topRef = React.createRef();
    if (!props.jsonData.formInfoLaboral) {
      props.dispatch(setDataForms({
        ...props.jsonData,
        formInfoLaboral: {},
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
      jsonData.step2Complete = true;
      jsonData.step3Complete = false;
      jsonData.step4Complete = false;
      this.props.dispatch(setDataForms(jsonData));
      this.props.onSave(false);
      this.props.dispatch(nextStep());
    }
  }

  handleChange = (e) => {
    const jsonData = { ...this.props.jsonData };
    jsonData.formInfoLaboral[e.element.id] = e.value;

    switch (e.element.id) {
      case "DiasTrabajadosMesUno": {
        if (e.value <= 21) {
          this.setState({
            openMotivoMes1: true,
          });
        }
        break;
      }
      case "DiasTrabajadosMesDos": {
        if (e.value <= 21) {
          this.setState({
            openMotivoMes2: true,
          });
        }
        break;
      }
      case "DiasTrabajadosMesTres": {
        if (e.value <= 21) {
          this.setState({
            openMotivoMes3: true,
          });
        }

        break;
      }
      default:
        break;
    }


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
      case "adjuntoLiquidacionMesUno": {
        if (e.value) {
          const archivo = e.value[0];

          data.files = archivo;
          if (jsonData.formInfoLaboral.hasOwnProperty("adjuntoLiquidacionMesUno") === true) {
            this.props.dispatch(doDeleteSingleFile({
              rutTrabajador: rutWorker,
              rutUsuario: this.props.userData.RUT,
              idPrestacion: jsonData.idFinancialBenefit,
              NombreArchivo: jsonData.formInfoLaboral.adjuntoLiquidacionMesUno,
            }, false));
          }
          jsonData.formInfoLaboral.adjuntoLiquidacionMesUno = archivo.name;
          this.props.dispatch(doUploadFile(data));
        }
        break;
      }
      case "adjuntoJustificacionMesUno": {
        const archivo = e.value[0];
        data.files = archivo;
        if (jsonData.formInfoLaboral.hasOwnProperty("adjuntoJustificacionMesUno") === false || jsonData.formInfoLaboral.adjuntoJustificacionMesUno === null) {
          const justificaciones = [];
          justificaciones.push(archivo.name);
          jsonData.formInfoLaboral.adjuntoJustificacionMesUno = justificaciones;
        } else {
          jsonData.formInfoLaboral.adjuntoJustificacionMesUno.push(archivo.name);
        }
        this.props.dispatch(doUploadFile(data));
        break;
      }

      case "adjuntoLiquidacionMesDos": {
        if (e.value) {
          const archivo = e.value[0];
          data.files = archivo;
          if (jsonData.formInfoLaboral.hasOwnProperty("adjuntoLiquidacionMesDos") === true) {
            this.props.dispatch(doDeleteSingleFile({
              rutTrabajador: rutWorker,
              rutUsuario: this.props.userData.RUT,
              idPrestacion: jsonData.idFinancialBenefit,
              NombreArchivo: jsonData.formInfoLaboral.adjuntoLiquidacionMesDos,
            }, false));
          }
          jsonData.formInfoLaboral.adjuntoLiquidacionMesDos = archivo.name;
          this.props.dispatch(doUploadFile(data));
        }
        break;
      }
      case "adjuntoJustificacionMesDos": {
        const archivo = e.value[0];
        data.files = archivo;
        if (jsonData.formInfoLaboral.hasOwnProperty("adjuntoJustificacionMesDos") === false || jsonData.formInfoLaboral.adjuntoJustificacionMesDos === null) {
          const justificaciones = [];
          justificaciones.push(archivo.name);
          jsonData.formInfoLaboral.adjuntoJustificacionMesDos = justificaciones;
        } else {
          jsonData.formInfoLaboral.adjuntoJustificacionMesDos.push(archivo.name);
        }
        this.props.dispatch(doUploadFile(data));
        break;
      }
      case "adjuntoLiquidacionMesTres": {
        if (e.value) {
          const archivo = e.value[0];
          data.files = archivo;
          if (jsonData.formInfoLaboral.hasOwnProperty("adjuntoLiquidacionMesTres") === true) {
            this.props.dispatch(doDeleteSingleFile({
              rutTrabajador: rutWorker,
              rutUsuario: this.props.userData.RUT,
              idPrestacion: jsonData.idFinancialBenefit,
              NombreArchivo: jsonData.formInfoLaboral.adjuntoLiquidacionMesTres,
            }, false));
          }
          jsonData.formInfoLaboral.adjuntoLiquidacionMesTres = archivo.name;
          this.props.dispatch(doUploadFile(data));
        }
        break;
      }
      case "adjuntoJustificacionMesTres": {
        const archivo = e.value[0];
        data.files = archivo;
        if (jsonData.formInfoLaboral.hasOwnProperty("adjuntoJustificacionMesTres") === false || jsonData.formInfoLaboral.adjuntoJustificacionMesTres === null) {
          const justificaciones = [];
          justificaciones.push(archivo.name);
          jsonData.formInfoLaboral.adjuntoJustificacionMesTres = justificaciones;
        } else {
          jsonData.formInfoLaboral.adjuntoJustificacionMesTres.push(archivo.name);
        }
        this.props.dispatch(doUploadFile(data));
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

    switch (property) {
      case "adjuntoJustificacionMesUno": {
        jsonData.formInfoLaboral.adjuntoJustificacionMesUno = jsonData.formInfoLaboral.adjuntoJustificacionMesUno.filter((item) => item !== dcto);
        break;
      }
      case "adjuntoJustificacionMesDos": {
        jsonData.formInfoLaboral.adjuntoJustificacionMesDos = jsonData.formInfoLaboral.adjuntoJustificacionMesDos.filter((item) => item !== dcto);
        break;
      }
      case "adjuntoJustificacionMesTres": {
        jsonData.formInfoLaboral.adjuntoJustificacionMesTres = jsonData.formInfoLaboral.adjuntoJustificacionMesTres.filter((item) => item !== dcto);
        break;
      }
      default:
        jsonData.formInfoLaboral[property] = null;
        break;
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
    let list = [];
    if (Array.isArray(nmbDcto) === true) {
      nmbDcto.forEach((d) => {
        list.push({ Nombre: d });
      });
    } else {
     
      list = this.props.listaDocumentosIngresados.filter((item) => item.Nombre === nmbDcto);
    }

    return (

      <React.Fragment>
        <div style={{ marginBottom: 10 }}>
          <span className="title">{titulo}</span>
          <List
            className="draf-document-list"
            scrollByContent
            selectedIndex={2}
            noDataText="Sin documentos"
            items={list}
            itemComponent={(item) => (
              <div className="list-document-wrapper">
                <div className="text">
                  <span className="text"><i className="material-icons" style={{ fontSize: 10 }} > attach_file </i> {item.Nombre}</span>
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
    const form = { ...this.props.jsonData.formInfoLaboral };
    const monthsDisplay = this.props.jsonData.monthsDisplay;


    return (
      <ValidationGroup>

        <div className="col-12 newDenuncia-title" ref={this.topRef}>
          <h2>Información laboral</h2>
          <p>Debe llenar todos los datos para pasar a la siguiente sección</p>
        </div>


        <div className="col-12">
          <h4 className="newDenuncia-subtitle">{monthsDisplay[0]}</h4>
          <NumberField
            label={`Dias Trabajados en ${monthsDisplay[0]}`}
            id="DiasTrabajadosMesUno"
            value={form && form.DiasTrabajadosMesUno ? parseInt(form.DiasTrabajadosMesUno, 10) : null}
            onChange={this.handleChange}
          />
          {this.state.openMotivoMes1 === true || parseInt(form.DiasTrabajadosMesUno, 10) <= 21 ?
            <React.Fragment>
              <SelectField
                label={`Motivo de ausencia ${monthsDisplay[0]}`}
                id="motivoAusenciaMesUno"
                onValueChanged={this.handleChange}
                value={form && form.motivoAusenciaMesUno ? form.motivoAusenciaMesUno : null}
                items={["Licencia médica", "Vacaciones"]}
              />

              <FileUploaderField
                id="adjuntoJustificacionMesUno"
                label={`Adjuntar Documento justificación ${monthsDisplay[0]}`}
                text="Adjuntar justificación"
                multiple={false}
                uploadMode="useForm"
                validar={form.adjuntoJustificacionMesUno === null}
                onChange={this.handeChangeDctos}
              />
              {
                form.adjuntoJustificacionMesUno && form.adjuntoJustificacionMesUno.length > 0 && this.renderDocument(form.adjuntoJustificacionMesUno, "adjuntoJustificacionMesUno", `Documentos justificación de ${monthsDisplay[0]}`)
              }
            </React.Fragment>
            : ""
          }
          <FileUploaderField
            id="adjuntoLiquidacionMesUno"
            label={`Adjuntar Liqudación ${monthsDisplay[0]}`}
            text="Adjuntar Liqudación"
            multiple={false}
            uploadMode="useForm"
            validar={form.adjuntoLiquidacionMesUno === null}
            onChange={this.handeChangeDctos}
          />
          {
            this.props.listaDocumentosIngresados && this.props.listaDocumentosIngresados.length > 0 && this.renderDocument(form.adjuntoLiquidacionMesUno, "adjuntoLiquidacionMesUno", `Liquidación de ${monthsDisplay[0]}`)
          }
        </div>
        {monthsDisplay.length >= 2 ?

          <div className="col-12">
            <h4 className="newDenuncia-subtitle">{monthsDisplay[1]}</h4>
            <NumberField
              label={`Dias Trabajados en ${monthsDisplay[1]}`}
              id="DiasTrabajadosMesDos"
              value={form && form.DiasTrabajadosMesDos ? parseInt(form.DiasTrabajadosMesDos, 10) : null}
              onChange={this.handleChange}
            />
            {this.state.openMotivoMes2 === true || parseInt(form.DiasTrabajadosMesDos, 10) <= 21 ?
              <React.Fragment>
                <SelectField
                  label={`Motivo de ausencia ${monthsDisplay[1]}`}
                  id="motivoAusenciaMesDos"
                  onValueChanged={this.handleChange}
                  value={form && form.motivoAusenciaMesDos ? form.motivoAusenciaMesDos : null}
                  items={["Licencia médica", "Vacaciones", "PosNatal"]}
                />

                <FileUploaderField
                  id="adjuntoJustificacionMesDos"
                  label={`Adjuntar Documento justificación ${monthsDisplay[1]}`}
                  text="Adjuntar justificación"
                  multiple={false}
                  uploadMode="useForm"
                  validar={form.adjuntoJustificacionMesDos === null}
                  onChange={this.handeChangeDctos}
                />
                {
                  form.adjuntoJustificacionMesDos && form.adjuntoJustificacionMesDos.length > 0 && this.renderDocument(form.adjuntoJustificacionMesDos, "adjuntoJustificacionMesDos", `Documentos justificación de ${monthsDisplay[0]}`)
                }
              </React.Fragment>
              :
              ""

            }
            <FileUploaderField
              id="adjuntoLiquidacionMesDos"
              label={`Adjuntar Liqudación ${monthsDisplay[1]}`}
              text="Adjuntar Liqudación"
              multiple={false}
              uploadMode="useForm"
              validar={form.adjuntoLiquidacionMesDos === null}
              onChange={this.handeChangeDctos}
            />
            {
              this.props.listaDocumentosIngresados && this.props.listaDocumentosIngresados.length > 0 && this.renderDocument(form.adjuntoLiquidacionMesDos, "adjuntoLiquidacionMesDos", `Liquidación de ${monthsDisplay[1]}`)
            }

          </div>
          : ""
        }


        {monthsDisplay.length === 3 ?

          <div className="col-12">
            <h4 className="newDenuncia-subtitle">{monthsDisplay[2]}</h4>
            <NumberField
              label={`Dias Trabajados en ${monthsDisplay[2]}`}
              id="DiasTrabajadosMesTres"
              value={form && form.DiasTrabajadosMesTres ? parseInt(form.DiasTrabajadosMesTres, 10) : null}
              onChange={this.handleChange}
            />
            {this.state.openMotivoMes3 === true || parseInt(form.DiasTrabajadosMesTres, 10) <= 21 ?
              <React.Fragment>
                <SelectField
                  label={`Motivo de ausencia ${monthsDisplay[2]}`}
                  id="motivoAusenciaMesTres"
                  onValueChanged={this.handleChange}
                  value={form && form.motivoAusenciaMesTres ? form.motivoAusenciaMesTres : null}
                  items={["Licencia médica", "Vacaciones"]}
                />

                <FileUploaderField
                  id="adjuntoJustificacionMesTres"
                  label={`Adjuntar Documento justificación ${monthsDisplay[2]}`}
                  text="Adjuntar justificación"
                  multiple={false}
                  uploadMode="useForm"
                  validar={form.adjuntoJustificacionMesTres === null}
                  onChange={this.handeChangeDctos}
                />
                {
                  form.adjuntoJustificacionMesTres && form.adjuntoJustificacionMesTres.length > 0 && this.renderDocument(form.adjuntoJustificacionMesTres, "adjuntoJustificacionMesTres", `Documentos justificación de ${monthsDisplay[2]}`)
                }
              </React.Fragment>
              :
              ""

            }
            <FileUploaderField
              id="adjuntoLiquidacionMesTres"
              label={`Adjuntar Liqudación ${monthsDisplay[2]}`}
              text="Adjuntar Liqudación"
              multiple={false}
              uploadMode="useForm"
              validar={form.adjuntoLiquidacionMesTres === null}
              onChange={this.handeChangeDctos}
            />
            {
              this.props.listaDocumentosIngresados && this.props.listaDocumentosIngresados.length > 0 && this.renderDocument(form.adjuntoLiquidacionMesTres, "adjuntoLiquidacionMesTres", `Liquidación de ${monthsDisplay[1]}`)
            }
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

    );
  }
}
const mapStateToProps = (state) => ({
  jsonData: state.prestacionesEmpresa.jsonData,
  userData: state.global.userData,
  listaDocumentosIngresados: state.prestacionesEmpresa.listaDocumentosIngresados,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoLaboral);
