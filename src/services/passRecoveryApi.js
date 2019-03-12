import apiConfig from "../config/api";

const apiLoginUrl = `${apiConfig.apiUri}api/recovery`;
const passUrl = `${apiConfig.apiUri}api/password`;

export const requestPasswordApi = (loginData) => 
  fetch(`${apiLoginUrl}/requestpassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    body: `Username=${loginData}`,
    credentials: "same-origin",
  });

export const sendApi = ({email, isTemporal, type}) => 
  fetch(`${apiLoginUrl}/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    body: `Email=${email}&IsTemporalUser=${isTemporal}&Type=${type}`,
    credentials: "same-origin",
  });

export const validateTokenApi = ({email, token}) =>   
  fetch(`${apiLoginUrl}/validatetoken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    body: `Email=${email}&Token=${token}`,
    credentials: "same-origin",
  });

export const changePassApi = ({email, token, isTemporal, pass, passConfirmation}) =>   
  fetch(`${apiLoginUrl}/changepassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    body: `Email=${email}&Token=${token}&IsTemporalUser=${isTemporal}&NewPassword=${pass}&ConfirmNewPassword=${passConfirmation}`,
    credentials: "same-origin",
  });

export const setPasswordOnActivation = (activationToken, pass, passRepeat) => 
  fetch(`${passUrl}/setpassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    credentials: "same-origin",
    body: `Token=${activationToken}&NewPassword=${pass}&ConfirmNewPassword=${passRepeat}`,
  });