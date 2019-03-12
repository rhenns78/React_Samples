import jwt from "jsonwebtoken";
import trace from "../../../helpers/trace";
import { ActualizarDatosUsuario, loading, openCloseToast, setUserFunctionalities, sendEmailApp } from "../../Global/actions";


import { LoginUserApi, ValidateTokenApi, LoginUserTempApi, GetEmailTokenApi, RefreshTokenApi } from "../../../services/loginApi";
import { validateRutApi, validateEmailApi, validateEmailTemp, validateRutTemp } from "../../../services/registroApi";
import { push } from "connected-react-router";
import { paths } from "../../../config/routes";

import validaciones from "../../../helpers/validaciones";
import { getUserFunctionalitiesApi } from "../../../services/funcionalidadesApi";
// import { doGetTokenJwt } from "../../Header/Notificaciones/actions";


export const setDataLogin = (data) => ({
  type: "SET_DATA_LOGIN",
  data,
});
export const setDataActiveUser = (activeUser) => ({
  type: "SET_DATA_ACTIVE_USER",
  activeUser,
});
export const setMessageLogin = (message) => ({
  type: "SET_MESSAGE_LOGIN",
  message,
});

export const resetLoginState = () => ({
  type: "RESET_LOGIN_STATe",
});

export const showPassInput = (show, isAccountTemp) => ({
  type: "SET_SHOW_PASS",
  show,
  isAccountTemp,
});

export const disableButton = (disable) => ({
  type: "DISABLE_BUTTON",
  disable,
});

export const accountIsActive = (isActive) => ({
  type: "ACCOUNT_IS_ACTIVE",
  isActive,
});

export const doLoginTemp = (loginData) => async (dispatch) => {
  trace.information("Fallo loginAD, pregunto en loginTemp");

  if (loginData.AuthType === "RUN") {
    loginData.Username = validaciones.formatRut(loginData.Username, { showDots: false, showHyphen: true });
  }

  const responseTemp = await LoginUserTempApi(loginData);
  if (responseTemp.status === 200) {
    const resultTemp = await responseTemp.json();
    if (resultTemp.Success) {
      resultTemp.User.AccessToken = null;
      resultTemp.User.RefreshToken = null;
      resultTemp.User.LoginSuccess = true;
      resultTemp.User.TempBD = true;
      resultTemp.User.DateLogIn = new Date();
      // Guardar la data en el localstorge, actualizar UserData del estado global agregando el flag UserTemp = true

      const token = jwt.sign(resultTemp.User, "secret", {
        expiresIn: "15m",
      });
      localStorage.setItem("token", token);
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");

      dispatch(ActualizarDatosUsuario(resultTemp.User));
      dispatch(resetLoginState());
    } else {
      dispatch(showPassInput(true));
      dispatch(disableButton(true));
      dispatch(setMessageLogin("Ingreso inválido, comprueba la contraseña"));
    }
  } else {
    dispatch(showPassInput(true));
    dispatch(disableButton(true));
    dispatch(setMessageLogin("Ingreso inválido, comprueba la contraseña"));
  }
};

export const getDataUserAd = async (result) => {
  const userData = {};
  const responseRut = await validateRutApi(result.RUT);

  let resultRut = null;
  if (responseRut.ok) {
    resultRut = await responseRut.json();
    const array = resultRut.User.FullName.split(" ");
    userData.FirstName = array[0];
    userData.LastName = array[1];
  }
  return userData;
};

export const doResendActivation = (userData, loginData) => async (dispatch) => {
  dispatch(loading(true));
  try {
    let email;
    if (userData.SignInNameType === "emailAddress") {
      email = userData.SignInNameValue;
    } else if (loginData.AuthType === "EMAIL") {
      email = loginData.UserName;
    }

    const response = await GetEmailTokenApi(email);
    if (response.status === 200) {
      const result = await response.json();
      if (result.Success) {
        const responseEmail = await validateEmailApi(email);
        if (responseEmail.status === 200) {
          const hostname = window && window.location && window.location.hostname;
          const uriMail = hostname === "localhost" ? "http://localhost:3001" : hostname;

          const href = `${uriMail}/activarCuenta/${result.EmailToken}`;
          const parametersMail = {};
          const resultMail = await responseEmail.json();
          parametersMail.userInfo = {
            FirstName: resultMail.User.FullName,
            LastName: "",
            Email: resultMail.User.SignInNameValue,
            Rut: resultMail.User.Rut,
            href,
          };
          parametersMail.templateMail = "activaUsuario";
          await dispatch(sendEmailApp(parametersMail));
        } else {
          dispatch(openCloseToast({
            isToastOpen: true,
            typeStyle: "error",
            msgToast: "No se ha podido enviar el correo",
          }));
        }


        //
        // await dispatch(doSendMailUser({
        //   FirstName: userData.FullName,
        //   LastName: "",
        //   Email: email,
        //   Rut: "",
        // }, result.EmailToken, true));
      }
    }
  } catch (e) {
    dispatch(openCloseToast({
      isToastOpen: true,
      typeStyle: "error",
      msgToast: "Error al Reenviar el correo de activacion",
    }));
  }
  dispatch(loading(false));
};

