import apiConfig from "../config/api";

const apiLoginUrl = `${apiConfig.apiUri}api/login`;
const apiLoginTemp = `${apiConfig.apiUri}api/temp`;
const userApi = `${apiConfig.apiUri}api/user`;

export const LoginUserApi = (loginData) =>
  fetch(`${apiLoginUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    body: `Username=${loginData.Username}&Password=${loginData.Password}&AuthType=${loginData.AuthType}&ApplicationId=${apiConfig.applicationid}`,
    credentials: "same-origin",
  });

export const GetEmailTokenApi = (userEmail) => 
  fetch(`${userApi}/emailtoken/${userEmail}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    credentials: "same-origin",
  });

export const ValidateTokenApi = (AccessToken) =>
  fetch(`${apiLoginUrl}/validatetoken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    body: `Token=${AccessToken}&ApplicationId=${apiConfig.applicationid}`,
    credentials: "same-origin",
  });

export const RefreshTokenApi = (refreshToken) => 
  fetch(`${apiLoginUrl}/refreshtoken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    body: `RefreshToken=${refreshToken}&ApplicationId=${apiConfig.applicationid}`,
    credentials: "same-origin",
  });

export const LoginUserTempApi = (loginData) =>
  fetch(`${apiLoginTemp}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    body: `Username=${loginData.Username}&Password=${loginData.Password}`,
    credentials: "same-origin",
  });

