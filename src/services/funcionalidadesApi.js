import apiConfig from "../config/api";

const funcApi = `${apiConfig.apiUri}api/accessmanagement/assignment/functionality`;
const functionalityApi = `${apiConfig.apiUri}api/accessmanagement/functionality`
const getToken = () => localStorage.getItem("AccessToken");

export const getRolFunctionality = (idRol) => 
  fetch(`${funcApi}/get/rol/${idRol}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      "Authorization": `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
  });

export const deleteRolFunctionalities = (idRol) => 
  fetch(`${funcApi}/delete/rol/${idRol}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      "Authorization": `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
  });

export const createRolFunctionalities = (idRol, functionalities) => 
  fetch(`${funcApi}/create/functionalities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      "Authorization": `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
    body: JSON.stringify({
      IdFunctionalities: functionalities,
      IdRol: idRol,
    })
  });

export const getUserFunctionalitiesApi = (rutUser) =>
  fetch(`${functionalityApi}/get/user/${rutUser}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      "Authorization": `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
  });

export const getAllFunctionalities = () =>
  fetch(`${functionalityApi}/get/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      "Authorization": `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
  });