import React from "react";
import moment from "moment";
import "./style.css";
import LogoAchs from "../../../../../../../images/logoachs.png";

class FormularioDenunciaAccidente extends React.PureComponent {
  renderDIAT = () => {
    let {
      formDatoSiniestro,
      formInfoTrabajador,
    } = this.props.data;

    if (!formInfoTrabajador) formInfoTrabajador = {};
    if (!formDatoSiniestro) formDatoSiniestro = {};

    return (
      <React.Fragment>
        <div className="prev-panel">
          <span className="pan-title-seccion" ><div className="title-seccion" style={{ marginRight: "73%" }} >4. DATOS DEL ACCIDENTE</div></span>
          <div className="row campos">
            <div className="col-5">
              <div className="campo">
                <span>Fecha del Accidente :</span>
              </div>
              <div className="valor">
                <span>{new Date(formDatoSiniestro.FechaHoraAccidente).toLocaleDateString() || " - "}</span>
              </div>
            </div>
            <div className="col-4">
              <div className="campo">
                <span>Hora del Accidente :</span>
              </div>
              <div className="valor">
                <span>{new Date(formDatoSiniestro.FechaHoraAccidente).toLocaleTimeString() || " - "}</span>
              </div>
            </div>
            <div className="col-2" >
              <span>Hrs.</span>
            </div>
          </div>

          <div className="row campos">
            <div className="col-4">
              <div className="campo">
                <span>Hora de Entrada :</span>
              </div>
              <div className="valor">
                <span>{new Date(formInfoTrabajador.HoraIngreso).toLocaleTimeString() || " - "}</span>
              </div>
            </div>
            <div className="col-2" >
              <span>Hrs.</span>
            </div>
            <div className="col-4">
              <div className="campo">
                <span>Hora de Salida :</span>
              </div>
              <div className="valor">
                <span>{new Date(formInfoTrabajador.HoraSalida).toLocaleTimeString() || " - "}</span>
              </div>
            </div>
            <div className="col-2" >
              <span>Hrs.</span>
            </div>
          </div>

          <div className="row campos">
            <div className="col-8">
              <div className="campo">
                <span>Dirección :</span>
              </div>
              <div className="valor">
                <span>{`${formDatoSiniestro.Calle}, ${formDatoSiniestro.Numero}, ${formDatoSiniestro.Ciudad}, ${formDatoSiniestro.Region}` || " - "}</span>
              </div>
            </div>
            <div className="col-4">
              <div className="campo">
                <span>Comuna :</span>
              </div>
              <div className="valor">
                <span>{formDatoSiniestro.Comuna || " - "}</span>
              </div>
            </div>
          </div>

          <div className="row campos">
            <div className="col-12">
              <div className="campo-bajo">
                <span>Señale qué estaba haciendo el trabajador al momento o justo antes del accidente :</span>
              </div>
              <div className="valor-bajo">
                {formDatoSiniestro.AlMomentoDelAccidente || " - "}
              </div>
            </div>
          </div>

          <div className="row campos">
            <div className="col-12">
              <div className="campo-bajo">
                <span>Señale el lugar dónde ocurrió el accidente (nombre de la sección, ediﬁcio, o área) : </span>
              </div>
              <div className="valor-bajo">
                {formDatoSiniestro.ZonaAfectada || " - "}
              </div>
            </div>
          </div>

          <div className="row campos">
            <div className="col-12">
              <div className="campo-bajo">
                <span>Describa ¿qué pasó o cómo ocurrió el accidente? : </span>
              </div>
              <div className="valor-bajo">
                {formDatoSiniestro.CausaAccidente || " - "}
              </div>
            </div>
          </div>

          <div className="row campos">
            <div className="col-12">
              <div className="campo-bajo">
                <span>Señale cuál era su trabajo habitual : </span>
              </div>
              <div className="valor-bajo">
                {formDatoSiniestro.TrabajoHabitual || " - "}
              </div>
            </div>
          </div>

          <div className="row campos">
            <div className="col-12">
              <div className="campo-bajo">
                <span>Al momento del accidente ¿desarrollaba su trabajo habitual? :</span>
              </div>
              <div className="valor-bajo">
                {formDatoSiniestro.RealizabaSuTrabajo || " - "}
              </div>
            </div>
          </div>
          <div className="row campos">
            <div className="col-12">
              <div className="campo-bajo">
                <span>Clasiﬁcación del accidente (Artículo 76 Ley 16.744) :</span>
              </div>
              <div className="valor-bajo">
                {formDatoSiniestro.ClasificacionAccidente || " - "}
              </div>
            </div>
          </div>
          <div className="row campos">
            <div className="col-12">
              <div className="campo-bajo">
                <span>Tipo de accidente :</span>
              </div>
              <div className="valor-bajo">
                {formDatoSiniestro.TipoAccidente || " - "}
              </div>
            </div>
          </div>
          <div className="row campos">
            <div className="col-12">
              <div className="campo-bajo">
                <span>Si es de trayecto indique el tipo de accidente :</span>
              </div>
              <div className="valor-bajo">
                {formDatoSiniestro.TipoAccidenteTrayecto || " - "}
              </div>
            </div>
          </div>
        </div>
        <div className="prev-panel">
          <span className="pan-title-seccion" ><div className="title-seccion" style={{ marginRight: "78%" }} >5. MEDIO DE PRUEBA</div></span>
          <div className="row campos">
            <div className="col-4">
              <div className="campo">
                <span>Parte de carabineros :</span>
              </div>
              <div className="valor">
                <span>{formDatoSiniestro.parteCarabineros || " - "}</span>
              </div>
            </div>
            <div className="col-3">
              <div className="campo">
                <span>Testigos :</span>
              </div>
              <div className="valor">
                <span>{formDatoSiniestro.testigos || " - "}</span>
              </div>
            </div>
            <div className="col-3">
              <div className="campo">
                <span>Declaración :</span>
              </div>
              <div className="valor">
                <span>{formDatoSiniestro.declaracion || " - "}</span>
              </div>
            </div>
            <div className="col-2">
              <div className="campo">
                <span>Otro :</span>
              </div>
              <div className="valor">
                <span>{formDatoSiniestro.otro || " - "}</span>
              </div>
            </div>
          </div>

          <div className="row campos">
            <div className="col-12">
              <div className="campo-bajo">
                <span>Detalle medio de prueba :</span>
              </div>
              <div className="valor-bajo">
                {formDatoSiniestro.DetalleMedioPrueba || " - "}
              </div>
            </div>
          </div>

        </div>
      </React.Fragment>
    );
  }

