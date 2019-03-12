
import trace from "../../../helpers/trace";
import { store } from "../../../config/store";

import { createSolicitudApi } from "../../../services/solicitudesApi";
import { loading, openCloseToast, sendEmailApp } from "../../Global/actions";

// Action Creators

export const cleanRequestCompanyId = () => ({
  type: "CLEAN_REQUEST_COMPANY_ID",
});


export const setMessageRutCompany = (messageRutCompany) => ({
  type: "SET_MESSAGE_RUT_COMPANY",
  messageRutCompany,
});
export const setValidRut = (rutValid) => ({
  type: "SET_VALID_RUT",
  rutValid,
});
export const setNumCompanyRequest = (numCompanyRequest) => ({
  type: "SET_NUM_COMPANY_REQUEST",
  numCompanyRequest,
});

export const doSendNewSolicitud = (UserInfo, rutEmpresa, description) => async (dispatch) => {
  dispatch(loading(true));
  try {
    trace.information("Inicio Ingreso solicitud");
    let validRut;

    const userTempState = store.getState().userTemp;
    const value = userTempState.numCompanyRequest + 1;
    if (value === 5) {
      dispatch(setMessageRutCompany("Ha Completado el número máximo de solicitudes"));
      return;
    }

    const response = await createSolicitudApi(UserInfo.Rut, rutEmpresa, description);
    const resultRut = await response.json();
    if (response.status === 200) {
      validRut = true;
      dispatch(setNumCompanyRequest(value));
      // ENVIO DE CORREO
      const parametersMail = {};
      parametersMail.userInfo = {
        FirstName: UserInfo.FirstName,
        LastName: UserInfo.LastName,
        Email: UserInfo.Email,
        Rut: UserInfo.Rut,
        rutEmpresa,
      };
      parametersMail.templateMail = "bienvenidaTemporal";
      await dispatch(sendEmailApp(parametersMail));
      dispatch(setValidRut(validRut));
    } else if (response.status === 400) {
      dispatch(setMessageRutCompany(resultRut.Message));
    } else {
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error de conexión intente mas tarde",
        typeStyle: "error",
      }));
    }
  } catch {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión intente mas tarde",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

