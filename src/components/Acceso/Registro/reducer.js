import defaultState from "./state";

const userRegisterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "USER_REGISTER_STEP": {
      const steps = { ...action.steps };
      return Object.assign({}, state, {
        steps,
      });
    }
    case "SET_VALID_RUT": {
      return Object.assign({}, state, {
        rutValid: action.rutValid,
      });
    }
    case "SET_VALID_EMAIL": {
      return Object.assign({}, state, {
        emailValid: action.emailValid,
      });
    }
    case "SET_USER_INFO": {
      const UserInfo = { ...action.UserInfo };
      return Object.assign({}, state, {
        UserInfo,
      });
    }
    case "CLEAN_REGISTER_STEP": {
      const steps = Object.assign({}, state.steps, {
        stepOne: true,
        stepTwo: false,
        stepThree: false,
        stepFour: false,
        stepFive: false,
        stepSuccess: false,
      });
      const UserInfo = Object.assign({}, state.steps, {
        UserType: null,
        FirstName: null,
        MiddleName: null,
        LastName: null,
        MothersName: null,
        Email: null,
        Rut: null,
        Phone: null,
        serieCI: null,
        Birthdate: null,
        TempBD: false,
        Password: false,
        rePassword: false,
      });
      return Object.assign({}, state, {
        steps,
        UserInfo,
        emailValid: false,
        rutValid: false,
        QuestionsList: null,
        messageCreateUser: null,
        messageQuestions: null,
      });
    }

    case "SET_QUESTIONS_LOAD": {
      const QuestionsList = { ...action.QuestionsList };
      return Object.assign({}, state, {
        QuestionsList,
      });
    }
    case "SET_MESSAGE_CREATE_USER": {
      return Object.assign({}, state, {
        messageCreateUser: action.messageCreateUser,
      });
    }
    case "SET_MESSAGE_ANSWERS": {
      return Object.assign({}, state, {
        messageQuestions: action.messageQuestions,
      });
    }
    case "SET_VALID_N_SERIE_CI": {
      return Object.assign({}, state, {
        validCINumber: action.isValid,
      });
    }
    case "SET_SKIPVALIDATION": {
      return Object.assign({}, state, {
        skipValidation: action.skipValidation,
      });
    }
    case "SET_FILE_URL": {
      return Object.assign({}, state, {
        fileUrl: action.fileUrl,
      });
    }
    default:
      return state;
  }
};
export default userRegisterReducer;