  renderDIEP = () => {
    let {
      formDatosEnfermedad,
    } = this.props.data;

    if (!formDatosEnfermedad) formDatosEnfermedad = {};

    return (
      <div className="prev-panel">
        <span className="pan-title-seccion" ><div className="title-seccion" style={{ marginRight: "67%" }} >4. DATOS DE LA ENFERMEDAD</div></span>
        <div className="row campos">
          <div className="col-12">
            <div className="campo-bajo">
              <span>Describa las molestias o síntomas que actualmente tiene el trabajador : </span>
            </div>
            <div className="valor-bajo">
              {formDatosEnfermedad.DescripcionSintomas || " - "}
            </div>
          </div>
        </div>
        <div className="row campos">
          <div className="col-12">
            <div className="campo-bajo">
              <span>¿Hace cuánto tiempo tiene estas molestias o síntomas? : </span>
            </div>
            <div className="valor-bajo">
              {(formDatosEnfermedad.FechaInicioSintomas && new Date(formDatosEnfermedad.FechaInicioSintomas).toLocaleDateString()) || " - "}
            </div>
          </div>
        </div>
        <div className="row campos">
          <div className="col-12">
            <div className="campo-bajo">
              <span>¿Había tenido estas molestias en el puesto de trabajo actual, anteriormente? : </span>
            </div>
            <div className="valor-bajo">
              {formDatosEnfermedad.CuadroPrevio}
            </div>
          </div>
        </div>
        <div className="row campos">
          <div className="col-12">
            <div className="campo-bajo">
              <span>Parte del cuerpo afectada : </span>
            </div>
            <div className="valor-bajo">
              {formDatosEnfermedad.PartesCuerpo || " - "}
            </div>
          </div>
        </div>
        <div className="row campos">
          <div className="col-12">
            <div className="campo-bajo">
              <span>Describa el trabajo o actividad que realizaba cuando comenzaron las molestias : </span>
            </div>
            <div className="valor-bajo">
              {formDatosEnfermedad.DescripcionTrabajo || " - "}
            </div>
          </div>
        </div>
        <div className="row campos">
          <div className="col-12">
            <div className="campo-bajo">
              <span>Nombre del puesto de trabajo o actividad que realizaba cuando comenzaron las molestias : </span>
            </div>
            <div className="valor-bajo">
              {formDatosEnfermedad.NombrePuesto || " - "}
            </div>
          </div>
        </div>
        <div className="row campos">
          <div className="col-12">
            <div className="campo-bajo">
              <span>¿Existen compañero de trabajo con las mismas molestias? : </span>
            </div>
            <div className="valor-bajo">
              {formDatosEnfermedad.ExistenCompañeros || " - "}
            </div>
          </div>
        </div>
        <div className="row campos">
          <div className="col-12">
            <div className="campo-bajo">
              <span>¿Qué cosas o agentes de trabajo cree usted que le causan estas molestias? : </span>
            </div>
            <div className="valor-bajo">
              {formDatosEnfermedad.Agente || " - "}
            </div>
          </div>
        </div>
        <div className="row campos">
          <div className="col-12">
            <div className="campo-bajo">
              <span>¿Cuánto tiempo ha estado expuesto o trabajando con estas cosas o agentes del trabajo? : </span>
            </div>
            <div className="valor-bajo">
              {(formDatosEnfermedad.FechaPrimeraExposicion && new Date(formDatosEnfermedad.FechaPrimeraExposicion).toLocaleDateString()) || " - "}
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const {
      data,
    } = this.props;
    let {
      formInfoDenuncia,
      formDatosEmpresa,
      formInfoTrabajador,
      formDatoSiniestro,
      formDenunciante,
    } = data;

    if (!formInfoDenuncia) formInfoDenuncia = {};
    if (!formDatosEmpresa) formDatosEmpresa = {};
    if (!formInfoTrabajador) formInfoTrabajador = {};
    if (!formDatoSiniestro) formDatoSiniestro = {};
    if (!formDenunciante) formDenunciante = {};
    const isDIAT = formInfoDenuncia.tipoDenuncia === "DIAT";

    return (
      <React.Fragment>
        <div className="containter" id="formularioPagina1">
          <div className="row">
            <div className="col-11 prev-title" style={{ paddingTop: 17 }}>
              <h5>{isDIAT ? "DENUNCIA INDIVIDUAL DE ACCIDENTE DEL TRABAJO" : "DENUNCIA INDIVIDUAL DE ENFERMEDAD PROFESIONAL"}</h5>
              <h6>PARA TRABAJADOR</h6>
            </div>
            <div className="col-1">
              <img alt="ACHS" className="logo" src={LogoAchs} />
            </div>
          </div>
          <br />
          <br />
          <div className="prev-panel">
            <span className="pan-title-seccion" ><div className="title-seccion" style={{ marginRight: "63%" }} >1. IDENTIFICACIÓN DE LA DENUNCIA</div></span>
            <div className="row campos">
              <div className="col-6">
                <div className="campo">
                  <span>Fecha de la Denuncia :</span>
                </div>
                <div className="valor">
                  <span>{(formInfoDenuncia.FechaPresentacion && new Date(formInfoDenuncia.FechaPresentacion).toLocaleDateString()) || " - "}</span>
                </div>
              </div>
              <div className="col-4">
                <div className="campo">
                  <span>Hora de Presentación :</span>
                </div>
                <div className="valor">
                  <span>{formInfoDenuncia.horaPresen || " - "}</span>
                </div>
              </div>
              <div className="col-2" >
                <span>Hrs.</span>
              </div>
            </div>
          </div>
          <div className="prev-panel">
            <span className="pan-title-seccion" ><div className="title-seccion" style={{ marginRight: "63%" }} >2. IDENTIFICACIÓN DEL EMPLEADOR</div></span>
            <div className="row campos">
              <div className="col-9">
                <div className="campo">
                  <span>Nombre o Razón Social :</span>
                </div>
                <div className="valor">
                  <span>{formDatosEmpresa.NombreRazon || " - "}</span>
                </div>
              </div>
              <div className="col-3">
                <div className="campo">
                  <span>Rut :</span>
                </div>
                <div className="valor">
                  <span>{formDatosEmpresa.RutEmpresa || " - "}</span>
                </div>
              </div>
            </div>
            <div className="row campos">
              <div className="col-7">
                <div className="campo">
                  <span>Dirección :</span>
                </div>
                <div className="valor">
                  <span>{formDatosEmpresa.direcccionEmpreador || " - "}</span>
                </div>
              </div>
              <div className="col-5">
                <div className="campo">
                  <span>Comuna :</span>
                </div>
                <div className="valor">
                  <span>{formDatosEmpresa.comunaEmpleador || " - "}</span>
                </div>
              </div>
            </div>
            <div className="row campos">
              <div className="col-4">
                <div className="campo">
                  <span>Teléfono :</span>
                </div>
                <div className="valor">
                  <span>{formDatosEmpresa.fonoEmpleador || " - "}</span>
                </div>
              </div>
              <div className="col-8">
              </div>
            </div>
            <div className="row campos">
              <div className="col-8">
                <div className="campo">
                  <span>Act. Económica :</span>
                </div>
                <div className="valor">
                  <span>{formDatosEmpresa.Actividad || " - "}</span>
                </div>
              </div>
              <div className="col-3">
                <div className="campo">
                  <span>N° Trabajadores :</span>
                </div>
                <div className="valor">
                  <span>{formDatosEmpresa.TotalHombres + formDatosEmpresa.TotalMujeres || " - "}</span>
                </div>
              </div>
            </div>

            <div className="row campos">
              <div className="col-8">
                <div className="campo">
                  <span>Tipo Empresa :</span>
                </div>
                <div className="valor">
                  <span>{formDatosEmpresa.TipoEmpresa || " - "}</span>
                </div>
              </div>
              <div className="col-4">
              </div>
            </div>

            <div className="row campos">
              <div className="col-12">
                <div className="campo">
                  <span>Si es contratista o subcontratista, señale actividad económica principal :</span>
                </div>
                <div className="valor">
                  <span>{formDatosEmpresa.ActividadPrincipal || " - "}</span>
                </div>
              </div>
            </div>

            <div className="row campos">
              <div className="col-12">
                <div className="campo">
                  <span>Propiedad de la Empresa :</span>
                </div>
                <div className="valor">
                  <span>{formDatosEmpresa.Propiedad || " - "}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="prev-panel">
            <span className="pan-title-seccion" ><div className="title-seccion" style={{ marginRight: "60%" }} >3. IDENTIFICACIÓN DEL TRABAJADOR(A)</div></span>
            <div className="row campos">
              <div className="col-9">
                <div className="campo">
                  <span>Nombre :</span>
                </div>
                <div className="valor">
                  <span>{`${formInfoTrabajador.FirstName} ${formInfoTrabajador.LastName} ${formInfoTrabajador.MothersName}` || " - "}</span>
                </div>
              </div>
              <div className="col-3">
                <div className="campo">
                  <span>Rut :</span>
                </div>
                <div className="valor">
                  <span>{formInfoTrabajador.Rut || " - "}</span>
                </div>
              </div>
            </div>

            <div className="row campos">
              <div className="col-5">
                <div className="campo">
                  <span>Sexo :</span>
                </div>
                <div className="valor">
                  <span>{formInfoTrabajador.Sexo || " - "}</span>
                </div>
              </div>
              <div className="col-3">
                <div className="campo">
                  <span>Edad :</span>
                </div>
                <div className="valor">
                  <span>{`${moment(formInfoTrabajador.Birthdate).diff(moment(), "years") * -1}` || " - "}</span>
                </div>
              </div>
              <div className="col-4">
                <div className="campo">
                  <span>Fecha Nacimiento :</span>
                </div>
                <div className="valor">
                  <span>{(formInfoTrabajador.Birthdate && new Date(formInfoTrabajador.Birthdate).toLocaleDateString()) || " - "}</span>
                </div>
              </div>
            </div>

            <div className="row campos">
              <div className="col-8">
                <div className="campo">
                  <span>Dirección Particular :</span>
                </div>
                <div className="valor">
                  <span>{formInfoTrabajador.DireccionParticular || " - "}</span>
                </div>
              </div>
              <div className="col-4">
                <div className="campo">
                  <span>Comuna :</span>
                </div>
                <div className="valor">
                  <span>{formInfoTrabajador.Comuna || " - "}</span>
                </div>
              </div>
            </div>

            <div className="row campos">
              <div className="col-4">
                <div className="campo">
                  <span>Teléfono :</span>
                </div>
                <div className="valor">
                  <span>{formInfoTrabajador.Phone || " - "}</span>
                </div>
              </div>
              <div className="col-8">
              </div>
            </div>

            <div className="row campos">
              <div className="col-6">
                <div className="campo">
                  <span>Nacionalidad :</span>
                </div>
                <div className="valor">
                  <span>{formInfoTrabajador.Nacionalidad || " - "}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="campo">
                  <span>Pertenece a algún de Pueblo Originario :</span>
                </div>
                <div className="valor">
                  <span>{formInfoTrabajador.PuebloOriginario || " - "}</span>
                </div>
              </div>
            </div>

            <div className="row campos">
              <div className="col-8">
                <div className="campo">
                  <span>Profesión/Oﬁcio :</span>
                </div>
                <div className="valor">
                  <span>{formInfoTrabajador.ProfecionOficio || " - "}</span>
                </div>
              </div>
              <div className="col-4">
                <div className="campo">
                  <span>Tipo de Contrato :</span>
                </div>
                <div className="valor">
                  <span>{formInfoTrabajador.TipoContrato || " - "}</span>
                </div>
              </div>
            </div>

            <div className="row campos">
              <div className="col-4">
                <div className="campo">
                  <span>Antigüedad :</span>
                </div>
                <div className="valor">
                  <span>{formInfoTrabajador.Antiguedad || " - "}</span>
                </div>
              </div>
              <div className="col-8">
              </div>
            </div>

            <div className="row campos">
              <div className="col-6">
                <div className="campo">
                  <span>Tipo de Ingreso :</span>
                </div>
                <div className="valor">
                  <span>{formInfoTrabajador.TipoIngreso || " - "}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="campo">
                  <span>Categoría Ocupacional :</span>
                </div>
                <div className="valor">
                  <span>{formInfoTrabajador.CategoriaOcupacional || " - "}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="containter" id="formularioPagina2">
          {isDIAT ? this.renderDIAT() : this.renderDIEP()}
        </div>
        <div className="containter" id="formularioPagina3">
          <div className="prev-panel">
            <span className="pan-title-seccion" ><div className="title-seccion" style={{ marginRight: "61%" }} >6. IDENTIFICACIÓN DEL DENUNCIANTE</div></span>
            <div className="row campos">
              <div className="col-9">
                <div className="campo">
                  <span>Nombre :</span>
                </div>
                <div className="valor">
                  <span>{`${formDenunciante.FirstName} ${formDenunciante.LastName} ${formDenunciante.MothersName}` || " - "}</span>
                </div>
              </div>
              <div className="col-3">
                <div className="campo">
                  <span>Rut :</span>
                </div>
                <div className="valor">
                  <span>{formDenunciante.Rut || " - "}</span>
                </div>
              </div>
            </div>

            <div className="row campos">
              <div className="col-4">
                <div className="campo">
                  <span>Teléfono :</span>
                </div>
                <div className="valor">
                  <span>{formDenunciante.Phone || " - "}</span>
                </div>
              </div>
              <div className="col-8">
                <div className="campo">
                  <span>Clasiﬁcación del denunciante (ley 16.744) :</span>
                </div>
                <div className="valor">
                  <span>{formDenunciante.Clasificacion || " - "}</span>
                </div>
              </div>
            </div>

            <div className="row campos">
              <div className="col-12">
                <div className="campo-bajo">
                  <span className="title-firma-denunciante">FIRMA DEL DENUNCIANTE :</span>
                </div>
                <div className="valor-textArea-bajo">
                  {data.firmaDenun || " "}
                </div>
              </div>
            </div>

          </div>

          <div className="glosa-footer">
            <span>La simulación de un accidente del trabajo puede ser sancionada y da lugar al cobro de las prestaciones indebidamente obtenidas. Ello conforme a lo establecido al efecto
                por el artículo 43 de la ley N° 12.084, el que dispone que “Incurrirán en las penas establecidas en el artículo 210 del Código Penal, los que hicieren declaraciones falsas en
                certificados de supervivencia, de estado civil y demás que se exigen para el otorgamiento de beneficios de previsión.”
            </span>
          </div>
          <br />
          <br />
        </div>
      </React.Fragment>
    );
  }
}

export default FormularioDenunciaAccidente;
