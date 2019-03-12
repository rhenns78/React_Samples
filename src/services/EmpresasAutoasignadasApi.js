import apiConfig from "../config/api";
import { get, post, requestDelete } from "../helpers/request";

const autoasignApi = `${apiConfig.apiUri}api/accessmanagement/selfassignment`;

export const getAssignedCompanies = (params) => get(`${autoasignApi}/get`, { params });

export const getAllCompanies = (params) => get(`${autoasignApi}/get/companies`, { params });

export const assignCompany = (companies) =>
  post(`${autoasignApi}/create`, {
    body: JSON.stringify({
      CompanyRuts: companies,
    }),
  });

export const deleteCompany = (companies) =>
  requestDelete(`${autoasignApi}/delete`, {
    body: JSON.stringify({
      Assignments: companies,
    }),
  });
