import apiConfig from "../config/api";

const misDatos = `${apiConfig.apiUri}api/user/profile`;
const updateMail = `${apiConfig.apiUri}api/user`;
const companies = `${apiConfig.apiUri}api/user/companies`;
const getToken = () => localStorage.getItem("AccessToken");


export const getUserInfo = (rutUsuario) =>
  fetch(`${misDatos}/${rutUsuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getCompany = (rutUsuario) =>
  fetch(`${companies}/workin/${rutUsuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getCompanies = (rutUsuario) =>
  fetch(`${companies}/authorized/${rutUsuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const editUserInfo = (data) =>
  fetch(`${misDatos}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
    body: JSON.stringify(data),
  });

export const updateMailUser = (oldEmial, newEmail) =>
  fetch(`${updateMail}/UpdateEmailLogin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
    body: `OldEmail=${oldEmial}&NewEmail=${newEmail}`,
  });


export const changePassword = (Data) =>
  fetch(`${updateMail}/changePassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
    body: `OldPassword=${Data.oldPass}&NewPassword=${Data.NewPassword}&NewPasswordConfirmation=${Data.NewPasswordConfirmation}`,
  });
