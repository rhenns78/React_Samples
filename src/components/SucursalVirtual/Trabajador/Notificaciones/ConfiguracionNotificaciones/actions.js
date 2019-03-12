
import trace from "../../../../../helpers/trace";
import { openCloseToast } from "../../../../Global/actions";

import { GetNotificationUserConfig, doUpdateChannelUserConfig } from "../../../../../services/NotificacionesApi";

export const loading = (isLoading) => ({
  type: "LOADING_CONFIGURACION_NOTIFICACION_TRABAJADOR",
  isLoading,
});

export const setCompanyNotificaciones = (listCompanyNotifications) => ({
  type: "SET_CONFIGURACION_NOTIFICACION_TRABAJADOR",
  listCompanyNotifications,
});

export const doGetCompanyNotificaction = (employeeRut) => async (dispatch) => {
  dispatch(loading(true));
  const toast = {};
  try {
    trace.information("Data de Configuracion Notificaciones worker ");

    const request = await GetNotificationUserConfig(employeeRut);
    const result = await request.json();

    dispatch(setCompanyNotificaciones(result.Data));
  } catch (error) {
    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión, intente más tarde";
    toast.typeStyle = "error";

    dispatch(openCloseToast(toast));
  }
  dispatch(loading(false));
};

export const setChangeChannelNotifications = (CompanyNotificationList) => async (dispatch) => {
  dispatch(loading(true));
  const toast = {};
  try {
    trace.information("Entro a guardar configuracion notificacion trabajador");

    const request = await doUpdateChannelUserConfig(CompanyNotificationList);
    const result = await request.json();
    if (request.status === 200) {
      if (result.Success) {
        toast.isToastOpen = true;
        toast.msgToast = "Se han guardado las modificaciones";
        toast.typeStyle = "success";

        dispatch(openCloseToast(toast));
      }
    } else {
      toast.isToastOpen = true;
      toast.msgToast = result.Message;
      toast.typeStyle = "error";
      dispatch(openCloseToast(toast));
    }
  } catch (error) {
    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión, intente más tarde";
    toast.typeStyle = "error";

    dispatch(openCloseToast(toast));
  }
  dispatch(loading(false));
};

