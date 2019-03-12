
import { validateCompanyId } from "../../services/registroApi";
import { sendMail } from "../../services/emailApi";
import { store } from "../../config/store";

import {
  listaEstadoCivil, listaRegiones, listaComunas, listaAfp, listaRubros, listaJornadas, listaBancos, listaParentesco, listaSucursales,
  listaSexos, listaNacionalidades, listaPueblosOriginarios, listaTiposCalle, listaClasificacionesAccidente, listaMediosPrueba, listaTiposCuenta,
  listaTiposContrato, listaCategoriasOcupacionales, listaTiposIngreso, listaDirecciones,
} from "../../services/listasApi";
// listaProfesionales,

import trace from "../../helpers/trace";
export const ActualizarDatosUsuario = (userData) => ({
  type: "GLOBAL_ACTUALIZAR_DATOS_USUARIO",
  userData,
});

export const setExpanded = (expand) => ({
  type: "SET_EXPANDED",
  expand,
});

export const openCloseToast = (toast) => ({
  type: "OPEN_CLOSE_TOAST",
  toast,
});
export const loading = (isLoading) => ({
  type: "LOADING",
  isLoading,
});
export const setSelectedCompany = (companyId, companyName) => ({
  type: "SET_SELECTED_COMPANY",
  companyId,
  companyName,
});
export const setSucursalId = (sucursalId, sucursalName) => ({
  type: "SET_SUCURSALID",
  sucursalId,
  sucursalName,
});
export const setComanyList = (listaEmpresas) => ({
  type: "SET_COMPANY_LIST",
  listaEmpresas,
});

export const setColor = (botomBorderColor) => ({
  type: "SET_COLOR",
  botomBorderColor,
});

export const setUserFunctionalities = (ids) => ({
  type: "SET_USER_FUNCTIONALITIES",
  ids,
});

export const setPreventNavigation = (preventNavigation) => ({
  type: "SET_PREVENT_NAVIGATION",
  preventNavigation,
});

export const setAllList = (list) => ({
  type: "SET_ALL_LIST",
  list,
});

export const setSucursalesList = (list) => ({
  type: "SET_SUCURSALES_LIST",
  list,
});

export const setSucursalesOfCompany = (list) => ({
  type: "SET_SUCURSALES_OF_COMPANY",
  list,
});

export const resetGlobalState = () => ({
  type: "RESET_GLOBAL_STATE",
});


export const doFindCompanies = (RutUser) => async (dispatch) => {
  dispatch(loading(true));
  try {
    trace.information("Inicio Buscar empresas por rut");
    let resultRut;

    const response = await validateCompanyId(RutUser);
    if (response.ok) {
      resultRut = await response.json();
      if (resultRut.Success === true && resultRut.Companies !== null) {
        dispatch(setComanyList(resultRut.Companies));
      }
    } else {
      trace.information("ERROR", "Sin Empresas");
    }
  } catch (error) {
    trace.information("ERROR", error);
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente más tarde",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

export const setCompanyId = (companyId, companyName, closeSelectCallback) => async (dispatch) => {
  try {
    let list = [
      { Direccion: "Todas las sucursales", IdSucursal: "" },
    ];
    dispatch(setSelectedCompany(companyId, companyName));
    const request = await listaSucursales(companyId);
    if (request.status === 200) {
      const result = await request.json();
      if (result.Success) {
        list = [
          ...list,
          ...result.ListaSucursales,
        ];
      }
    }
    closeSelectCallback();
    dispatch(setSucursalesOfCompany(list));
  } catch (error) {
    trace.information("ERROR", error);
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente más tarde",
      typeStyle: "error",
    }));
  }
};


