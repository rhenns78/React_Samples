import React from "react";
import { connect } from "react-redux";
import { Button, List } from "devextreme-react";
import { lastStep } from "../../actions";

import TextField from "../../../../../../Shared/fields/TextField";
import FileUploaderField from "../../../../../../Shared/fields/FileUploaderField";
import SelectField from "../../../../../../Shared/fields/SelectField";
import RadioGroupfield from "../../../../../../Shared/fields/RadioGroupField";
import DateField from "../../../../../../Shared/fields/DateField";
import NumberField from "../../../../../../Shared/fields/NumberField";
const TipoCuentaCmbx = [
  { Id: "1", Description: "Corriente" },
  { Id: "2", Description: "Vista" },
  { Id: "3", Description: "Ahorro" },

];
const IsapresCmbx = [
  { Id: "1", Description: "Banmédica" },
  { Id: "2", Description: "Colmena Golden Cross S.A" },
  { Id: "3", Description: "Consalud S.A." },
  { Id: "4", Description: "Cruz Blanca S.A" },
  { Id: "5", Description: "Nueva Masvida S.A." },
  { Id: "6", Description: "Vida Tres S.A." },

];
class EnviarDocumento extends React.PureComponent {
  handleBack = () => {
    this.props.dispatch(lastStep());
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


              </div>
            )}
          />
        </div >
      </React.Fragment>
    );
  }
  render() {
    const formInfoTrabajador = this.props.jsonData.formInfoTrabajador;
    const formInfoLaboral = this.props.jsonData.formInfoLaboral;
    const formInfoPrevisional = this.props.jsonData.formInfoPrevisional;
    const monthsDisplay = this.props.jsonData.monthsDisplay;
    return (

      <div className="row">

        <div className="col-12 newDenuncia-title" ref={this.topRef}>
          <h2>Resumen</h2>

        </div>

        <div >
          <div className="col-12 newDenuncia-title">
            <h2>Información del trabajador</h2>
          </div>
          <div className="col-12">
            <h4 className="newDenuncia-subtitle">Datos trabajador</h4>
            <TextField
              label="Rut"
              disabled
              id="Rut"
              value={formInfoTrabajador.Rut}

            />


            <TextField
              label="Nombre trabajador"
              disabled
              id="Nombre"
              value={`${formInfoTrabajador.FirstName}${formInfoTrabajador.LastName}`}

            />
            <TextField
              label="Correo electrónico"
              id="email"
              value={formInfoTrabajador.email}
              disabled
            />


          </div>
          <div className="col-12">
            <h4 className="newDenuncia-subtitle">Contrato de trabajo</h4>

            <DateField
              label="Fecha de contratación del trabajador"
              id="fechaContrato"
              value={formInfoTrabajador.fechaContrato}
              disabled
              type="date"
            />

            {
              this.props.listaDocumentosIngresados && this.props.listaDocumentosIngresados.length > 0 && this.renderDocument(formInfoTrabajador.contratoTrabajo, "contratoTrabajo", "Contrato de trabajo")
            }


          </div>

          <div className="col-12">
            <h4 className="newDenuncia-subtitle">Retenciones judiciales del trabajador</h4>

            <RadioGroupfield
              label="El trabajador tiene retenciones judiciales"
              items={["Si", "No"]}
              id="RetencionesJudiciales"
              value={formInfoTrabajador.RetencionesJudiciales}
              onValueChanged={this.handleChange}
              disabled
              layout="horizontal"
            />
            {
              this.props.listaDocumentosIngresados && this.props.listaDocumentosIngresados.length > 0 && this.renderDocument(formInfoTrabajador.oficio, "oficio", "Retenciones judiciales")
            }

          </div>

          <div className="col-12">
            <h4 className="newDenuncia-subtitle">Medio de pago trabajador</h4>
            <SelectField
              label="Medio de pago"
              id="FormaPago"
              value={formInfoTrabajador.FormaPago}
              disabled
              items={["Transferencia electrónica", "Cheque", "Efectivo"]}
            />

            <SelectField
              label="Banco"
              id="Bank"
              value={formInfoTrabajador.Bank}
              dataSource={this.props.listaBancos}
              displayExpr="Banco"
              valueExpr="Banco"
              disabled

            />
            <SelectField
              label="Tipo cuenta"
              id="AccountType"
              value={formInfoTrabajador.AccountType}
              disabled
              dataSource={TipoCuentaCmbx}
              displayExpr="Description"
              valueExpr="Description"
            />
            <TextField
              label="Número de cuenta"
              id="AccountNumber"
              disabled
              value={formInfoTrabajador.AccountNumber}

            />

          </div>
        </div>

        <div >
          <div className="col-12 newDenuncia-title" >
            <h2>Información laboral</h2>
          </div>
          <div className="col-12">
            <h4 className="newDenuncia-subtitle">{monthsDisplay[0]}</h4>
            <NumberField
              label={`Dias Trabajados en ${monthsDisplay[0]}`}
              id="DiasTrabajadosMesUno"
              value={formInfoLaboral && formInfoLaboral.DiasTrabajadosMesUno ? parseInt(formInfoLaboral.DiasTrabajadosMesUno, 10) : null}
              disabled
            />
           
            {parseInt(formInfoLaboral.DiasTrabajadosMesUno, 10) <= 21 ?
              <React.Fragment>
                <SelectField
                  label={`Motivo de ausencia ${monthsDisplay[0]}`}
                  id="motivoAusenciaMesUno"
                  disabled
                  value={formInfoLaboral && formInfoLaboral.motivoAusenciaMesUno ? formInfoLaboral.motivoAusenciaMesUno : null}
                  items={["Licencia médica", "Vacaciones"]}
                />

                {
                  formInfoLaboral.adjuntoJustificacionMesUno && formInfoLaboral.adjuntoJustificacionMesUno.length > 0 && this.renderDocument(formInfoLaboral.adjuntoJustificacionMesUno, "adjuntoJustificacionMesUno", `Documentos justificación de ${monthsDisplay[0]}`)
                }
              </React.Fragment>
              : ""
            }
            {
              this.props.listaDocumentosIngresados && this.props.listaDocumentosIngresados.length > 0 && this.renderDocument(formInfoLaboral.adjuntoLiquidacionMesUno, "adjuntoLiquidacionMesUno", `Liquidación de ${monthsDisplay[0]}`)
            }
          </div>
          {monthsDisplay.length >= 2 ?

            <div className="col-12">
              <h4 className="newDenuncia-subtitle">{monthsDisplay[1]}</h4>
              <NumberField
                label={`Dias Trabajados en ${monthsDisplay[1]}`}
                id="DiasTrabajadosMesDos"
                value={formInfoLaboral && formInfoLaboral.DiasTrabajadosMesDos ? parseInt(formInfoLaboral.DiasTrabajadosMesDos, 10) : null}
                disabled
              />
              { parseInt(formInfoLaboral.DiasTrabajadosMesDos, 10) <= 21 ?
                <React.Fragment>
                  <SelectField
                    label={`Motivo de ausencia ${monthsDisplay[1]}`}
                    id="motivoAusenciaMesDos"
                    disabled
                    value={formInfoLaboral && formInfoLaboral.motivoAusenciaMesDos ? formInfoLaboral.motivoAusenciaMesDos : null}
                    items={["Licencia médica", "Vacaciones", "PosNatal"]}
                  />

                  <FileUploaderField
                    id="adjuntoJustificacionMesDos"
                    label={`Adjuntar Documento justificación ${monthsDisplay[1]}`}
                    text="Adjuntar justificación"
                    disabled
                  />
                  {
                    formInfoLaboral.adjuntoJustificacionMesDos && formInfoLaboral.adjuntoJustificacionMesDos.length > 0 && this.renderDocument(formInfoLaboral.adjuntoJustificacionMesDos, "adjuntoJustificacionMesUno", `Documentos justificación de ${monthsDisplay[1]}`)
                  }
                </React.Fragment>
                :
                ""

              }

              {
                this.props.listaDocumentosIngresados && this.props.listaDocumentosIngresados.length > 0 && this.renderDocument(formInfoLaboral.adjuntoLiquidacionMesDos, "adjuntoLiquidacionMesDos", `Liquidación de ${monthsDisplay[1]}`)
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
                value={formInfoLaboral && formInfoLaboral.DiasTrabajadosMesTres ? parseInt(formInfoLaboral.DiasTrabajadosMesTres, 10) : null}
                disabled
              />
              { parseInt(formInfoLaboral.DiasTrabajadosMesTres, 10) <= 21 ?
                <React.Fragment>
                  <SelectField
                    label={`Motivo de ausencia ${monthsDisplay[2]}`}
                    id="motivoAusenciaMesTres"
                    disabled
                    value={formInfoLaboral && formInfoLaboral.motivoAusenciaMesDos ? formInfoLaboral.motivoAusenciaMesDos : null}
                    items={["Licencia médica", "Vacaciones", "PosNatal"]}
                  />


                  {
                    formInfoLaboral.adjuntoJustificacionMesTres && formInfoLaboral.adjuntoJustificacionMesTres.length > 0 && this.renderDocument(formInfoLaboral.adjuntoJustificacionMesTres, "adjuntoJustificacionMesUno", `Documentos justificación de ${monthsDisplay[2]}`)
                  }
                </React.Fragment>
                :
                ""

              }

              {
                this.props.listaDocumentosIngresados && this.props.listaDocumentosIngresados.length > 0 && this.renderDocument(formInfoLaboral.adjuntoLiquidacionMesTres, "adjuntoLiquidacionMesTres", `Liquidación de ${monthsDisplay[2]}`)
              }
            </div>
            :
            ""
          }

        </div>


        <div>
          <div className="col-12 newDenuncia-title" >
            <h2>Información del Previsional</h2>
          </div>
          <div className="col-12">
            <h4 className="newDenuncia-subtitle"> Información previsional de {monthsDisplay[0]}</h4>
            <SelectField
              label="Previsón de salud"
              id="tipoPervisionSaludMesUno"
              disabled
              value={formInfoPrevisional && formInfoPrevisional.tipoPervisionSaludMesUno ? formInfoPrevisional.tipoPervisionSaludMesUno : null}
              items={["Isapre", "Fonasa", "Capredena"]}
            />
            {formInfoPrevisional.tipoPervisionSaludMesUno !== "Fonasa" ?
              <SelectField
                label="Isapre"
                id="IsapreMesUno"
                value={formInfoPrevisional && formInfoPrevisional.IsapreMesUno ? formInfoPrevisional.IsapreMesUno : null}
                dataSource={IsapresCmbx}
                displayExpr="Description"
                valueExpr="Description"
                disabled
              />
              :
              ""
            }

            <div className="row zero-vertical">
              <div className="col-8 zero-right">
                <NumberField
                  label="Valor Plan"
                  id="valorPlanMesUno"
                  disabled
                  value={formInfoPrevisional && formInfoPrevisional.valorPlanMesUno ? parseInt(formInfoPrevisional.valorPlanMesUno, 10) : null}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-4">
                <SelectField
                  label="Unidad"
                  id="unidadMesUno"
                  value={formInfoPrevisional.unidadMesUno}
                  disabled
                  items={["UF", "Pesos", "UTM"]}
                />

              </div>
            </div>

            {
              this.props.listaDocumentosIngresados && this.props.listaDocumentosIngresados.length > 0 && this.renderDocument(formInfoPrevisional.adjuntoAfiliacionMesUno, "adjuntoAfiliacionMesUno", `Documento afiliación de ${monthsDisplay[0]}`)
            }

            <SelectField
              label="AFP"
              id="afpMesUno"
              value={formInfoPrevisional && formInfoPrevisional.afpMesUno ? formInfoPrevisional.afpMesUno : null}
              dataSource={this.props.listaAfp}
              displayExpr="Text"
              valueExpr="Text"
              disabled
            />

          </div>
          {monthsDisplay.length >= 2 ?

            <div className="col-12">
              <h4 className="newDenuncia-subtitle"> Información previsional de {monthsDisplay[1]}</h4>
              <SelectField
                label="Previsón de salud"
                id="tipoPervisionSaludMesDos"
                disabled
                value={formInfoPrevisional && formInfoPrevisional.tipoPervisionSaludMesDos ? formInfoPrevisional.tipoPervisionSaludMesDos : null}
                items={["Isapre", "Fonasa", "Capredena"]}
              />
              {formInfoPrevisional.tipoPervisionSaludMesDos !== "Fonasa" ?
                <SelectField
                  label="Isapre"
                  id="IsapreMesDos"
                  value={formInfoPrevisional && formInfoPrevisional.IsapreMesDos ? formInfoPrevisional.IsapreMesDos : null}
                  dataSource={IsapresCmbx}
                  displayExpr="Description"
                  valueExpr="Description"
                  disabled
                />
                :
                ""
              }
              <div className="row zero-vertical">
                <div className="col-8 zero-right">
                  <NumberField
                    label="Valor Plan"
                    id="valorPlanMesDos"
                    disabled
                    value={formInfoPrevisional && formInfoPrevisional.valorPlanMesDos ? parseInt(formInfoPrevisional.valorPlanMesDos) : null}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-4">
                  <SelectField
                    label="Unidad"
                    id="unidadMesDos"
                    value={formInfoPrevisional.unidadMesDos}
                    disabled
                    items={["UF", "Pesos", "UTM"]}
                  />

                </div>
              </div>

              {
                this.props.listaDocumentosIngresados && this.props.listaDocumentosIngresados.length > 0 && this.renderDocument(formInfoPrevisional.adjuntoAfiliacionMesDos, "adjuntoAfiliacionMesDos", `Documento afiliación de ${monthsDisplay[1]}`)
              }
              <SelectField
                label="AFP"
                id="afpMesDos"
                value={formInfoPrevisional && formInfoPrevisional.afpMesDos ? formInfoPrevisional.afpMesDos : null}
                dataSource={this.props.listaAfp}
                displayExpr="Text"
                valueExpr="Text"
                disabled
              />

            </div>
            :
            ""

          }
          {monthsDisplay.length === 3 ?

            <div className="col-12">
              <h4 className="newDenuncia-subtitle"> Información previsional de {monthsDisplay[2]}</h4>
              <SelectField
                label="Previsón de salud"
                id="tipoPervisionSaludMesTres"
                disabled
                value={formInfoPrevisional && formInfoPrevisional.tipoPervisionSaludMesTres ? formInfoPrevisional.tipoPervisionSaludMesTres : null}
                items={["Isapre", "Fonasa", "Capredena"]}
              />
              {formInfoPrevisional.tipoPervisionSaludMesTres !== "Fonasa" ?
                <SelectField
                  label="Isapre"
                  id="IsapreMesTres"
                  value={formInfoPrevisional && formInfoPrevisional.IsapreMesTres ? formInfoPrevisional.IsapreMesTres : null}
                  dataSource={IsapresCmbx}
                  displayExpr="Description"
                  valueExpr="Description"
                  disabled
                />
                :
                ""
              }
              <div className="row zero-vertical">
                <div className="col-8 zero-right">
                  <NumberField
                    label="Valor Plan"
                    id="valorPlanMesTres"
                    disabled
                    value={formInfoPrevisional && formInfoPrevisional.valorPlanMesTres ? parseInt(formInfoPrevisional.valorPlanMesTres, 10) : null}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-4">
                  <SelectField
                    label="Unidad"
                    id="unidadMesTres"
                    value={formInfoPrevisional.unidadMesTres}
                    disabled
                    items={["UF", "Pesos", "UTM"]}
                  />

                </div>
              </div>

              {
                this.props.listaDocumentosIngresados && this.props.listaDocumentosIngresados.length > 0 && this.renderDocument(formInfoPrevisional.adjuntoAfiliacionMesTres, "adjuntoAfiliacionMesTres", `Documento afiliación de ${monthsDisplay[2]}`)
              }
              <SelectField
                label="AFP"
                id="afpMesTres"
                value={formInfoPrevisional && formInfoPrevisional.afpMesTres ? formInfoPrevisional.afpMesTres : null}
                dataSource={this.props.listaAfp}
                displayExpr="Text"
                valueExpr="Text"
                disabled
              />

            </div>
            :
            ""
          }
        </div>


        <div className="col-12">
          <Button text="Volver" className="newDenuncia-back-button" onClick={this.handleBack} />
          <Button
            text="Enviar"
            type="success"
            className="newDenuncia-next-button"
            onClick={this.handleNext}
            useSubmitBehavior
          />
        </div>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  jsonData: state.prestacionesEmpresa.jsonData,
  middleStepsEnabled: state.prestacionesEmpresa.middleStepsEnabled,
  listaBancos: state.global.listaBancos,
  listaAfp: state.global.listaAfp,
  userData: state.global.userData,
  listaDocumentosIngresados: state.prestacionesEmpresa.listaDocumentosIngresados,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(EnviarDocumento);
