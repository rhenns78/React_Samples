
// import { store } from "../../../config/store";
// import Questions from "./questions.json";
// import woQuestions from "./withoutquestion.json";
import { push } from "connected-react-router";
import Moment from "moment";
// import JsnValidate from "./validate.json";
// import apiConfig from "../../../config/api";
import {
  validateRutApi, validateEmailApi, doValidateSerivice, createUserAdApi, validateRutTemp, validateEmailTemp,
  conditionAcept, createTempUserApi, createUserAdWithRolesApi,
} from "../../../services/registroApi";
import trace from "../../../helpers/trace";
import validaciones from "../../../helpers/validaciones";
import { loading, openCloseToast, sendEmailApp } from "../../Global/actions";
import constants from "../../../helpers/constants";
import { createRolesForUser } from "../../../services/userRolesApi";
import { getQuestionsApi, verifyAnswersApi } from "../../../services/equifaxApi";

// Action Creators GetPDFApi
export const userRegisterStep = (steps) => ({
  type: "USER_REGISTER_STEP",
  steps,
});
export const setUserInfo = (UserInfo) => ({
  type: "SET_USER_INFO",
  UserInfo,
});
export const cleanRegisterStep = () => ({
  type: "CLEAN_REGISTER_STEP",
});
export const setQuestionsLoad = (QuestionsList) => ({
  type: "SET_QUESTIONS_LOAD",
  QuestionsList,
});

export const setMessageCreateUser = (messageCreateUser) => ({
  type: "SET_MESSAGE_CREATE_USER",
  messageCreateUser,
});
export const setMessageAnswers = (messageQuestions) => ({
  type: "SET_MESSAGE_ANSWERS",
  messageQuestions,
});
export const setValidRut = (rutValid) => ({
  type: "SET_VALID_RUT",
  rutValid,
});
export const setValidEmail = (emailValid) => ({
  type: "SET_VALID_EMAIL",
  emailValid,
});
export const setValidNSerieCI = (isValid) => ({
  type: "SET_VALID_N_SERIE_CI",
  isValid,
});
export const setSkipValidation = (skipValidation) => ({
  type: "SET_SKIPVALIDATION",
  skipValidation,
});

export const setFileUrl = (fileUrl) => ({
  type: "SET_FILE_URL",
  fileUrl,
});

export const doValidateEmailRut = (personalData) => async (dispatch) => {
  dispatch(loading(true));
  const toast = {};
  try {
    trace.information("Inicio Rut Validacion");
    let resultRut;
    let resultRutTemp;
    let validRutApi;
    let validRutTemp;
    let resultEmailApi;
    let resultEmailTemp;
    let validEmailApi;
    let validEmailTemp;
    const rut = validaciones.formatRut(personalData.rutUsuario, { showDots: false, showHyphen: true });
    const responseRut = await validateRutApi(rut);
    const responseRutTemp = await validateRutTemp(rut);
    if (responseRut.ok) {
      resultRut = await responseRut.json();
      validRutApi = resultRut.Success;
    } else {
      validRutApi = false;
    }
    if (responseRutTemp.ok) {
      resultRutTemp = await responseRutTemp.json();
      validRutTemp = resultRutTemp.Success;
    } else {
      validRutTemp = false;
    }

    if (validRutTemp === false && validRutApi === false) {
      const responseEmail = await validateEmailApi(personalData.email);
      const responseEmailTemp = await validateEmailTemp(personalData.email);
      if (responseEmail.ok) {
        resultEmailApi = await responseEmail.json();
        validEmailApi = resultEmailApi.Success;
      } else {
        validEmailApi = false;
      }
      if (responseEmailTemp.ok) {
        resultEmailTemp = await responseEmailTemp.json();
        validEmailTemp = resultEmailTemp.Success;
      } else {
        validEmailTemp = false;
      }

      if (validEmailTemp === false && validEmailApi === false) {
        await dispatch(doValidate(personalData));
      } else {
        dispatch(setValidEmail(true));
      }
    } else {
      dispatch(setValidRut(true));
    }
  } catch (error) {
    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión, intente mas tarde";
    toast.typeStyle = "error";

    dispatch(openCloseToast(toast));
  }
  dispatch(loading(false));
};

