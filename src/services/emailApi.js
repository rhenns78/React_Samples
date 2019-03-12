import apiConfig from "../config/api";


const getToken = () => localStorage.getItem("AccessToken");
export const sendMail = (email) =>
  fetch(`${apiConfig.apiUri}api/mail/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(email),
    credentials: "same-origin",
  });
