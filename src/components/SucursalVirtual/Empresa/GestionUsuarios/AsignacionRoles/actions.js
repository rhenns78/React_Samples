
import trace from "../../../../../helpers/trace";
import { openCloseToast } from "../../../../Global/actions";

import { allRolesByProfileId, createUserByRol,
  deleteRolesByUser, overrideRolesForUser, getEmplyeesByCompanyRut } from "../../../../../services/userRolesApi";

export const loading = (isLoading) => ({
  type: "LOADING_ASIGNAR_ROLES",
  isLoading,
});

export const setRoles = (roles) => ({
  type: "SET_ROLES",
  roles,

});

export const setEmployees = (employees) => ({
  type: "SET_EMPLOYESS",
  employees,
});

export const setRolesFilter = (filter) => ({
  type: "SET_ROLES_FILTER",
  filter,
});

export const getRolesByProfileId = (idProfile) => async (dispatch) => {
  trace.information("consumo servicio para resactar roles segun Perfil");
  dispatch(loading(true));
  const toast = {};
  try {
    const response = await allRolesByProfileId(idProfile);
    const result = await response.json();
    if (response.ok) {
      if (result.Success) {
        const names = [];
        result.Data.forEach((rol) => {
          names.push({ text: rol.Name, value: rol.Name });
        });
        dispatch(setRolesFilter(names));
        dispatch(setRoles(result.Data));
      } else {
        toast.isToastOpen = true;
        toast.msgToast = "No existen Roles validos";
        toast.typeStyle = "error";
        dispatch(openCloseToast(toast));
      }
    } else {
      toast.isToastOpen = true;
      toast.msgToast = "Serivicio no responde";
      toast.typeStyle = "error";
      dispatch(openCloseToast(toast));
    }
  } catch (error) {
    trace.information("ERROR", error);
    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión, intente mas tarde";
    toast.typeStyle = "error";
    dispatch(openCloseToast(toast));
  }
  dispatch(loading(false));
};

export const getUserByComanyId = (companyId) => async (dispatch) => {
  dispatch(loading(true));
  const toast = {};
  try {
    const response = await getEmplyeesByCompanyRut(companyId);
    const result = await response.json();
    if (response.ok) {
      // console.log("data:>", result.Employees);
      await dispatch(setEmployees(result.Employees));
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    trace.information("ERROR", error);
    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión, intente mas tarde";
    toast.typeStyle = "error";
    dispatch(openCloseToast(toast));
  }
  dispatch(loading(false));
};

export const addRolesToUser = ({
  Rut, RelationTypeCode, CompanyRut, idRoles,
}) => async (dispatch) => {
  dispatch(loading(true));
  const toast = {};
  try {
    const response = await overrideRolesForUser(Rut, RelationTypeCode, CompanyRut, idRoles);
    const result = await response.json();
    if (response.ok) {
      if (result.Success) {
        dispatch(getUserByComanyId(CompanyRut));
        toast.isToastOpen = true;
        toast.msgToast = "Rol asignado";
        toast.typeStyle = "success";
        dispatch(openCloseToast(toast));
      }
    } else {
      toast.isToastOpen = true;
      toast.msgToast = result.Message;
      toast.typeStyle = "error";
      dispatch(openCloseToast(toast));
    }
  } catch (error) {
    trace.information("ERROR", error);
    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión, intente mas tarde";
    toast.typeStyle = "error";
    dispatch(openCloseToast(toast));
  }
  dispatch(loading(false));
};

export const deleteRolesToUser = (data) => async (dispatch) => {
  dispatch(loading(true));
  const toast = {};
  try {
    const response = await deleteRolesByUser(data);
    const result = await response.json();
    if (response.ok) {
      if (result.Success) {
        toast.isToastOpen = true;
        toast.msgToast = "Eliminacion de roles";
        toast.typeStyle = "success";
        dispatch(openCloseToast(toast));
      }
    } else {
      toast.isToastOpen = true;
      toast.msgToast = result.Message;
      toast.typeStyle = "error";
      dispatch(openCloseToast(toast));
    }
  } catch (error) {
    trace.information("ERROR", error);
    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión, intente mas tarde";
    toast.typeStyle = "error";
    dispatch(openCloseToast(toast));
  }
  dispatch(loading(false));
};

export const addUsersToRol = ({ IdRol, CompanyRut, users }) => async (dispatch) => {
  dispatch(loading(true));
  const toast = {};
  try {
    const response = await createUserByRol(IdRol, CompanyRut, users);
    const result = await response.json();
    if (response.ok) {
      if (result.Success) {
        dispatch(getUserByComanyId(CompanyRut));
        toast.isToastOpen = true;
        toast.msgToast = "Rol asignado a usuarios seleccionados";
        toast.typeStyle = "success";
        dispatch(openCloseToast(toast));
      }
    } else {
      toast.isToastOpen = true;
      toast.msgToast = result.Message;
      toast.typeStyle = "error";
      dispatch(openCloseToast(toast));
    }
  } catch (error) {
    trace.information("ERROR", error);
    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión, intente mas tarde";
    toast.typeStyle = "error";
    dispatch(openCloseToast(toast));
  }
  dispatch(loading(false));
};

