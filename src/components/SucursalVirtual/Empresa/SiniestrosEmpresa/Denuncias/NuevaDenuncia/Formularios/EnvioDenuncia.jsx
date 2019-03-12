import React from "react";
import { connect } from "react-redux";
import { Button } from "devextreme-react";
import Moment from "moment";
import { lastStep } from "../../actions";
import DateField from "../../../../../../Shared/fields/DateField";
import TextField from "../../../../../../Shared/fields/TextField";
import SelectField from "../../../../../../Shared/fields/SelectField";
import RadioGroupfield from "../../../../../../Shared/fields/RadioGroupField";
import { createPDF } from "../../../../../../Pdf/actions";

class EnvioDenuncia extends React.PureComponent {
  handleBack = () => {
    this.props.dispatch(lastStep());
  }

  render() {
    const form = {
      FechaDenuncia: new Date(),
      HoraPresentacion: new Date(),
    };

    const formEmpresa = { ...this.props.jsonData.formDatosEmpresa };
    const formTrabajador = { ...this.props.jsonData.formInfoTrabajador };
    const formSiniestro = { ...this.props.jsonData.formDatoSiniestro };
    const formDenunciante = { ...this.props.jsonData.formDenunciante };
    const formInfoDenuncia = { ...this.props.jsonData.formInfoDenuncia };
    const formDatosEnfermedad = { ...this.props.jsonData.formDatosEnfermedad };


    return (
      <React.Fragment>
        <div className="col-12 newDenuncia-title">
          <h2>Enviar denuncia</h2>
          <p>Revisa todos los campos para corroborar que todos los datos son correctos</p>
        </div>

        <div className="col-12">
          <h4 className="newDenuncia-subtitle">Identificación de la denuncia</h4>
          <div className="row zero-vertical">
            <div className="col-6 zero-right">
              <DateField
                label="Fecha de la denuncia"
                value={form.FechaDenuncia}
                disabled
                type="date"
              />
            </div>
            <div className="col-6">
              <DateField
                label="Hora de presentación"
                value={form.HoraPresentacion}
                disabled
                type="time"
              />
            </div>
          </div>
        </div>

        <div className="col-12">
          <h4 className="newDenuncia-subtitle">Identificación del empleador</h4>
          <div className="row zero-vertical">
            <div className="col-6 zero-right">
              <TextField
                label="Nombre o razón social"
                disabled
                value={formEmpresa.NombreRazon}
              />
            </div>
            <div className="col-6">
              <TextField
                label="Rut"
                disabled
                value={formEmpresa.RutEmpresa}
              />
            </div>

            <div className="col-6 zero-right">
              <SelectField
                label="Actividad económica"
                value={formEmpresa.Actividad}
                items={["Actividad 1", "Actividad 2", "Actividad 3"]}
                disabled
              />
            </div>

            <div className="col-6">
              <SelectField
                label="Tipo de empresa"
                value={formEmpresa.TipoEmpresa}
                items={["Principal", "Tipo 1", "Tipo 2", "Tipo 3"]}
                disabled
              />

            </div>
          </div>

          {formEmpresa.Actividad && (
            <SelectField
              label="Actividad económica principal de la empresa"
              value={formEmpresa.ActividadPrincipal}
              items={["Actividad Principal 1", "Actividad Principal 2", "Actividad Principal 3"]}
              disabled
            />
          )}

          <SelectField
            label="Propiedad de la empresa"
            value={formEmpresa.Propiedad}
            items={["Privada", "Publica"]}
            disabled
          />
        </div>

        <div className="col-12">
          <h4 className="newDenuncia-subtitle">Identificación del trabajador</h4>

          <div className="row zero-vertical">
            <div className="col-7 zero-right">
              <TextField
                label="Nombre"
                disabled
                value={`${formTrabajador.FirstName} ${formTrabajador.LastName} ${formTrabajador.MothersName}`}
              />
            </div>
            <div className="col-5">
              <TextField
                label="Rut"
                disabled
                value={formTrabajador.Rut}
              />
            </div>

            <div className="col-4 zero-right">
              <SelectField
                label="Sexo"
                disabled
                value={formTrabajador.Sexo}
                dataSource={this.props.listaSexos}
                displayExpr="Sexo"
                valueExpr="Sexo"
              />
            </div>
            <div className="col-3 zero-right">
              <TextField
                disabled
                label="Edad"
                value={`${Moment(formTrabajador.Birthdate).diff(Moment(), "years") * -1}`}
              />
            </div>
            <div className="col-5">
              <DateField
                label="Fecha de nacimiento"
                type="date"
                value={formTrabajador.Birthdate}
                disabled
              />
            </div>

            <div className="col-7 zero-right">
              <TextField
                label="Dirección particular"
                value={formTrabajador.DireccionParticular}
                disabled
              />
            </div>
            <div className="col-5">
              <TextField
                label="Comuna"
                disabled
                value={formTrabajador.Comuna}
              />
            </div>


            <div className="col-4 zero-right">
              <TextField
                label="Teléfono"
                mask="000 0000"
                value={formTrabajador.Phone}
                disabled
              />
            </div>
            <div className="col-3 zero-right">
              <SelectField
                label="Nacionalidad"
                value={formTrabajador.Nacionalidad}
                dataSource={this.props.listaNacionalidades}
                displayExpr="Nacionalidad"
                valueExpr="Nacionalidad"
                disabled
              />
            </div>
            <div className="col-5">
              <SelectField
                label="Pueblo originario"
                value={formTrabajador.PuebloOriginario}
                dataSource={this.props.listaPueblosOriginarios}
                displayExpr="PuebloOriginario"
                valueExpr="PuebloOriginario"
                disabled
              />
            </div>

            <div className="col-4 zero-right">
              <SelectField
                label="Profesión/Oficio"
                value={formTrabajador.ProfecionOficio}
                items={["Profecion 1", "Oficio 1"]}
                disabled
              />
            </div>
            <div className="col-4 zero-right">
              <SelectField
                label="Tipo de contrato"
                value={formTrabajador.TipoContrato}
                dataSource={this.props.listaTiposContrato}
                displayExpr="TipoContrato"
                valueExpr="TipoContrato"
                disabled
              />
            </div>
            <div className="col-4">
              <TextField
                label="Antigüedad"
                value={formTrabajador.Antiguedad}
                disabled
              />
            </div>

            <div className="col-6">
              <SelectField
                label="Tipo de ingreso"
                value={formTrabajador.TipoIngreso}
                dataSource={this.props.listaTiposIngreso}
                displayExpr="TipoIngreso"
                valueExpr="TipoIngreso"
                disabled
              />
            </div>
            <div className="col-6 zero-left">
              <SelectField
                label="Categoria ocupacional"
                value={formTrabajador.CategoriaOcupacional}
                dataSource={this.props.listaCategoriasOcupacionales}
                displayExpr="CategoriaOcupacional"
                valueExpr="CategoriaOcupacional"
                disabled
              />
            </div>

          </div>
        </div>

        {formInfoDenuncia.tipoDenuncia === "DIAT" ?
          <React.Fragment>
            <div className="col-12">
              <h4 className="newDenuncia-subtitle">Datos del accidente</h4>

              <TextField
                label="Señale qué estaba haciendo el trabajador al momento o justo antes del accidente"
                value={formSiniestro.AlMomentoDelAccidente}
                disabled
              />

              <TextField
                label="Señale el lugar dónde ocurrió el accidente (nombre de la sección, edificio, o área)"
                value={formSiniestro.ZonaAfectada}
                disabled
              />

              <TextField
                label="Describa ¿Que pasó o cómo ocurrio el accidente?"
                value={formSiniestro.CausaAccidente}
                disabled
              />

              <TextField
                label="Señale cuál era su trabajo habitual"
                value={formSiniestro.TrabajoHabitual}
                disabled
              />

              <RadioGroupfield
                label="Al momento del accidente ¿Desarrollaba su trabajo habitual?"
                items={["Si", "No"]}
                layout="horizontal"
                value={formSiniestro.RealizabaSuTrabajo}
                disabled
              />

              <SelectField
                label="Clasificación del accidente (Articulo 76 Ley 16.744)"
                value={formSiniestro.ClasificacionAccidente}
                disabled
                dataSource={this.props.listaClasificacionesAccidentes}
                displayExpr="ClasificacionAccidente"
                valueExpr="ClasificacionAccidente"
              />

              <SelectField
                disabled
                label="Tipo de accidente"
                value={formSiniestro.TipoAccidente}
                items={["Trayecto", "Tipo 1", "Tipo 2", "Tipo 3"]}
              />

              {formSiniestro.TipoAccidente === "Trayecto" &&
                <SelectField
                  label="Si es de trayecto indique el tipo de accidente"
                  disabled
                  value={formSiniestro.TipoAccidenteTrayecto}
                  items={["Accidente 1", "Accidente 2", "Accidente 3"]}
                />
              }
            </div>

            <div className="col-12">
              <h4 className="newDenuncia-subtitle">Medios de prueba</h4>
              <div className="row zero-vertical">
                <div className="col-4 zero-right">
                  <TextField
                    label="Parte de carabineros"
                    disabled
                  />
                </div>
                <div className="col-2 zero-right">
                  <TextField
                    label="Testigos"
                    disabled
                  />
                </div>
                <div className="col-3 zero-right">
                  <TextField
                    label="Declaración"
                    disabled
                  />
                </div>
                <div className="col-3">
                  <TextField
                    label="Otro"
                    disabled
                  />
                </div>
              </div>

              <TextField
                label="Detalle del medio de prueba"
                disabled
                value={formSiniestro.DetalleMedioPrueba}
              />
            </div>
          </React.Fragment>
          :
          <div className="col-12">
            <h4 className="newDenuncia-subtitle">Datos de la enfermedad</h4>

            <TextField
              label="Describa las molestias o sintomas que actualmente tiene el trabajador"
              value={formDatosEnfermedad.DescripcionSintomas}
              disabled
            />
            <TextField
              label="¿Hace cuánto tiempo tiene estas molestias o sintomas?"
              value={formDatosEnfermedad.FechaInicioSintomas}
              disabled
            />
            <TextField
              label="¿Habia tenido estas molestias en el puesto de trabajo actual, anteriormente?"
              disabled
              value={formDatosEnfermedad.CuadroPrevio}
            />
            <TextField
              label="Partes del cuerpo afectada"
              disabled
              value={formDatosEnfermedad.PartesCuerpo}
            />
            <TextField
              label="Describa el trabajo o actividad que realizaba cuando comenzaron las molestias"
              disabled
              value={formDatosEnfermedad.DescripcionTrabajo}
            />
            <TextField
              label="Nombre del puesto de trabajo o actividad que realizaba cuando comenzaron las molestias"
              disabled
              value={formDatosEnfermedad.NombrePuesto}
            />
            <TextField
              label="¿Existen compañeros de trabajo con las mismas molestias?"
              disabled
              value={formDatosEnfermedad.ExistenCompañeros}
            />
            <TextField
              label="¿Qué cosas o agentes de trabajo cree usted que le causan estas molestias?"
              disabled
              value={formDatosEnfermedad.Agente}
            />
            <TextField
              label="¿Cuánto tiempo he estado expuesto o trabajando con estas cosas o agentes del trabajo?"
              disabled
              value={formDatosEnfermedad.FechaPrimeraExposicion}
            />
          </div>}

        <div className="col-12">
          <h4 className="newDenuncia-subtitle">Identificación del denunciante</h4>
          <div className="row zero-vertical">
            <div className="col-8 zero-right">
              <TextField
                label="Nombre"
                disabled
                value={`${formDenunciante.FirstName} ${formDenunciante.LastName} ${formDenunciante.MothersName}`}
              />
            </div>
            <div className="col-4">
              <TextField
                label="Rut"
                disabled
                value={formDenunciante.Rut}
              />
            </div>

            <div className="col-8 zero-right">
              <TextField
                label="Clasificación del denunciante (ley 16.744)"
                value={formDenunciante.Clasificacion}
                disabled
              />
            </div>
            <div className="col-4">
              <TextField
                label="Teléfono"
                mask="000 0000"
                value={formDenunciante.Phone}
                disabled
              />
            </div>
          </div>

          <TextField
            disabled
            label="Firma del denunciante"
          />
        </div>


        <div className="col-12">
          <h3>
            <p style={{ textAlign: "justify" }}>
              La simulación de un accidente del trabajo puede ser sancionada
              y da lugar al cobro de las prestaciones indebidamente obtenidas.
              Ello conforme a lo establecido al efecto por el artículo 43 de la ley N° 12.084,
              el que dispone que “Incurrirán en las penas establecidas en el artículo 210 del Código Penal,
              los que hicieren declaraciones falsas en certificados de supervivencia,
              de estado civil y demás que se exigen para el otorgamiento de beneficios de previsión.”
            </p>
          </h3>
          <Button text="Volver" className="newDenuncia-back-button" onClick={this.handleBack} />
          <Button
            text="ver PDF"
            style={{ marginLeft: 10 }}
            onClick={() => {
              this.props.dispatch(createPDF("formularioDIAT", this.props.jsonData));
            }}
          />

          <Button text="Enviar" type="success" className="newDenuncia-next-button" />
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  UserInfo: state.userRegister.UserInfo,
  jsonData: state.denuncias.jsonData,
  listaSexos: state.global.listaSexos,
  listaNacionalidades: state.global.listaNacionalidades,
  listaPueblosOriginarios: state.global.listaPueblosOriginarios,
  listaTiposContrato: state.global.listaTiposContrato,
  listaCategoriasOcupacionales: state.global.listaCategoriasOcupacionales,
  listaTiposIngreso: state.global.listaTiposIngreso,
  listaClasificacionesAccidentes: state.global.listaClasificacionesAccidentes,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(EnvioDenuncia);
