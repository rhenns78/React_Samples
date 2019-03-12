
import { openCloseToast, sendEmailApp } from "../../../../Global/actions";
import { getSolicitudesApi, deleteSolicitudApi } from "../../../../../services/AprobarSolicitudesApi";


import { createUserAdWithRolesApi, validateUserExist } from "../../../../../services/registroApi";
import { getRolIdByCode } from "../../../../../services/rolesApi";
import { createRolesForUserAndCompany } from "../../../../../services/userRolesApi";
import { deleteSolicitudADApi } from "../../../../../services/solicitudesApi";
// deleteSolicitudADApi

export const loading = (isLoading) => ({
  type: "LOADING_APROBAR_SOLUCITUDES",
  isLoading,
});


export const setSolicitudes = (solicitudes) => ({
  type: "SET_SOLICITUDES",
  solicitudes,
});


export const resetStateSolicitudes = () => ({
  type: "SET_RESET_STATE",
});





export const doGetSolicitudes = (rutEmpresa) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await getSolicitudesApi(rutEmpresa);
    if (response.status === 200) {
      const result = await response.json();
      dispatch(setSolicitudes(result.Data));
    } else {
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al obtener las solicitudes pendientes",
        typeStyle: "error",
      }));
    }
  } catch {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente mas tarde",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

export const doAcceptSolicitud = (userRegister) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const createAD = {
      UserType: "emailAddress",
      Email: userRegister.Email,
      Password: userRegister.Password,
      FirstName: userRegister.FirstName,
      LastName: userRegister.LastName,
      Rut: userRegister.Rut,
      RelationType: userRegister.RelationType,
      Phone: userRegister.Phone,
      CompanyRut: userRegister.CompanyRut,
      IdRoles: [],
    };

    if (Array.isArray(userRegister.IdRol)) {
      userRegister.IdRol.forEach((rol) => {
        createAD.IdRoles.push(rol.Id);
      });
    } else if (userRegister.codeRol) {
      const rolRequest = await getRolIdByCode(userRegister.codeRol);
      if (rolRequest.status === 200) {
        const rolResult = await rolRequest.json();
        if (rolResult.Success) {
          createAD.IdRoles = [rolResult.Rol.Id];
        }
      }
    }

    const existResponse = await validateUserExist(createAD.Rut);

    if (existResponse.status === 200) {
      const userAD = await existResponse.json();
      if (userAD.ExistsAD && userAD.ExistsBD) {
        // Usuario ya existe en el AD, por lo que se le assignan los roles nuevos

        const createResponse = await createRolesForUserAndCompany(createAD.Rut, createAD.CompanyRut, createAD.RelationType, createAD.IdRoles);
        const createResult = await createResponse.json();
        if (createResponse.status === 200) {
          if (createResult.Success) {
            const deleteResponse = await deleteSolicitudADApi(createAD.Rut, userRegister.Id);
            if (deleteResponse.status === 200) {
              dispatch(doGetSolicitudes(userRegister.CompanyRut));
              dispatch(openCloseToast({
                isToastOpen: true,
                msgToast: "Solicitud aceptada con exito",
                typeStyle: "success",
              }));
            }
          }
        } else {
          dispatch(openCloseToast({
            isToastOpen: true,
            msgToast: `${createResult.Message}. Se recomienda Rechazar la solicitud.`,
            typeStyle: "warning",
          }));
        }
      } else {
        // Usuario no existe en el AD, por lo que se crea con sus roles
        const response = await createUserAdWithRolesApi(createAD);
        const result = await response.json();
        if (response.status === 200) {
          if (result.Success) {
            // ENVIO DE CORREO DE ACTIVACION
            const hostname = window && window.location && window.location.hostname;
            const uriMail = hostname === "localhost" ? "http://localhost:3001" : hostname;

            const href = `${uriMail}/activarCuenta/${result.ActivationToken}`;
            const parametersMail = {};
            parametersMail.userInfo = {
              FirstName: createAD.FirstName,
              LastName: createAD.LastName,
              Email: createAD.Email,
              Rut: createAD.Rut,
              href,
            };
            parametersMail.templateMail = "activaUsuario";
            await dispatch(sendEmailApp(parametersMail));
            // dispatch(doSendMailUser(createAD, result.ActivationToken));

            const responseDelete = await deleteSolicitudApi(createAD.Rut, userRegister.Id);
            if (responseDelete.status === 200) {
              dispatch(doGetSolicitudes(userRegister.CompanyRut));
              dispatch(openCloseToast({
                isToastOpen: true,
                msgToast: "Solicitud aceptada con exito",
                typeStyle: "success",
              }));
            }
          } else {
            dispatch(openCloseToast({
              isToastOpen: true,
              msgToast: "Error en la creacion del usuario",
              typeStyle: "error",
            }));
          }
        }
      }
    }
  } catch (e) {
    console.error(e);
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente mas tarde",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

export const doRejectSolicitud = (userData, fromUserAD) => async (dispatch) => {
  dispatch(loading(true));
  try {
    let response;
    if (fromUserAD) {
      response = await deleteSolicitudADApi(userData.Rut, userData.Id);
    } else {
      response = await deleteSolicitudApi(userData.Rut, userData.Id);
    }
    if (response.status === 200) {
      dispatch(doGetSolicitudes(userData.CompanyRut));
      const parametersMail = {};
      parametersMail.userInfo = {
        RutEmpresa: userData.CompanyRut,
        Email: userData.Email,
      };
      parametersMail.templateMail = "solicitudRechazada";
      await dispatch(sendEmailApp(parametersMail));
      // dispatch(sendMailRejection(userData));
    } else {
      dispatch(doGetSolicitudes(userData.CompanyRut));
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al rechazar el usuario",
        typeStyle: "error",
      }));
    }
  } catch {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente mas tarde",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