export const getLists = (listas) => async (dispatch) => {
  trace.information("Entro a getList");

  try {
    const result = {};
    const global = store.getState().global;

    result.Comunas = global.listaComuna.length > 0 ? global.listaComuna : [];
    result.ListadoAfps = global.listaAfp.length > 0 ? global.listaAfp : [];
    result.Regiones = global.listaRegion.length > 0 ? global.listaRegion : [];
    result.EstadosCiviles = global.listaEstadoCivil.length > 0 ? global.listaEstadoCivil : [];
    result.ListaBancos = global.listaBancos.length > 0 ? global.listaBancos : [];
    result.ListaJornadas = global.listaTipoJornada.length > 0 ? global.listaTipoJornada : [];
    result.ListaRubros = global.listaRubro.length > 0 ? global.listaRubro : [];
    result.ListaParentescos = global.listaParentesco.length > 0 ? global.listaParentesco : [];

    result.listaSexos = global.listaSexos.length > 0 ? global.listaSexos : [];
    result.listaNacionalidades = global.listaNacionalidades.length > 0 ? global.listaNacionalidades : [];
    result.listaPueblosOriginarios = global.listaPueblosOriginarios.length > 0 ? global.listaPueblosOriginarios : [];
    result.listaTiposCalle = global.listaTiposCalle.length > 0 ? global.listaTiposCalle : [];
    result.listaClasificacionesAccidentes = global.listaClasificacionesAccidentes.length > 0 ? global.listaClasificacionesAccidentes : [];
    result.listaMediosPrueba = global.listaMediosPrueba.length > 0 ? global.listaMediosPrueba : [];
    result.listaTiposCuenta = global.listaTiposCuenta.length > 0 ? global.listaTiposCuenta : [];
    result.listaTiposContrato = global.listaTiposContrato.length > 0 ? global.listaTiposContrato : [];
    result.listaCategoriasOcupacionales = global.listaCategoriasOcupacionales.length > 0 ? global.listaCategoriasOcupacionales : [];
    result.listaTiposIngreso = global.listaTiposIngreso.length > 0 ? global.listaTiposIngreso : [];
    result.listaDirecciones = global.listaDirecciones.length > 0 ? global.listaDirecciones : [];

    if (listas.listaProfesiones === true) {
      result.listaProfesiones = [];
    }
    if (listas.listaAfp === true) {
      const response = await listaAfp();
      if (response.status === 200) {
        const resultResponse = await response.json();
        result.ListadoAfps = resultResponse.ListadoAfps;
      }
    }
    if (listas.listaRegion === true) {
      const response = await listaRegiones();
      if (response.status === 200) {
        const resultResponse = await response.json();
        result.Regiones = resultResponse.Regiones;
      }
    }
    if (listas.listaEstadoCivil === true) {
      const response = await listaEstadoCivil();
      if (response.status === 200) {
        const resultResponse = await response.json();
        result.EstadosCiviles = resultResponse.EstadosCiviles;
      }
    }
    if (listas.listaIsapres === true) {
      result.ListadoIsapres = [];
    }
    if (listas.listaBancos === true) {
      const response = await listaBancos();
      if (response.status === 200) {
        const resultResponse = await response.json();
        result.ListaBancos = resultResponse.ListaBancos;
      }
    }
    if (listas.listaTipoJornada === true) {
      const response = await listaJornadas();
      if (response.status === 200) {
        const resultResponse = await response.json();
        result.ListaJornadas = resultResponse.ListaJornadas;
      }
    }
    if (listas.listaRubros === true) {
      const response = await listaRubros();
      if (response.status === 200) {
        const resultResponse = await response.json();
        result.ListaRubros = resultResponse.ListaRubros;
      }
    }
    if (listas.listaParentesco === true) {
      const response = await listaParentesco();
      if (response.status === 200) {
        const resultResponse = await response.json();
        result.ListaParentescos = resultResponse.ListaParentescos;
      }
    }
    if (listas.listaComuna === true) {
      const response = await listaComunas();
      if (response.status === 200) {
        const resultResponse = await response.json();
        result.Comunas = resultResponse.Comunas;
      }
    }

    if (listas.listaSexos === true) {
      const response = await listaSexos();
      if (response.status === 200) {
        const resultResponse = await response.json();
        result.listaSexos = resultResponse.ListaSexos;
      }
    }

    if (listas.listaNacionalidades === true) {
      const response = await listaNacionalidades();
      if (response.status === 200) {
        const resultResponse = await response.json();
        result.listaNacionalidades = resultResponse.ListaNacionalidades;
      }
    }

    if (listas.listaPueblosOriginarios === true) {
      const response = await listaPueblosOriginarios();
      if (response.status === 200) {
        const resultResponse = await response.json();
        result.listaPueblosOriginarios = resultResponse.ListaPueblosOriginarios;
      }
    }

    if (listas.listaTiposCalle === true) {
      const response = await listaTiposCalle();
      if (response.status === 200) {
        const resultResponse = await response.json();

        result.listaTiposCalle = resultResponse.ListaTiposCalle;
      }
    }

    if (listas.listaClasificacionesAccidentes === true) {
      const response = await listaClasificacionesAccidente();
      if (response.status === 200) {
        const resultResponse = await response.json();

        result.listaClasificacionesAccidentes = resultResponse.ListaClasificacionesAccidente;
      }
    }

    if (listas.listaMediosPrueba === true) {
      const response = await listaMediosPrueba();
      if (response.status === 200) {
        const resultResponse = await response.json();

        result.listaMediosPrueba = resultResponse.ListaMediosPrueba;
      }
    }

    if (listas.listaTiposCuenta === true) {
      const response = await listaTiposCuenta();
      if (response.status === 200) {
        const resultResponse = await response.json();
        result.listaTiposCuenta = resultResponse.ListaTipoCuentas;
      }
    }

    if (listas.listaTiposContrato === true) {
      const response = await listaTiposContrato();
      if (response.status === 200) {
        const resultResponse = await response.json();
        result.listaTiposContrato = resultResponse.ListaTiposContrato;
      }
    }

    if (listas.listaCategoriasOcupacionales === true) {
      const response = await listaCategoriasOcupacionales();
      if (response.status === 200) {
        const resultResponse = await response.json();
        result.listaCategoriasOcupacionales = resultResponse.ListaCategoriasOcupacionales;
      }
    }

    if (listas.listaTiposIngreso === true) {
      const response = await listaTiposIngreso();
      if (response.status === 200) {
        const resultResponse = await response.json();
        result.listaTiposIngreso = resultResponse.ListaTiposIngreso;
      }
    }

    if (listas.listaDirecciones === true) {
      const response = await listaDirecciones();
      if (response.status === 200) {
        const resultResponse = await response.json();
        result.listaDirecciones = resultResponse.ListaDirecciones;
      }
    }

    dispatch(setAllList(result));
  } catch (error) {
    trace.information("ERROR", error);
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente más tarde",
      typeStyle: "error",
    }));
  }
};

