import { loading, getRoles, setSelectedFuncionalities, setMantenedor } from "../../General/actions";
import { deleteRol, createRol, updateRol } from "../../../../../services/rolesApi";
import { openCloseToast } from "../../../../Global/actions";
import { getRolFunctionality, createRolFunctionalities, deleteRolFunctionalities, getAllFunctionalities } from "../../../../../services/funcionalidadesApi";


export const doDeleteRol = (idRol, deleteEvent) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const result = await deleteRol(idRol);
    if (result.status === 200) {
      await dispatch(getRoles());

      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Rol eliminado con exito",
        typeStyle: "success",
      }));
    } else {
      deleteEvent.cancel = true;
      await dispatch(getRoles());
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al eliminar el rol",
        typeStyle: "error",
      }));
    }
  } catch {
    deleteEvent.cancel = true;
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error al eliminar el rol",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

export const doCreateRol = (saveEvent) => async (dispatch, getState) => {
  dispatch(loading(true));
  try {
    const funcionalidades = getState().mantenedores.selectedFuncionalities;
    if (!funcionalidades.length) {
      saveEvent.cancel = true;
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Debe agregar funcionalidades para crear un Rol nuevo",
        typeStyle: "warning",
      }));
    } else {
      const result = await createRol(saveEvent.data.IdProfile, saveEvent.data.Name, saveEvent.data.Description);
      if (result.status === 200) {
        const rol = await result.json();
        saveEvent.data.Id = rol.IdRol;

        const req = await createRolFunctionalities(rol.IdRol, funcionalidades);
        if (req.status === 200) {
          await dispatch(getRoles());

          dispatch(openCloseToast({
            isToastOpen: true,
            msgToast: "Rol creado con exito",
            typeStyle: "success",
          }));
        } else {
          dispatch(openCloseToast({
            isToastOpen: true,
            msgToast: "Error al asignar las funcionalidades",
            typeStyle: "error",
          }));
        }
      } else {
        const resulroles = await result.json();
        await dispatch(getRoles());

        if (result.status === 403) {
          dispatch(openCloseToast({
            isToastOpen: true,
            msgToast: resulroles.Message,
            typeStyle: "warning",
          }));
        } else {
          dispatch(openCloseToast({
            isToastOpen: true,
            msgToast: resulroles.Message,
            typeStyle: "error",
          }));
        }
      }
    }
  } catch {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente más tarde.",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

export const doUpdateFunctionalities = (rowId, functionalityIds) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const result = await deleteRolFunctionalities(rowId);
    if (result.status === 200) {
      const create = await createRolFunctionalities(rowId, functionalityIds);
      if (create.status === 200) {
        dispatch(openCloseToast({
          isToastOpen: true,
          msgToast: "Rol actualizado con exito",
          typeStyle: "success",
        }));
      }
    } else {
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al actualizar las funcionalidades",
        typeStyle: "error",
      }));
    }
  } catch {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error al editar las funcionalidades del rol",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

export const doUpdateRol = (data) => async (dispatch) => {
  dispatch(loading(true));
  try {
    // const funcionalidades = getState().mantenedores.selectedFuncionalities
    const result = await updateRol(data.Id, data.IdProfile, data.Name, data.Description);
    if (result.status === 200) {
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Rol editado con exito",
        typeStyle: "success",
      }));
    } else {
      await dispatch(getRoles());
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al crear el rol",
        typeStyle: "error",
      }));
    }
  } catch (e) {
    console.log(e);
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error al editar el rol",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

export const doGetAllFunctionalities = () => async (dispatch) => {
  try {
    const request = await getAllFunctionalities();
    if (request.status === 200) {
      const result = await request.json();
      dispatch(setMantenedor({
        functionalities: result.Data,
      }));
    }
  } catch (e) {
    console.error(e);
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error al obtener las funcionalidades",
      typeStyle: "error",
    }));
  }
};

export const getRolFuncionalities = (idRol) => async (dispatch) => {
  try {
    const request = await getRolFunctionality(idRol);
    if (request.status === 200) {
      const result = await request.json();
      if (result.Success) {
        const ids = [];
        result.Data.forEach((id) => {
          ids.push(id.IdFunctionality);
        });
        dispatch(setSelectedFuncionalities(ids));
      } else {
        dispatch(setSelectedFuncionalities([]));
      }
    } else {
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al obtener las funcionalidades",
        typeStyle: "error",
      }));
    }
  } catch {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error al obtener las funcionalidades",
      typeStyle: "error",
    }));
  }
};
