import apiConfig from "../../../config/api";
import { getHistoricNotificationsInbox } from "../../../services/NotificacionesApi";
import { openCloseToast } from "../../Global/actions";
import { store } from "../../../config/store";
import { doGetUserNotifications } from "../../SucursalVirtual/Trabajador/Notificaciones/HistorialNotificaciones/actions";
// setListaNotificaciones
export const loading = (isLoading) => ({
  type: "LOADING_NOTIFICACIONES",
  isLoading,
});

export const setHeaderNotifications = (notificactionHeaderList, totalUnread) => ({
  type: "SET_HEADER_NOTIFICATIONS",
  notificactionHeaderList,
  totalUnread,
});

export const setTokenjwt = (tokenJwt) => ({
  type: "SET_TOKEN_JWT",
  tokenJwt,
});

export const doGetTokenJwt = (email) => async (dispatch) => {
  const params = {
    Id: email,
    IdPerson: email, // "Admin",
    IdPersonType: "EMAIL",
    CallBackUri: apiConfig.callback,
  };

  const request = await fetch(
    `${apiConfig.apiUri}api/jwt`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      },
      credentials: "same-origin",
      body: JSON.stringify(params),
    }
  );

  if (request.status === 200) {
    const response = await request.json();
    dispatch(setTokenjwt(response.Token));
  }
};

export const setPopOverStatus = (open) => ({
  type: "SET_POP_OVER_STATUS",
  open,
});

export const doSetNotification = (rutUsuario) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const url = `${rutUsuario}/all/page?read=false`;
    const request = await getHistoricNotificationsInbox(url);
    const response = await request.json();
    let index = 0;
    dispatch(setHeaderNotifications(response.Notifications, response.TotalUnReadNotifications));
    if (store.getState().router.location.pathname === "/perfil") {
      const param = store.getState().historialNotificaciones.parameters;
      if (param.pageIndex !== 0) {
        index = param.pageIndex;
        param.pageSize *= (param.pageIndex + 1);
        param.pageIndex = 0;
      }
      dispatch(doGetUserNotifications(
        param,
        store.getState().global.listaEmpresas,
        store.getState().historialNotificaciones.filters,
        false,
        index,
      ));
    }
  } catch (e) {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente más tarde",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

