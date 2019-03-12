import apiConfig from "../config/api";

const apiRoles = `${apiConfig.apiUri}api/accessmanagement/rol`;
const getToken = () => localStorage.getItem("AccessToken");

export const createRol = (idPerfil, name, description) =>
  fetch(`${apiRoles}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      "Authorization": `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
    body: JSON.stringify({
      IdProfile: idPerfil,
      Name: name,
      Description: description,
    })
  });

export const updateRol = (id, idPerfil, name, description) =>
  fetch(`${apiRoles}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      "Authorization": `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
    body: JSON.stringify({
      Id: id,
      IdProfile: idPerfil,
      Name: name,
      Description: description,
    })
  });

export const deleteRol = (idRol) => 
  fetch(`${apiRoles}/delete/${idRol}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      "Authorization": `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
  });

export const getRolesByProfile = (idRol) => 
  fetch(`${apiRoles}/get/${idRol}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      "Authorization": `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
  });

export const getAllRoles = () => 
  fetch(`${apiRoles}/get/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      "Authorization": `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
  });

export const getRolIdByCode = (code) =>
  fetch(`${apiRoles}/get/code/${code}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      "Authorization": `Bearer ${getToken()}`,
    }
  })
