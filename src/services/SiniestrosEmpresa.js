import apiConfig from "../config/api";

const siniestrosApi = `${apiConfig.apiUri}api/losses/company`;
const documentApi = "https://achsdev.azure-api.net/api/losses/document/";
const getToken = () => localStorage.getItem("AccessToken");

export const GetSiniestrosEmpresaApi = (header) =>
  fetch(`${siniestrosApi}/`, {
    method: "GET",
    headers: {
      ...header,
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
  });

export const GetSiniestrosDetallesApi = (idSiniestro) =>
  fetch(`${siniestrosApi}/detail/${idSiniestro}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
  });

export const GetSiniestroDocumentsApi = (idSiniestro) =>
  fetch(`${documentApi}/${idSiniestro}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
  });

export const GetDocument = (documentId) =>
  fetch(documentId, {
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": "8b84a1d721a6454aab5daa4b508fea2c",
      "Content-Type": "application/octet-stream",
      "Content-Disposition": "inline; filename='doc.pdf'",
    },

  }).then((response) => response.blob()).catch((error) => {
    console.log(error);
  });

export const GetPrestacionesApi = (header) =>
  fetch(`${siniestrosApi}/financialbenefits`, {
    method: "GET",
    headers: {
      ...header,
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
  });
