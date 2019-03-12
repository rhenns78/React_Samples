import apiConfig from "../config/api";

const apiUserUrl = `${apiConfig.apiUri}api/user`;
const apiTempUrl = `${apiConfig.apiUri}api/temp`;
const getToken = () => localStorage.getItem("AccessToken");

export const validateUserExist = (rutUsuario) =>
  fetch(`${apiUserUrl}/exists/${rutUsuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    credentials: "same-origin",
  });

export const validateRutApi = (rutUsuario) =>
  fetch(`${apiUserUrl}/rut/${rutUsuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    credentials: "same-origin",
  });
export const validateRutTemp = (rutUsuario) =>
  fetch(`${apiTempUrl}/user/rut/${rutUsuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    credentials: "same-origin",
  });

export const validateEmailApi = (email) =>
  fetch(`${apiUserUrl}/email/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    credentials: "same-origin",
  });


export const validateEmailTemp = (email) =>
  fetch(`${apiTempUrl}/user/email/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    credentials: "same-origin",
  });

export const doValidateSerivice = (rutUsuario, periodo) =>
  fetch(`${apiUserUrl}/validate/${rutUsuario}/${periodo}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    credentials: "same-origin",
  });


export const conditionAcept = (rutUsuario) =>
  fetch(`${apiUserUrl}/termsandconditionsacceptance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      accept: "application/json",
    },
    body: `Rut=${rutUsuario}`,
    credentials: "same-origin",
  });

// export const sendMail = (email) =>
//   fetch(`${apiConfig.apiUri}api/mail/send`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
//     },
//     body: JSON.stringify(email),
//     credentials: "same-origin",
//   });

// usado al aceptar una solicitud y el usuario es externo y tiene mas de un rol
// usado al registrar un usuario AD con rol dependiente o independiente
export const createUserAdWithRolesApi = (userRegister) =>
  fetch(`${apiUserUrl}/createwithroles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      accept: "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({
      UserType: userRegister.UserType,
      Email: userRegister.Email,
      Password: userRegister.Password,
      FirstName: userRegister.FirstName,
      LastName: userRegister.LastName,
      Rut: userRegister.Rut,
      MobiLe: userRegister.Phone,
      RelationType: userRegister.RelationType,
      CompanyRut: userRegister.CompanyRut,
      IdRoles: userRegister.IdRoles,
    }),
  });

// Usado cuando el usuario tiene el rol de ex achs
export const createUserAdApi = (userRegister) =>
  fetch(`${apiUserUrl}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    credentials: "same-origin",
    body: JSON.stringify({
      UserType: userRegister.UserType,
      Email: userRegister.Email,
      Password: userRegister.Password,
      FirstName: userRegister.FirstName,
      LastName: userRegister.LastName,
      Rut: userRegister.Rut,
      MobiLe: userRegister.Phone,
    }),
  });


export const createTempUserApi = (personalData) =>
  fetch(`${apiTempUrl}/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    body: `RUT=${personalData.Rut}&FirstName=${personalData.FirstName}&LastName=${personalData.LastName}&Birthdate=${personalData.Birthdate}&Email=${personalData.Email}&Password=${personalData.Password}&CellPhoneNumber=${personalData.Phone && personalData.Phone.replace("+", "%20")}`,
    credentials: "same-origin",
  });


export const validateCompanyId = (runUsuario) =>

  fetch(`${apiUserUrl}/companies/authorized/${runUsuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
  });

export const validateActiveToken = (token) =>

  fetch(`${apiUserUrl}/activate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },
    body: `Token=${token}`,
    credentials: "same-origin",
  });

export const deleteUserTemp = (rutUsuario) =>

  fetch(`${apiTempUrl}/user/${rutUsuario}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
    },

    credentials: "same-origin",
  });

