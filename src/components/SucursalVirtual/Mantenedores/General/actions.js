import { openCloseToast } from "../../../Global/actions";
import { getAllRoles } from "../../../../services/rolesApi";
import { getAllProfiles } from "../../../../services/perfilesApi";

export const setMantenedor = (mantenedores) => ({
  type: "SET_MANTENEDOR_ROLES",
  mantenedores,
});
// nuevo llenado de listado roles
export const setRolesAndFilterList = (roles, filtrosTablaRoles) => ({
  type: "SET_ROLES_AND_FILTER_LIST",
  roles,
  filtrosTablaRoles,
});
// nuevo llenado de listado perfiles
export const setPerfilesAndFilterList = (perfiles, filtrosTablaPerfiles) => ({
  type: "SET_PERFILES_AND_FILTER_LIST",
  perfiles,
  filtrosTablaPerfiles,
});


export const loading = (isLoading) => ({
  type: "LOADING_MANTENEDORES",
  isLoading,
});

export const setSelectedFuncionalities = (func) => ({
  type: "SET_ROL_FUNCIONALITIES",
  func,
});

export const setEventDataRol = (eventDataRol) => ({
  type: "SET_EVENT_DATA_ROL",
  eventDataRol,
});


export const getPerfiles = () => async (dispatch) => {
  try {
    const perfiles = await getAllProfiles();
    if (perfiles.status === 200) {
      const result = await perfiles.json();
      dispatch(setPerfilesAndFilterList(result.Data, null));
      // dispatch(setMantenedor({
      //   perfiles: result.Data,
      // }));
    } else {
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al cargar los perfiles",
        typeStyle: "error",
      }));
    }
  } catch {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión al obtener perfiles",
      typeStyle: "error",
    }));
  }
};

export const getRoles = () => async (dispatch) => {
  dispatch(loading(true));
  try {
    const roles = await getAllRoles();
    if (roles.status === 200) {
      const result = await roles.json();
      dispatch(setRolesAndFilterList(result.Data, null));
      // dispatch(setMantenedor({
      //   roles: result.Data,
      // }));
    } else {
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al cargar los Roles",
        typeStyle: "error",
      }));
    }
  } catch (e) {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión al obtener los roles",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};
