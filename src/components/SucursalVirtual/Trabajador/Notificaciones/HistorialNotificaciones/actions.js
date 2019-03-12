import { openCloseToast } from "../../../../Global/actions";
import { getHistoricNotificationsInbox, doNotificationToReadMassiveByFilters, doNotificationToRead } from "../../../../../services/NotificacionesApi";
import { setHeaderNotifications } from "../../../../Header/Notificaciones/actions";
import { store } from "../../../../../config/store";

export const loading = (isLoading) => ({
  type: "LOADING_HISTORIAL_NOTIFICACIONES",
  isLoading,
});

export const setNotificationFilters = (filters) => ({
  type: "SET_NOTIFICATION_FILTERS",
  filters,
});

export const resetHistory = () => ({
  type: "RESET_HISTORY",
});

export const setListaNotificacionesAndFilters = (notificaciones, totalRows, filters) => ({
  type: "SET_LISTA_NOTIFICACIONES_AND_FILTERS",
  notificaciones,
  totalRows,
  filters,
});

export const setListaNotificaciones = (notificaciones) => ({
  type: "SET_LISTA_NOTIFICACIONES",
  notificaciones,
});

export const changeParameterNotification = (parameters) => ({
  type: "CHANGE_PARAMETERS_NOTIFICATION",
  parameters,
});

export const doGetUserNotifications = (parameters, companies, filters, addNotification = false, oldIndex) => async (dispatch) => {
  try {
    const newFilters = buildFilterNotification(companies, filters);
    const url = buildQueryStringNotifications(parameters);
    const historial = await getHistoricNotificationsInbox(url);
    const result = await historial.json();
    const notifications = addNotification ?
      store.getState().historialNotificaciones.listaNotificaciones.concat(result.Notifications) :
      result.Notifications;
    if (oldIndex) {
      parameters.pageSize = 20;
      parameters.pageIndex = oldIndex;
    }
    dispatch(changeParameterNotification(parameters));
    dispatch(setListaNotificacionesAndFilters(notifications, result.TotalRows, newFilters));
  } catch (e) {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error al obtener el historial de notificaciones",
      typeStyle: "error",
    }));
  }
};

export const setNotificationsAsReadByFilter = (parameters) => async (dispatch) => {
  try {
    const url = buildQueryStringNotificationsChangeReadStatus(parameters);
    const read = await doNotificationToReadMassiveByFilters(url);
    if (read.status === 200) {
      // Get Notification
      let historial; let unreadBox; let resultHistorial; let resultUnreadBox;
      const param = store.getState().historialNotificaciones.parameters;
      if (param.pageIndex !== 0) {
        param.pageSize *= (param.pageIndex + 1);
        param.pageIndex = 0;
      }
      const urlHistoricNotification = buildQueryStringNotifications(param);
      const urlNotificationUnread = `${store.getState().global.userData.RUT}/all/page?read=false`;
      if (store.getState().router.location.pathname === "/perfil") {
        [historial, unreadBox] = await Promise.all([
          getHistoricNotificationsInbox(urlHistoricNotification),
          getHistoricNotificationsInbox(urlNotificationUnread)]);
        [resultHistorial, resultUnreadBox] = await Promise.all([historial.json(), unreadBox.json()]);
        dispatch(setListaNotificacionesAndFilters(resultHistorial.Notifications, resultHistorial.TotalRows, store.getState().historialNotificaciones.filters));
        dispatch(setHeaderNotifications(resultUnreadBox.Notifications, resultUnreadBox.TotalUnReadNotifications));
      } else {
        [unreadBox] = await Promise.all([getHistoricNotificationsInbox(urlNotificationUnread)]);
        [resultUnreadBox] = await Promise.all([unreadBox.json()]);
        dispatch(setHeaderNotifications(resultUnreadBox.Notifications, resultUnreadBox.TotalUnReadNotifications));
      }
    }
  } catch (e) {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error al obtener el historial de notificaciones",
      typeStyle: "error",
    }));
  }
};

export const setNotificationAsReadById = (Id) => async (dispatch) => {
  try {
    const response = await doNotificationToRead(Id);
    let historial; let unreadBox; let resultHistorial; let resultUnreadBox;
    if (response.status === 200) {
      const param = store.getState().historialNotificaciones.parameters;
      if (param.pageIndex !== 0) {
        param.pageSize *= (param.pageIndex + 1);
        param.pageIndex = 0;
      }
      const urlHistoricNotification = buildQueryStringNotifications(param);
      const urlNotificationUnread = `${store.getState().global.userData.RUT}/all/page?read=false`;
      if (store.getState().router.location.pathname === "/perfil") {
        [historial, unreadBox] = await Promise.all([
          getHistoricNotificationsInbox(urlHistoricNotification),
          getHistoricNotificationsInbox(urlNotificationUnread)]);
        [resultHistorial, resultUnreadBox] = await Promise.all([historial.json(), unreadBox.json()]);
        dispatch(setListaNotificaciones(resultHistorial.Notifications));
        dispatch(setHeaderNotifications(resultUnreadBox.Notifications, resultUnreadBox.TotalUnReadNotifications));
      } else {
        [unreadBox] = await Promise.all([getHistoricNotificationsInbox(urlNotificationUnread)]);
        [resultUnreadBox] = await Promise.all([unreadBox.json()]);
        dispatch(setHeaderNotifications(resultUnreadBox.Notifications, resultUnreadBox.TotalUnReadNotifications));
      }
    }
  } catch (e) {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error al obtener el historial de notificaciones",
      typeStyle: "error",
    }));
  }
};

export const buildFilterNotification = (companies, filters) => {
  try {
    if (companies) {
      companies.forEach((item) => {
        const exist = filters.find((elem) => elem.rut === item.RutEmpresa);
        if (!exist) {
          filters.push({
            id: "company", icon: "error", name: item.Nombre, rut: item.RutEmpresa,
          });
        }
      });
    }
    return filters;
  } catch (error) {
    throw error;
  }
};

export const buildQueryStringNotifications = (parameters) => {
  try {
    let result = `${store.getState().global.userData.RUT}/${parameters.type}/page?pageIndex=${parameters.pageIndex}&pageSize=${parameters.pageSize}`;
    if (parameters.type === "company" && parameters.companyRut) {
      result += `&companyRut=${parameters.companyRut}`;
    }
    if (parameters.read !== null) {
      result += `&read=${parameters.read}`;
    }
    return result;
  } catch (error) {
    throw error;
  }
};

export const buildQueryStringNotificationsChangeReadStatus = (parameters) => {
  try {
    let result = `${store.getState().global.userData.RUT}/${parameters.type}`;
    if (parameters.type === "company" && parameters.companyRut) {
      result += `?companyRut=${parameters.companyRut}`;
    }
    return result;
  } catch (error) {
    throw error;
  }
};