export const doValidation = (loginData) => async (dispatch) => {
  dispatch(loading(true));
  try {
    let response;
    let responseTemp;
    if (loginData.AuthType === "EMAIL") {
      response = await validateEmailApi(loginData.Username);
      responseTemp = await validateEmailTemp(loginData.Username);
    } else {
      const rut = validaciones.formatRut(loginData.Username, { showDots: false, showHyphen: true });
      response = await validateRutApi(rut);
      responseTemp = await validateRutTemp(rut);
    }
    if (response.status === 200) {
      const result = await response.json();
      if (result.Success) {
        if (result.User.AccountEnabled === false) {
          // account not active
          dispatch(setDataActiveUser(result.User));
          dispatch(showPassInput(true));
          dispatch(disableButton(false));
          dispatch(accountIsActive(false));
        } else {
          // account is AD
          dispatch(showPassInput(true, false));
          dispatch(disableButton(true));
        }
      } else if (responseTemp.status === 200) {
        const resultTemp = await responseTemp.json();
        if (resultTemp.Success) {
          // account is TEMP
          dispatch(showPassInput(true, true));
          dispatch(disableButton(true));
        } else {
          dispatch(showPassInput(false, false));
          dispatch(disableButton(true));
          dispatch(setMessageLogin("Ingreso inválido, comprueba el rut o mail"));
        }
      } else {
        dispatch(showPassInput(false, false));
        dispatch(disableButton(true));
        dispatch(setMessageLogin("Ingreso inválido, comprueba el rut o mail"));
      }
    } else {
      dispatch(showPassInput(false, false));
      dispatch(disableButton(true));
      dispatch(setMessageLogin("Ingreso inválido, comprueba el rut o mail"));
    }
  } catch (e) {
    dispatch(showPassInput(false, false));
    dispatch(disableButton(true));
    dispatch(setMessageLogin("Ingreso inválido, comprueba el rut o mail"));
  }
  dispatch(loading(false));
};


export const doLogin = (loginData) => async (dispatch) => {
  dispatch(loading(true));
  const toast = {};
  try {
    trace.information("Inicio Login con datos");

    if (loginData.AuthType === "RUN") {
      loginData.Username = validaciones.formatRut(loginData.Username, { showDots: false, showHyphen: true });
    }

    const response = await LoginUserApi(loginData);
    const result = await response.json();

    if (response.status === 200) {
      if (result.LoginSuccess) {
        const tokenInfo = jwt.decode(result.AccessToken);
        result.RUT = tokenInfo.extension_RUN;
        result.Email = tokenInfo.emails[0];
        tokenInfo.given_name && localStorage.setItem("FirstName", tokenInfo.given_name);
        tokenInfo.family_name && localStorage.setItem("LastName", tokenInfo.family_name);

        localStorage.setItem("AccessToken", result.AccessToken);
        localStorage.setItem("RefreshToken", result.RefreshToken);
        localStorage.removeItem("token");

        result.FirstName = tokenInfo.given_name;
        result.LastName = tokenInfo.family_name;
        result.TempBD = false;

        dispatch(getUserFunctionalities(result.RUT));
        dispatch(ActualizarDatosUsuario(result));
        dispatch(resetLoginState());


        // llamo get token jwt para enviar a signalr
        // dispatch(doGetTokenJwt(result.Email));
      } else {
        dispatch(setMessageLogin("Ingreso inválido, comprueba la contraseña"));
      }
    } else if (response.status === 403) {
      dispatch(setMessageLogin("El usuario se encuentra bloqueado temporalmente"));
    } else {
      if (result.PendingAttemps) {
        const msg = result.PendingAttemps === 1 ? "Aún le queda 1 intento" : `Aun le quedan ${result.PendingAttemps} intentos`;
        dispatch(setMessageLogin(`${result.Message}. ${msg}`));
      } else {
        dispatch(setMessageLogin(`${result.Message}`));
      }
      // {"PendingAttemps":2,"Message":"Contraseña incorrecta. Inténtalo de nuevo o restablece la contraseña"}
    }
  } catch (error) {
    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión, intente mas tarde";
    toast.typeStyle = "error";

    dispatch(openCloseToast(toast));
  }
  dispatch(loading(false));
};

