import apiConfig from "../config/api";

const apiPerfiles = `${apiConfig.apiUri}api/accessmanagement/profile`;
const getToken = () => localStorage.getItem("AccessToken");

export const getAllProfiles = () => 
  fetch(`${apiPerfiles}/get/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      "Authorization": `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
  });

export const createProfileApi = (name, description) => 
  fetch(`${apiPerfiles}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      "Authorization": `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
    body: JSON.stringify({
      Name: name,
      Description: description,
    })
  });

export const updateProfileApi = (idProfile, name, description, active) => 
  fetch(`${apiPerfiles}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      "Authorization": `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
    body: JSON.stringify({
      Active: active,
      IdProfile: idProfile,
      Name: name,
      Description: description,
    })
  });

export const deleteProfileApi = (idProfile) => 
  fetch(`${apiPerfiles}/delete/${idProfile}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      "Authorization": `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
  });
  