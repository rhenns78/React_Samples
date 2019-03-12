import apiConfig from "../config/api";

const apiLosses = `${apiConfig.apiUri}api/losses`;
const getToken = () => localStorage.getItem("AccessToken");

export const getSiniestrosApi = (rut, skip, take, filter) =>
  fetch(`${apiLosses}/rut/${rut}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getSiniestroDetailsApi = (idSiniestro) =>
  fetch(`${apiLosses}/detail/${idSiniestro}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getLastSiniestroApi = (rut) =>
  fetch(`${apiLosses}/last/${rut}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