export const getUserFunctionalities = (userRut) => async (dispatch) => {
  try {
    const response = await getUserFunctionalitiesApi(userRut);
    if (response.status === 200) {
      const result = await response.json();
      const ids = [];
      if (result.Success) {
        if (Array.isArray(result.Menu.Functionalities)) {
          result.Menu.Functionalities.forEach((func) => {
            ids.push(func.Code.trim());
          });
        }
      }
      // ACCESSO a MANTENEDORES ROLES
      // ids.push("FUN_MI_PERFIL", "FUN_MIS_DATOS", "FUN_SOLICITUDES_PEN", "FUN_MANTENEDORES", "FUN_ROLES", "FUN_PERFILES", "FUN_MI_EMPRESA", "FUN_APROBAR_SOLICIT", "FUN_DATOS_EMPRESA", "FUN_ASIGNAR_ROLES");
      dispatch(setUserFunctionalities(ids));
    } else {
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al obtener las funcionalidades",
        typeStyle: "error",
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

export const validateToken = () => async (dispatch) => {
  dispatch(loading(true));
  try {
    const token = localStorage.getItem("token");
    let AccessToken = localStorage.getItem("AccessToken");
    let RefreshToken = localStorage.getItem("RefreshToken");

    if (AccessToken !== null && RefreshToken !== null && token == null) {
      const response = await ValidateTokenApi(AccessToken);
      if (response.status === 200) {
        const result = await response.json();
        let RUT;
        let Email;
        const FirstName = localStorage.getItem("FirstName");
        let LastName = localStorage.getItem("LastName");

        if (LastName === "null") {
          LastName = null;
        }
        if (result.IsValid) {
          const tokenInfo = jwt.decode(AccessToken);
          RUT = tokenInfo.extension_RUN;
          Email = tokenInfo.emails[0];
          const refreshRequest = await RefreshTokenApi(RefreshToken);
          if (refreshRequest.status === 200) {
            const refreshResult = await refreshRequest.json();
            localStorage.setItem("AccessToken", refreshResult.AccessToken);
            localStorage.setItem("RefreshToken", refreshResult.RefreshToken);
            AccessToken = refreshResult.AccessToken;
            RefreshToken = refreshResult.RefreshToken;
          }

          dispatch(getUserFunctionalities(RUT));
          dispatch(ActualizarDatosUsuario({
            AccessToken,
            LoginSuccess: true,
            FirstName,
            LastName,
            RefreshToken,
            RUT,
            Email,
            TempBD: false,
          }));
        }
      } else {
        dispatch(logout());
      }
    } else if (token !== null && AccessToken == null && RefreshToken == null) {
      const {
        RUT,
        FirstName,
        Email,
        CellPhoneNumber,
        LastName,
        DateLogin,
      } = jwt.verify(token, "secret");

      dispatch(ActualizarDatosUsuario({
        AccessToken: null,
        LoginSuccess: true,
        RefreshToken: null,
        RUT,
        CellPhoneNumber,
        Email,
        FirstName,
        LastName,
        DateLogin,
        TempBD: true,
      }));
    }
  } catch (error) {
    console.log("sesion expirada", error);
  }
  dispatch(loading(false));
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("AccessToken");
  localStorage.removeItem("RefreshToken");

  dispatch(push(paths.root));

  dispatch(ActualizarDatosUsuario({
    AccessToken: null,
    LoginSuccess: false,
    RefreshToken: null,
    RUT: null,
    Email: null,
    CellPhoneNumber: null,
    FirstName: null,
    LastName: null,
    TempBD: false,
    DateLogIn: null,
  }));
};

export const doRefreshToken = (userData, refreshToken, resetTimerCallback) => async (dispatch) => {
  try {
    const request = await RefreshTokenApi(refreshToken);
    if (request.status === 200) {
      const result = await request.json();
      if (result.LoginSuccess) {
        localStorage.setItem("AccessToken", result.AccessToken);
        localStorage.setItem("RefreshToken", result.RefreshToken);

        const newUserData = { ...userData, ...result };
        dispatch(ActualizarDatosUsuario(newUserData));
        resetTimerCallback();
      }
    }
  } catch (e) {
    console.error(e);
  }
};
