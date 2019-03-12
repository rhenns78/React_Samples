import { openCloseToast } from "../../../../Global/actions";
import { deleteProfileApi, updateProfileApi, createProfileApi } from "../../../../../services/perfilesApi";
import { getPerfiles, loading } from "../../General/actions";

export const doCreatePerfil = (name, description) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await createProfileApi(name, description);
    if (request.status === 200) {
      dispatch(getPerfiles());
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Perfil creado con exito",
        typeStyle: "success",
      }));
    } else {
      dispatch(getPerfiles());
      const res = await request.json();
      if (request.status === 403) {
        dispatch(openCloseToast({
          isToastOpen: true,
          msgToast: res.Message,
          typeStyle: "warning",
        }));
      } else {
        dispatch(openCloseToast({
          isToastOpen: true,
          msgToast: res.Message,
          typeStyle: "error",
        }));
      }
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al crear el perfil",
        typeStyle: "error",
      }));
    }
  } catch (e) {
    console.error(e);
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión al crear el perfil",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

export const doUpdatePerfil = (idPerfil, name, description, active) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await updateProfileApi(idPerfil, name, description, active);
    if (request.status === 200) {
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Perfil guardado con exito",
        typeStyle: "success",
      }));
    } else {
      dispatch(getPerfiles());
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al guardar el perfil",
        typeStyle: "error",
      }));
    }
  } catch (e) {
    console.error(e);
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión al guardar el perfil",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

export const doDeletePerfil = (idPerfil) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await deleteProfileApi(idPerfil);
    if (request.status === 200) {
      dispatch(getPerfiles());
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Perfil eliminado con exito",
        typeStyle: "success",
      }));
    } else {
      dispatch(getPerfiles());
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al eliminar el perfil",
        typeStyle: "error",
      }));
    }
  } catch (e) {
    console.error(e);
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión al eliminar el perfil",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};
