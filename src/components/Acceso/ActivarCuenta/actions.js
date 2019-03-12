
import trace from "../../../helpers/trace";
// import { store } from "../../../config/store";
import { loading, openCloseToast } from "../../Global/actions";
import { validateActiveToken } from "../../../services/registroApi";
import { setPasswordOnActivation } from "../../../services/passRecoveryApi";
// import { push } from "connected-react-router";
// import { paths } from "../../../config/routes";

// Action Creators
export const setValidAccess = (accessValid) => ({
  type: "SET_VALID_ACCESS",
  accessValid,
});

export const passCreated = (created) => ({
  type: "PASS_CREATED",
  created
})

export const userActivate = (token) => async (dispatch) => {
  dispatch(loading(true));
  const toast = {};


  try {
    trace.information("Inicio Login con datos");

    const response = await validateActiveToken(token);
    const result = await response.json();
    if (response.status === 200) {
      if (result.Success) {
        trace.information("Se activo el usuario!");
        toast.isToastOpen = true;
        toast.msgToast = "Usuario Activado";
        toast.typeStyle = "success";
        dispatch(openCloseToast(toast));
        // dispatch(push(paths.root));
      }
    } else if (response.status === 400) {
      toast.isToastOpen = true;
      toast.msgToast = result.Message;
      toast.typeStyle = "error";
      dispatch(openCloseToast(toast));
    } else {
      toast.isToastOpen = true;
      toast.msgToast = "Error, no ha sido efectiva la activación";
      toast.typeStyle = "error";
      dispatch(openCloseToast(toast));
    }
  } catch (error) {
    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión, intente mas tarde";
    toast.typeStyle = "error";

    dispatch(openCloseToast(toast));
  }
  dispatch(loading(false));
};

export const doCreatePass = (token, pass, passRepeat) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await setPasswordOnActivation(token, pass, passRepeat);
    if (response.status === 200) {
      dispatch(passCreated(true));
    } else {
      dispatch(passCreated(false));
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al crear la contraseña",
        typeStyle: "error",
      }));
    }
  } catch (e) {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error al crear la contraseña",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
}