export const doValidate = (personalData) => async (dispatch) => {
  const toast = {};
  try {
    trace.information("Inicio Servicio doValidate");
    const UserInfo = {};
    let TempBD;
    const rut = validaciones.formatRut(personalData.rutUsuario, { showDots: false, showHyphen: true });


    const periodo = Moment(new Date()).subtract(2, "months").format("YYYYMM");
    const response = await doValidateSerivice(rut, periodo);

    if (response.ok) {
      const result = await response.json(); // JsnValidate;

      if (result.IsActive) {
        TempBD = false;
        UserInfo.Rol = result.Rol.Id;
        if (result.Rol.Code === constants.codeRolExACHS) UserInfo.IsExACHS = true;
      } else {
        TempBD = true;
        UserInfo.IsExACHS = false;
        UserInfo.Rol = null;
      }

      UserInfo.Email = personalData.email;
      UserInfo.Rut = personalData.rutUsuario;
      UserInfo.serieCI = personalData.serieCI;
      UserInfo.Birthdate = null;
      UserInfo.TempBD = TempBD;
      UserInfo.RelationType = TempBD === false ? "INT" : null;
      UserInfo.FirstName = result.UserInfo !== null ? result.UserInfo.FirstName : null;
      UserInfo.MiddleName = result.UserInfo !== null ? result.UserInfo.MiddleName : null;
      UserInfo.LastName = result.UserInfo !== null ? result.UserInfo.LastName : null;
      UserInfo.CompanyRut = result.CurrentCompanyRut != null ? result.CurrentCompanyRut : "20510913-7"; // "24565809-5" 70360100-6
      UserInfo.Phone = validaciones.validateCellPhone(personalData.phone) ? personalData.phone : null;
      trace.information("Exito validate");
      dispatch(setUserInfo(UserInfo));
      await dispatch(getQuestion(UserInfo));
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
};

export const doConditions = (UserInfo) => async (dispatch) => {
  const toast = {};
  try {
    trace.information("Inicio Servicio doConditions, debo consumir un servicio termino condiciones");

    const rut = validaciones.formatRut(UserInfo.Rut, { showDots: false, showHyphen: true });
    const response = await conditionAcept(rut);

    if (response.ok) {
      trace.information("Paso termino y condiciones");
    } else if (response.status === 400) {
      trace.information("El rut ya ha aceptado los terminos y condiciones");
    } else if (response.status === 500) {
      toast.isToastOpen = true;
      toast.msgToast = "Error de conexión Termino condiciones, intente mas tarde";
      toast.typeStyle = "error";
      dispatch(openCloseToast(toast));
    }
  } catch (error) {
    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión Termino condiciones, intente mas tarde";
    toast.typeStyle = "error";
    dispatch(openCloseToast(toast));
  }
};
// Action: Cargo las preguntas del servicio equifax
export const getQuestion = (UserInfo, firstTime = true) => async (dispatch) => {
  dispatch(loading(true));
  const toast = {};
  try {
    trace.information("Inicio Servicio GetQuestion");
    const steps = {
      stepOne: false,
      stepTwo: false,
      stepThree: true,
      stepFour: false,
      stepFive: false,
      stepSuccess: false,
    };

    const rut = validaciones.formatRut(UserInfo.Rut, { showDots: false, showHyphen: true });
    const response = await getQuestionsApi(rut, UserInfo.serieCI);

    if (response.status === 200) {
      const result = await response.json();
      const QuestionsList = [];

      if (result.QuestionsList.length > 0) {
        result.QuestionsList.forEach((q) => {
          if (q.Id === 1) {
            const question = {};
            const AnswerChoices = [];
            question.Id = q.Id;
            question.Text = q.Text;
            q.AnswerChoices.forEach((element) => {
              AnswerChoices.push({ Id: element.Id, Text: element.Text });
            });
            question.AnswerChoices = AnswerChoices;
            QuestionsList.question1 = question;
          }
          if (q.Id === 2) {
            const question = {};
            const AnswerChoices = [];
            question.Id = q.Id;
            question.Text = q.Text;
            q.AnswerChoices.forEach((element) => {
              AnswerChoices.push({ Id: element.Id, Text: element.Text });
            });
            question.AnswerChoices = AnswerChoices;
            QuestionsList.question2 = question;
          }
          if (q.Id === 3) {
            const question = {};
            const AnswerChoices = [];
            question.Id = q.Id;
            question.Text = q.Text;
            q.AnswerChoices.forEach((element) => {
              AnswerChoices.push({ Id: element.Id, Text: element.Text });
            });
            question.AnswerChoices = AnswerChoices;
            QuestionsList.question3 = question;
          }
          if (q.Id === 4) {
            const question = {};
            const AnswerChoices = [];
            question.Id = q.Id;
            question.Text = q.Text;
            q.AnswerChoices.forEach((element) => {
              AnswerChoices.push({ Id: element.Id, Text: element.Text });
            });
            question.AnswerChoices = AnswerChoices;
            QuestionsList.question4 = question;
          }

          QuestionsList.QuestionsSetID = result.QuestionsSetID;
          QuestionsList.TransactionKey = result.TransactionKey;
        });

        dispatch(setQuestionsLoad(QuestionsList));
        firstTime && dispatch(userRegisterStep(steps));
        dispatch(setValidNSerieCI(true));
      } else if (result.SkipValidation) {
        UserInfo.TempBD = true;
        dispatch(setSkipValidation(result.SkipValidation));
        dispatch(setUserInfo(UserInfo));
        dispatch(userRegisterStep({
          stepOne: false,
          stepTwo: false,
          stepThree: !result.SkipValidation,
          stepFour: result.SkipValidation,
          stepFive: false,
          stepSuccess: false,
        }));
      } else if (result.SkipValidation === false) {
        dispatch(userRegisterStep({
          stepOne: true,
          stepTwo: false,
          stepThree: false,
          stepFour: false,
          stepFive: false,
          stepSuccess: false,
        }));
        toast.isToastOpen = true;
        toast.msgToast = result.ErrorMessage ? result.ErrorMessage : "La cédula ingresada se encuentra bloqueada, expirada o no vigente, por favor, verifique sus datos.";
        toast.typeStyle = "error";
        dispatch(openCloseToast(toast));
        // dispatch(push(paths.root));
      }
    } else {
      dispatch(setValidNSerieCI(false));
      dispatch(userRegisterStep({
        stepOne: true,
        stepTwo: false,
        stepThree: false,
        stepFour: false,
        stepFive: false,
        stepSuccess: false,
      }));
      throw new Error("Error: N° de Serie CI invalido");
    }
  } catch (error) {
    dispatch(setValidNSerieCI(false));
    trace.information("ERROR", error);
    toast.isToastOpen = true;
    toast.msgToast = "heere!! Error: N° de Serie CI invalido";
    toast.typeStyle = "error";
    dispatch(openCloseToast(toast));
  }
  dispatch(loading(false));
};

export const doValidateQuestions = (data, UserInfo) => async (dispatch) => {
  dispatch(loading(true));
  const toast = {};
  try {
    trace.information("Inicio Servicio doValidateQuestions");

    const steps = {
      stepOne: false,
      stepTwo: false,
      stepThree: false,
      stepFour: true,
      stepFive: false,
      stepSuccess: false,
    };


    const response = await verifyAnswersApi(data.QuestionsSetID, data.TransactionKey, data.Answers);

    if (response.status === 200) {
      const result = await response.json();
      if (result.Success) {
        dispatch(userRegisterStep(steps));
        dispatch(setMessageAnswers(null));
      } else {
        await dispatch(getQuestion(UserInfo, false));
        dispatch(setMessageAnswers("La información no es correcta, intente nuevamente verificar su identidad respondiendo correctamente"));
      }
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


export const doCreateUserTempBD = (personalData, paths) => async (dispatch) => {
  const toast = {};
  dispatch(loading(true));
  try {
    trace.information("Inicio servicio que crea un usuario en bdtemp");
    const steps = {
      stepOne: false,
      stepTwo: false,
      stepThree: false,
      stepFour: false,
      stepFive: false,
      stepSuccess: false,
    };
    personalData.Birthdate = validaciones.sendDateFormatApis(personalData.Birthdate);
    personalData.Rut = validaciones.formatRut(personalData.Rut, { showDots: false, showHyphen: true });


    const response = await createTempUserApi(personalData);
    if (response.ok) {
      await dispatch(doConditions(personalData));

      dispatch(userRegisterStep(steps));
      dispatch(push(paths));
    } else {
      dispatch(setMessageCreateUser(response.status));
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

export const createUserAD = (userRegister) => async (dispatch) => {
  dispatch(loading(true));
  const toast = {};
  try {
    trace.information("Se procede a crear el usuario en el AD B2C --createUserAD");

    const steps = {
      stepOne: false,
      stepTwo: false,
      stepThree: false,
      stepFour: false,
      stepFive: false,
      stepSuccess: true,
    };
    userRegister.Birthdate = validaciones.sendDateFormatApis(userRegister.Birthdate);

    let response;
    userRegister.Rut = validaciones.formatRut(userRegister.Rut, { showDots: false, showHyphen: true });
    await dispatch(doConditions(userRegister));
    if (userRegister.IsExACHS) {
      response = await createUserAdApi(userRegister);
    } else {
      userRegister.IdRoles = [userRegister.Rol];
      response = await createUserAdWithRolesApi(userRegister);
    }
    const result = await response.json();
    if (response.ok) {
      if (result.Success) {
        if (userRegister.IsExACHS) {
          await createRolesForUser(userRegister.Rut, userRegister.Rol);
        }
        // ENVIO CORREO ACTIVACION AD
        const hostname = window && window.location && window.location.hostname;
        const uriMail = hostname === "localhost" ? "http://localhost:3001" : hostname;
        const href = `${uriMail}/activarCuenta/${result.ActivationToken}`;
        const parametersMail = {};
        parametersMail.userInfo = {
          FirstName: userRegister.FirstName,
          LastName: userRegister.LastName,
          Email: userRegister.Email,
          Rut: userRegister.Rut,
          href,
        };
        parametersMail.templateMail = "activaUsuario";
        await dispatch(sendEmailApp(parametersMail));

        dispatch(userRegisterStep(steps));
      } else {
        dispatch(setMessageCreateUser(result.Message));
      }
    } else {
      toast.isToastOpen = true;
      toast.msgToast = "Error en la creación Usuario";
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

