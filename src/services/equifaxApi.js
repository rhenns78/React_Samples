import apiConfig from "../config/api";

const equifaxUrl = `${apiConfig.apiUri}api/equifax`;
// const getToken = () => localStorage.getItem("AccessToken");

export const getQuestionsApi = (rutUsuario, serieCI) =>
  fetch(`${equifaxUrl}/questions/${rutUsuario}/${serieCI}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
  });

export const verifyAnswersApi = (QuestionsSetID, TransactionKey, Answers) =>
  fetch(`${equifaxUrl}/answers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    credentials: "same-origin",
    body: JSON.stringify({
      QuestionsSetID,
      TransactionKey,
      Answers,
    }),
  });
