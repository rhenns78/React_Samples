import { openCloseToast, doFindCompanies } from "../../../../Global/actions";
import { getAssignedCompanies, getAllCompanies, assignCompany, deleteCompany } from "../../../../../services/EmpresasAutoasignadasApi";

export const loading = (isLoading) => ({
  type: "LOADING_AUTOASIGNACIONES",
  isLoading,
});

export const setEmpresasAchs = (companies) => ({
  type: "SET_EMPRESAS_ACHS",
  companies,
});

export const updateAssignedCompanies = (update) => ({
  type: "UPDATE_ASSIGNED_COMPANIES",
  update,
});

export const updateAllCompanies = (update) => ({
  type: "UPDATE_ALL_COMPANIES",
  update,
});

export const setAllCompanies = (companies) => ({
  type: "SET_ALL_COMPANIES",
  companies,
});

export const openCloseModalAgregar = (isOpen) => ({
  type: "OPEN_CLOSE_MODAL_AGREGAR_EMPRESAS",
  isOpen,
});

export const openCloseModalEliminarEmpresa = (isOpen) => ({
  type: "OPEN_CLOSE_MODAL_ELIMINAR_EMPRESA",
  isOpen,
});

export const setSelectedCompanies = (companies) => ({
  type: "SET_SELECTED_COMPANIES",
  companies,
});

export const doGetEmpresasAchs = () => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await getAssignedCompanies();
    if (request.status === 200) {
      const result = await request.json();
      dispatch(setEmpresasAchs(result.SelfAssignments));
    }
  } catch (e) {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente más tarde",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

export const doGetAllCompanies = () => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await getAllCompanies();
    if (request.status === 200) {
      const result = await request.json();
      dispatch(setAllCompanies(result.Companies));
    }
  } catch (e) {
    console.error(e);
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente más tarde",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

export const doDeleteCompanies = (userRut, companies, closeModalCallback) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const items = companies.map((c) => ({
      UserRolId: c.UserRolId,
      CompanyRut: c.CompanyRut,
    }));
    const request = await deleteCompany(items);
    if (request.status === 200) {
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Se han eliminado las empresas con éxito",
        typeStyle: "success",
      }));
      closeModalCallback();
      dispatch(doFindCompanies(userRut));
      dispatch(updateAllCompanies(true));
      dispatch(updateAssignedCompanies(true));
    }
  } catch (e) {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente más tarde",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

export const doAddCompanies = (userRut, companies, closeModalCallback) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const ruts = companies.map((c) => c.CompanyRut);
    const request = await assignCompany(ruts);
    if (request.status === 200) {
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Se han agregado las empresas con éxito",
        typeStyle: "success",
      }));
      closeModalCallback();
      dispatch(doFindCompanies(userRut));
      dispatch(updateAllCompanies(true));
      dispatch(updateAssignedCompanies(true));
    }
  } catch (e) {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente más tarde",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};
