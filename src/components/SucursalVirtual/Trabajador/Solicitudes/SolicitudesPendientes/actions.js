// import trace from "../../../helpers/trace";

import { createSolicitudApi, deleteSolicitudApi, sendReminderApi,
  getSolicitudesApi,
  createSolicitudADApi,
  deleteSolicitudADApi } from "../../../../../services/solicitudesApi";
import { openCloseToast, sendEmailApp } from "../../../../Global/actions";

export const loading = (isLoading) => ({
  type: "LOADING_SOLICITUDES",
  isLoading,
});

export const loadSolicitudes = (solicitudes) => ({
  type: "LOAD_SOLICITUDES",
  solicitudes,
});

export const setErrorCompanyRut = (message) => ({
  type: "SET_ERROR_COMPANY_RUT",
  message,
});

export const doGetSolicitudes = (rutUser) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await getSolicitudesApi(rutUser);
    if (response.ok) {
      const result = await response.json();
      dispatch(loadSolicitudes(result.Data));
    } else {
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al cargar las solicitudes",
        typeStyle: "error",
      }));
    }
  } catch {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error al cargar las solicitudes",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

export const doSendNewSolicitud = ({ rutEmpresa, userInfo, description }) => async (dispatch) => {
  dispatch(loading(true));
  dispatch(setErrorCompanyRut(null));
  try {
    // console.log("RutEmpresa:>", rutEmpresa, ", user:>", userInfo.RUT);
    let response;
    if (userInfo.TempBD) {
      response = await createSolicitudApi(userInfo.RUT, rutEmpresa, description);
      // ENVIO DE CORREO
      const parametersMail = {};
      parametersMail.userInfo = {
        FirstName: userInfo.FirstName,
        LastName: userInfo.LastName,
        Email: userInfo.Email,
        Rut: userInfo.RUT,
        rutEmpresa,
      };
      parametersMail.templateMail = "bienvenidaTemporal";
      await dispatch(sendEmailApp(parametersMail));
    } else {
      response = await createSolicitudADApi(userInfo.RUT, rutEmpresa, description);
    }

    if (response.status === 200) {
      dispatch(doGetSolicitudes(userInfo.RUT));
      dispatch(setErrorCompanyRut(false));
      // envio correo
    } else {
      const result = await response.json();
      dispatch(setErrorCompanyRut(result.Message));
    }
  } catch {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error al crear la nueva solicitud",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

export const doDeleteSolicitud = (rut, idSolicitud, FromUserAD) => async (dispatch) => {
  try {
    let response;
    if (FromUserAD) {
      response = await deleteSolicitudADApi(rut, idSolicitud);
    } else {
      response = await deleteSolicitudApi(rut, idSolicitud);
    }
    if (response.status === 200) {
      dispatch(doGetSolicitudes(rut));
    } else {
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al borrar la solicitud",
        typeStyle: "error",
      }));
    }
  } catch {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error al borrar la solicitud",
      typeStyle: "error",
    }));
  }
};

export const doResendSolicitud = (idSolicitud) => async (dispatch) => {
  try {
    const response = await sendReminderApi(idSolicitud);
    if (response.ok) {

    } else {
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al reenviar la solicitud",
        typeStyle: "error",
      }));
    }
  } catch {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error al reenviar la solicitud",
      typeStyle: "error",
    }));
  }
};
