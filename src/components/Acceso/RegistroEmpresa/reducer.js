import defaultState from "./state";

const userTempRegisterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_VALID_RUT": {
      return Object.assign({}, state, {
        rutValid: action.rutValid,
      });
    }

    case "SET_MESSAGE_RUT_COMPANY": {
      return Object.assign({}, state, {
        messageRutCompany: action.messageRutCompany,

      });
    }

    case "CLEAN_REQUEST_COMPANY_ID": {
      return Object.assign({}, state, {
        rutValid: false,
        messageRutCompany: null,
      });
    }

    case "SET_NUM_COMPANY_REQUEST": {
      return Object.assign({}, state, {
        numCompanyRequest: action.numCompanyRequest,
      });
    }


    default:
      return state;
  }
};
export default userTempRegisterReducer;
