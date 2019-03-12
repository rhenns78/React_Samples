import apiConfig from "../config/api";

const apiRoles = `${apiConfig.apiUri}api/accessmanagement/rol`;
const rolesUser = `${apiConfig.apiUri}api/accessmanagement/assignment/rol`;
const getToken = () => localStorage.getItem("AccessToken");

export const allRolesByProfileId = (idProfile) =>
  fetch(`${apiRoles}/get/${idProfile}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
  });

export const overrideRolesForUser = (Rut, RelationTypeCode, CompanyRut, IdRoles) =>
  fetch(`${rolesUser}/user/company/create/override`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
    body: JSON.stringify({
      Rut,
      RelationTypeCode,
      CompanyRut,
      IdRoles,
    }),
  });

export const createRolesForUserAndCompany = (Rut, CompanyRut, RelationTypeCode, IdRoles) =>
  fetch(`${rolesUser}/user/company/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
    body: JSON.stringify({
      Rut,
      CompanyRut,
      RelationTypeCode,
      IdRoles,
    }),
  });

export const createRolesForUser = (Rut, IdRoles) =>
  fetch(`${rolesUser}/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
    body: JSON.stringify({
      Rut,
      IdRoles,
    }),
  });

export const createUserByRol = (idRol, companyRut, users) =>
  fetch(`${rolesUser}/users/company/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
    body: JSON.stringify({
      IdRol: idRol,
      CompanyRut: companyRut,
      UsersRelations: users,
    }),
  });
export const deleteRolesByUser = (data) =>
  fetch(`${rolesUser}/delete/user/${data.Rut}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
    body: JSON.stringify({
      IdRoles: data.idRoles,
    }),
  });

export const getEmplyeesByCompanyRut = (companyRut) =>
  fetch(`${apiConfig.apiUri}api/company/get/employees/${companyRut}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getExternalEmployees = (companyRut) =>
  fetch(`${apiConfig.apiUri}/api/notifications/external/assignment/get/${companyRut}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

