import apiConfig from "../config/api";

const draftApi = `${apiConfig.apiUri}api/complaints/draft`;
const denunciaApi = `${apiConfig.apiUri}api/complaints`;
const getToken = () => localStorage.getItem("AccessToken");

export const GetDenunciasApi = (header) =>
  fetch(`${denunciaApi}/company`, {
    method: "GET",
    headers: {
      ...header,
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const GetDenunciasPendientesTrabajador = ({
  CompanyRut, Rut, FechaIni, FechaEnd,
}) =>
  fetch(`${denunciaApi}/pending`, {
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
      RutEmpresa: CompanyRut,
      RutTrabajador: Rut,
      FechaDenunciaInicio: FechaIni,
      FechaDenunciaFin: FechaEnd,
    },
  });

export const GetDraftComplains = (companyRut, RutUsuario) =>
  fetch(`${draftApi}/${companyRut}/${RutUsuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
  });

export const CreateDraftComplains = (Data) =>
  fetch(`${draftApi}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: `EmployeeRut=${Data.Rut}&CompanyRut=${Data.CompanyRut}&JsonData=${Data.jsonData}&UserRut=${Data.UserRut}`,
    credentials: "same-origin",
  });

export const UpdateDraftComplaint = (Data) =>
  fetch(`${draftApi}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    body: `EmployeeRut=${Data.Rut}&CompanyRut=${Data.CompanyRut}&JsonData=${Data.jsonData}&UserRut=${Data.UserRut}`,
    credentials: "same-origin",
  });

export const DeleteDraftComplaint = (idComplaint) =>
  fetch(`${draftApi}/delete/${idComplaint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "same-origin",
  });
