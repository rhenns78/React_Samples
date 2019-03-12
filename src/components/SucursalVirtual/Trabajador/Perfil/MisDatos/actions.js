
import trace from "../../../../../helpers/trace";
import { openCloseToast, setPreventNavigation, getLists, getSucursales, ActualizarDatosUsuario } from "../../../../Global/actions";
import { getUserInfo, editUserInfo, getCompany, getCompanies, updateMailUser, changePassword } from "../../../../../services/misDatosApi";


import validaciones from "../../../../../helpers/validaciones";
import { validateEmailApi, validateEmailTemp } from "../../../../../services/registroApi";

// import Perfil from "./profile.json";

// Action Creators
export const setMyData = (profile) => ({
  type: "SET_MY_DATA",
  profile,
});


export const LoadingData = (isLoading) => ({
  type: "LOADING_DATA",
  isLoading,
});

export const setValidateMail = (NewEmail) => ({
  type: "SET_NEW_MAIL",
  NewEmail,
});
export const IsMailChanged = (mailChanged) => ({
  type: "IS_MAIL_CHANGE",
  mailChanged,

});

export const setFamilyMember = (familyMember) => ({
  type: "SET_FAMILY_MEMBER",
  familyMember,

});
export const resetMisDatosState = () => ({
  type: "RESET_MIS_DATOS_STATE",


});


export const formatForm = (data) => {
  let profile = {};
  profile = data;
  profile.Rut = validaciones.formatRut(data.Rut, { showDots: true, showHyphen: true });
  return profile;
};


export const callListMyData = (rutUsuario, lista) => async (dispatch) => {
  dispatch(LoadingData(true));
  await dispatch(getLists(lista));
  dispatch(LoadingData(false));
};

export const callSucursales = (companyId) => async (dispatch) => {
  dispatch(LoadingData(true));

  await dispatch(getSucursales(companyId));

  dispatch(LoadingData(false));
};


export const getMyData = (rutUsuario) => async (dispatch) => {
  trace.information("consumo servicio para resactar roles segun Perfil");
  dispatch(LoadingData(true));
  const toast = {};
  try {
    let profile = {};

    const response = await getUserInfo(rutUsuario);
    const result = await response.json();

    if (response.ok) {
      if (result.Success) {
        const responseCompany = await getCompany(rutUsuario);

        const resultCompany = await responseCompany.json();

        profile = formatForm(result.Profile);

        if (resultCompany.Success) {
          profile.Company = resultCompany.Company;
        } else {
          profile.Company = [];
        }
        const responseCompanies = await getCompanies(rutUsuario);

        const resulCompanies = await responseCompanies.json();
        if (resulCompanies.Success) {
          profile.Companies = resulCompanies.Companies;
        } else {
          profile.Companies = [];
        }

        await dispatch(setMyData(profile));
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
  dispatch(LoadingData(false));
};


export const updateMyData = (oldProfile) => async (dispatch) => {
  dispatch(LoadingData(true));
  const toast = {};
  try {
    const newProfile = { ...oldProfile };

    newProfile.Rut = validaciones.formatRut(newProfile.Rut, { showDots: false, showHyphen: true });
    trace.information("Modificar Usuario");
    const response = await editUserInfo(newProfile);
    const result = await response.json();

    if (response.status === 200) {
      if (result.Success) {
        toast.isToastOpen = true;
        toast.msgToast = "Se han guardado las modificaciones";
        toast.typeStyle = "success";
        dispatch(setPreventNavigation(false));
        dispatch(IsMailChanged(false));
        dispatch(openCloseToast(toast));
        dispatch(getMyData(newProfile.Rut));
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
  dispatch(LoadingData(false));
};

export const mailValidation = (mail) => async (dispatch) => {
  trace.information("Validacion Email antes de cambiarlo");
  dispatch(LoadingData(true));
  const toast = {};

  let validEmailApi;
  let validEmailTemp;
  const responseEmail = await validateEmailApi(mail.toLowerCase());
  const resultEmailApi = await responseEmail.json();
  const responseEmailTemp = await validateEmailTemp(mail.toLowerCase());
  const resultEmailTemp = await responseEmailTemp.json();


  if (responseEmail.status === 200) {
    if (resultEmailApi.User && resultEmailApi.User.SignInNameValue === mail) {
      validEmailApi = true;
    } else {
      validEmailApi = false;
    }
  } else {
    // si el servicio falla, debo enviar mensaje de que intente mas tarde

    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión, intente mas tarde";
    toast.typeStyle = "error";
    dispatch(openCloseToast(toast));
    validEmailApi = true;
  }
  if (responseEmailTemp.status === 200) {
    if (resultEmailTemp.User && resultEmailTemp.User.Email === mail) {
      validEmailTemp = true;
    } else {
      validEmailTemp = false;
    }
  } else {
    // si el servicio falla, debo enviar mensaje de que intente mas tarde
    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión, intente mas tarde";
    toast.typeStyle = "error";
    dispatch(openCloseToast(toast));
    validEmailTemp = true;
  }


  if (validEmailTemp === true || validEmailApi === true) {
    dispatch(IsMailChanged(false));
  } else {
    dispatch(IsMailChanged(true));
  }

  dispatch(LoadingData(false));
};

export const doChangedMail = (Profile, NewEmail, mailChanged, UserInfo) => async (dispatch) => {
  dispatch(LoadingData(true));
  const toast = {};
  if (mailChanged) {
    trace.information("Cambio de correo usuario");


    const newProfile = { ...Profile };
    newProfile.Email = mailChanged ? NewEmail : Profile.Email;
    UserInfo.Email = mailChanged ? NewEmail : UserInfo.Email;

    const responseChangeMail = await updateMailUser(Profile.Email, NewEmail);
    if (responseChangeMail.status === 200) {
      dispatch(setMyData(newProfile));
      dispatch(ActualizarDatosUsuario(UserInfo));
      trace.information("dejar changeMail =>false");
      dispatch(IsMailChanged(false));
      toast.isToastOpen = true;
      toast.msgToast = "Cambio de correo Realizada";
      toast.typeStyle = "success";
      dispatch(openCloseToast(toast));
    }
    if (responseChangeMail.status === 300) {
      toast.isToastOpen = true;
      toast.msgToast = "Email ya existe en nuestros registros";
      toast.typeStyle = "warning";
      dispatch(setMyData(Profile));
      dispatch(ActualizarDatosUsuario(UserInfo));
      dispatch(openCloseToast(toast));
    }
    if (responseChangeMail.status === 500) {
      toast.isToastOpen = true;
      toast.msgToast = "Error de conexión, intente mas tarde";
      toast.typeStyle = "error";
      dispatch(openCloseToast(toast));
    }
  }
  dispatch(LoadingData(false));
};

export const doChangePassword = (Data) => async (dispatch) => {
  trace.information("Entro a cambiar Password");
  dispatch(LoadingData(true));
  const toast = {};
  try {
    // console.log("data:>", Data)
    const response = await changePassword(Data);
    if (response.status === 200) {
      toast.isToastOpen = true;
      toast.msgToast = "Cambio de contraseña realizada";
      toast.typeStyle = "success";
      dispatch(openCloseToast(toast));
    } else {
      toast.isToastOpen = true;
      toast.msgToast = "Error en cambiar password";
      toast.typeStyle = "error";
      dispatch(openCloseToast(toast));
    }
  } catch (error) {
    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión, intente mas tarde";
    toast.typeStyle = "error";
    dispatch(openCloseToast(toast));
  }
  dispatch(LoadingData(false));
};
