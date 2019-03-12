
import trace from "../../../../../helpers/trace";
import { openCloseToast } from "../../../../Global/actions";

import { GetNotificationCompany, doUpdateChannelCompany } from "../../../../../services/NotificacionesApi";

export const loading = (isLoading) => ({
  type: "LOADING_NOTIFICACIONES",
  isLoading,
});

export const setCompanyNotificaciones = (listCompanyNotifications) => ({
  type: "SET_NOTIFICACIONES_COMPANY",
  listCompanyNotifications,
});

export const doGetCompanyNotificaction = (CompanyId) => async (dispatch) => {
  dispatch(loading(true));
  const toast = {};
  try {
    trace.information("Data de Mantenedor Notificaciones Empresa ");

    const request = await GetNotificationCompany();
    const result = await request.json();
    dispatch(setCompanyNotificaciones(result.Data));
  } catch (error) {
    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión, intente mas tarde";
    toast.typeStyle = "error";

    dispatch(openCloseToast(toast));
  }
  dispatch(loading(false));
};

export const setChangeChannelNotifications = (CompanyNotificationList) => async (dispatch) => {
  dispatch(loading(true));
  const toast = {};
  try {
    trace.information("Entro a guardar notificaciones company");

    const request = await doUpdateChannelCompany(CompanyNotificationList);
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
    toast.msgToast = "Error de conexión, intente mas tarde";
    toast.typeStyle = "error";

    dispatch(openCloseToast(toast));
  }
  dispatch(loading(false));
};

