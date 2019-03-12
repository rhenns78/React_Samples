import apiConfig from "../config/api";
// import datamock from "../components/SucursalVirtual/Trabajador/Siniestros/Prestaciones/datamock.json";

const apiLosses = `${apiConfig.apiUri}api/losses`;
const getToken = () => localStorage.getItem("AccessToken");


export const getPrestacionesApi = (rut, skip, take, filter) =>
  fetch(`${apiLosses}/financialbenefits/${rut}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getLastPrestacionesApi = (rut) =>
  fetch(`${apiLosses}/financialbenefits/last/${rut}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const GetDraftDocument = (employeeRut, companyRut, userRut, idFinancialBenefit) =>
  fetch(`${apiLosses}/financialbenefits/draft/${employeeRut}/${companyRut}/${userRut}/${idFinancialBenefit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });


export const CreateDraftDocuments = (Data) =>
  fetch(`${apiLosses}/financialbenefits/draft/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: `EmployeeRut=${Data.Rut}&CompanyRut=${Data.CompanyRut}&JsonData=${Data.jsonData}&UserRut=${Data.UserRut}&idFinancialBenefit=${Data.idFinancialBenefit}`,
    credentials: "same-origin",
  });

export const DeleteDraftComplaint = (IdDraftFinancialBenefit) =>
  fetch(`${apiLosses}/financialbenefits/draft/delete/${IdDraftFinancialBenefit}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
  });

export const UpdateDraftDocument = (Data) =>
  fetch(`${apiLosses}/financialbenefits/draft/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: `EmployeeRut=${Data.Rut}&CompanyRut=${Data.CompanyRut}&JsonData=${Data.jsonData}&UserRut=${Data.UserRut}&idFinancialBenefit=${Data.idFinancialBenefit}`,
    credentials: "same-origin",
  });

export const doUploadDocumentApi = (Data) =>
  fetch(`${apiConfig.apiUri}api/file/uploadFiles`, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Accept: "/",
      "accept-encoding": "gzip, deflate",
    },
    body: Data,

  });

export const doGetUploadDocumentApi = (rutUsuario, rutTrabajador, idPrestacion) =>
  fetch(`${apiConfig.apiUri}api/file/documents/${rutUsuario}/${rutTrabajador}/${idPrestacion}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });
export const doDeleteFileApi = (data) =>
  fetch(`${apiConfig.apiUri}api/file/deleteFile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

export const doDeleteContainerApi = (data) =>
  fetch(`${apiConfig.apiUri}api/file/deleteContainer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

