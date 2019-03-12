import { requestPasswordApi, sendApi, validateTokenApi, changePassApi } from "../../../services/passRecoveryApi";
import { openCloseToast } from "../../Global/actions";

export const changeStep = (newStep) => ({
  type: 'CHANGE_STEP',
  newStep
}) 

export const enableNext = () => ({
  type: 'ENABLE_NEXT',
})

export const disableNext = () => ({
  type: 'DISABLE_NEXT',
})

export const loading = (isLoading) => ({
  type: 'LOADING_RECUPERAR_PASSWORD',
  isLoading,
})

export const resetState = () => ({
  type: 'RESET_STATE',
})

export const setUserOptions = ({Email, CellPhoneNumber, IsTemporalUser}) => ({
  type: 'SET_USER_OPTIONS',
  Email,
  CellPhoneNumber,
  IsTemporalUser,
})

export const setCodeError = (error) => ({
  type: 'SET_CODE_ERROR',
  error
})

export const setUserInfoError = (error) => ({
  type: 'SET_INFO_USER_ERROR',
  error,
})

export const doGetUserOptions = (user) =>  async (dispatch) => {
  dispatch(loading(true));
  try {
    const options = await requestPasswordApi(user);
    if (options.status === 200) {
      const result = await options.json();
      if (result.Success && result.UserInfo !== null) {
        dispatch(setUserOptions(result.UserInfo));
        dispatch(changeStep(1));
      } else {
        dispatch(setUserInfoError("Usuario invalido. comprueba el rut o mail."));
      }
    } else {  
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al obtener opciones",
        typeStyle: "error",
      }));
    }
  } catch (error) {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error al obtener opciones",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
}

export const doSendCode = (selected, email, isTemporal) => async (dispatch) => {
  dispatch(loading(true));
  try {
    let type = 'SMS';
    if (selected.indexOf('@') !== -1) type = 'EMAIL'

    const response = await sendApi({ email, isTemporal, type });
    if (response.status === 200) {
      dispatch(changeStep(2));
    } else {
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al enviar el codigo",
        typeStyle: "error",
      }));
    }
  } catch (error) {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error al enviar el codigo",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
}

export const doValidateCode = (code, email) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await validateTokenApi({email, token: code});
    if (response.status === 200) {
      const result = await response.json();
      if (result.IsValid) {
        dispatch(changeStep(3));
      }
    } else {
      dispatch(setCodeError(true));
    }
  } catch {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error al validar el codigo",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
}

export const doChangePassword = ({email, code, isTemporal, pass, passConfirmation}) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await changePassApi({
      email, token: code, isTemporal, pass, passConfirmation
    });
    if (response.status === 200) {
      dispatch(changeStep(4));
    } else {
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al cambiar la contraseña",
        typeStyle: "error",
      }));
    }
  } catch {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error al cambiar la contraseña",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
}