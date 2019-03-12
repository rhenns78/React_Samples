import apiConfig from "../config/api";

const apiSolicitudesUrl = `${apiConfig.apiUri}api/temp/user/request`;
// const apiLoginTemp = `${apiConfig.apiUri}api/temp`;

export const getSolicitudesApi = (rutEmpresa) =>
  fetch(`${apiSolicitudesUrl}/all/${rutEmpresa}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    credentials: "same-origin",
  });

export const deleteSolicitudApi = (rut, id) =>
  fetch(`${apiSolicitudesUrl}/${rut}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    credentials: "same-origin",
  });
