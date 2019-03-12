import apiConfig from "../config/api";

const mantenedorEmpresa = `${apiConfig.apiUri}api/notifications/get/company`;
const workerNotificationConfig = `${apiConfig.apiUri}api/notifications`;
const updateNotification = `${apiConfig.apiUri}api/notifications/update/company`;
const apiNotificacionEmpresa = `${apiConfig.apiUri}api/notifications/company/assignment`;
const apiNotificacionExternal = `${apiConfig.apiUri}api/notifications/external/assignment`;
const apiNotificacionesInbox = `${apiConfig.apiUri}api/notifications/inbox`;
const getToken = () => localStorage.getItem("AccessToken");

export const GetNotificationCompany = () =>
  fetch(`${mantenedorEmpresa}/grouped?showInactive=true`, {
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const massiveSuscriptionApi = (data) =>
  fetch(`${apiNotificacionEmpresa}/massive/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

export const massiveExternalWorkerSuscriptionApi = (data) =>
  fetch(`${apiNotificacionExternal}/create/groups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

export const externalWorkerSuscriptionApi = (data) =>
  fetch(`${apiNotificacionExternal}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });


export const suscribeMultipleUsersApi = (data) =>
  fetch(`${apiNotificacionEmpresa}/employeegroup/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

export const getNotificationsOfUser = (rutUsuario, companyId) =>
  fetch(`${apiNotificacionEmpresa}/get/grouped/${companyId}/${rutUsuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });
export const getNotificationsOfExternalUser = (companyRut, externalEmail) =>
  fetch(`${apiNotificacionExternal}/get/${companyRut}/${externalEmail}/grouped`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const deleteUserSuscriptions = (data) =>
  fetch(`${apiNotificacionEmpresa}/notificationgroup/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

export const massiveDeleteApi = (data) =>
  fetch(`${apiNotificacionEmpresa}/employeegroup/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

 
 export const deleteExternalUserSuscriptionsApi = (data) =>
  fetch(`${apiNotificacionExternal}/notificationgroup/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
export const massiveExternalDeleteApi = (data) =>
  fetch(`${apiNotificacionExternal}/massive/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });


export const doUpdateChannelCompany = (CompanyNotificationList) =>
  fetch(`${updateNotification}/channelselection`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(CompanyNotificationList),
  });

export const getCompanySuscriptions = (companyId) =>

  fetch(`${apiNotificacionEmpresa}/get/grouped/${companyId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getCompanySuscriptionsExternal = (companyRut) =>
  fetch(`${apiNotificacionExternal}/get/${companyRut}/grouped`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },

  });

export const getHistoricNotificationsInbox = (url) =>

  fetch(`${apiNotificacionesInbox}/get/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const doNotificationToReadMassiveByFilters = (url) =>

  fetch(`${apiNotificacionesInbox}/markasread/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const doNotificationToRead = (idNotification) =>
  fetch(`${apiNotificacionesInbox}/markasread`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      WebNotificationInboxId: idNotification,
    }),

  });

export const doNotificationToReadMassive = (ids) =>
  fetch(`${apiNotificacionesInbox}/massive/markasread`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      WebNotificationInboxIds: ids,
    }),

  });

export const GetNotificationUserConfig = (employeeRut) =>
  fetch(`${workerNotificationConfig}/employee/get/${employeeRut}?showInactive=true`, {
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const doUpdateChannelUserConfig = (CompanyNotificationList) =>
  fetch(`${workerNotificationConfig}/update/employee/channelselection`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(CompanyNotificationList),
  });