export const getSucursales = (companyId) => async (dispatch) => {
  trace.information("Entro a ver sucursales");
  dispatch(loading(true));
  try {
    const result = {};

    const response = await listaSucursales(companyId);
    const resultResponse = await response.json();

    if (response.status === 200 && resultResponse.Success === true) {
      result.listadoSucursales = resultResponse.ListaSucursales;
    } else {
      result.listadoSucursales = [];
    }
    dispatch(setSucursalesList(result.listadoSucursales));
  } catch (error) {
    trace.information("ERROR", error);
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente más tarde",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

export const mailPrmts = (parameters) => {
  const result = {};
  let subject = "";
  let dynamic_template_data = {};
  result.from = { email: "automatizacion@achs.cl", name: "Asociacion Chilena de Seguridad" };
  switch (parameters.templateMail) {
    case "bienvenidaTemporal": {
      result.template_id = "d-700dbc5491bf4a68b1b908d6e54aa072";
      subject = "Bienvenido a ACHS";

      dynamic_template_data = {
        NombreApellido: `${parameters.userInfo.FirstName} ${parameters.userInfo.LastName ? parameters.userInfo.LastName : null}`,
        RutEmpresa: parameters.userInfo.rutEmpresa,
        RutPersona: parameters.userInfo.Rut,
        EmailPersona: parameters.userInfo.Email,
      };


      break;
    }
    case "activaUsuario": {
      result.template_id = "d-802a4240439543d2815e5b13e5f28277";
      subject = "Activar Cuenta";
      dynamic_template_data = {
        NombreApellido: `${parameters.userInfo.FirstName} ${parameters.userInfo.LastName ? parameters.userInfo.LastName : null}`,
        rut: parameters.userInfo.Rut,
        mail: parameters.userInfo.Email,
        urlActivacion: parameters.userInfo.href,
      };
      break;
    }
    case "solicitudRechazada": {
      result.template_id = "d-ed2338e1ec0b40ea95e30ac37134d9b8";
      subject = "Solicitud Rechazada";
      dynamic_template_data = {
        empresa: parameters.userInfo.RutEmpresa,
      };
      break;
    }
    default:
      break;
  }

  result.personalizations = [
    {
      to: [
        { email: parameters.userInfo.Email, name: `${parameters.userInfo.FirstName ? parameters.userInfo.FirstName : null} ${parameters.userInfo.LastName ? parameters.userInfo.LastName : null}` },
        { email: "rennyc@lagash.com", name: "Renny Camacho" },
        { email: "Javierc@lagash.com", name: "Javier Calderón" },
        { email: "carlosc@lagash.com", name: "Carlos 'Pipo' Campos" },


      ],
      subject,
      dynamic_template_data,
    }];
  result.reply_to = { email: "automatizacion@achs.cl", name: "Asociacion Chilena de Seguridad" };


  return result;
};

export const sendEmailApp = (parameters) => async (dispatch) => {
  const json = mailPrmts(parameters);

  console.log(json);
  const toast = {};
  const response = await sendMail(json);
  if (response.status === 200) {
    trace.information(`email enviado ${json}`);
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Se ha enviado un nuevo correo de activación, revisa tu carpeta de Spam y correos no deseados.",
      typeStyle: "success",
    }));
  } else {
    toast.isToastOpen = true;
    toast.msgToast = "Error, email de notificación fallo";
    toast.typeStyle = "error";
  }
};

