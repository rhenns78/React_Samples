import apiConfig from "../config/api";

const apiTempUrl = `${apiConfig.apiUri  }api/temp/user/request`;
const apiUserUrl = `${apiConfig.apiUri  }api/user/request`;
const getToken = () => localStorage.getItem("AccessToken");

export const createSolicitudApi = (rut, companyRut, description) =>
  fetch(`${apiTempUrl}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    credentials: "same-origin",
    body: `RUT=${rut}&CompanyRut=${companyRut}&Description=${description}`,
  });

export const createSolicitudADApi = (rut, companyRut, description) =>
  fetch(`${apiUserUrl}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: `RUT=${rut}&CompanyRut=${companyRut}&Description=${description}`,
  });

export const deleteSolicitudADApi = (rut, idSolicitud) =>
  fetch(`${apiUserUrl}/${rut}/${idSolicitud}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
  });

export const getSolicitudesApi = (rut) =>
  fetch(`${apiTempUrl}/${rut}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    credentials: "same-origin",
  });

export const deleteSolicitudApi = (rut, idSolicitud) =>
  fetch(`${apiTempUrl}/${rut}/${idSolicitud}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    credentials: "same-origin",
  });

export const sendReminderApi = (idSolicitud) =>
  fetch(`${apiTempUrl}/sendreminder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    credentials: "same-origin",
    body: `IDRequest=${idSolicitud}`,
  });
