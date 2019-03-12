import defaultState from "./state";

const misDatosReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_MY_DATA": {
      const profile = { ...action.profile };
      return Object.assign({}, state, {
        profile,
      });
    }

    case "LOADING_DATA": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }
    case "IS_MAIL_CHANGE": {
      return Object.assign({}, state, {
        mailChanged: action.mailChanged,

      });
    }
    case "SET_NEW_MAIL": {
      return Object.assign({}, state, {
        NewEmail: action.NewEmail,

      });
    }
    case "SET_FAMILY_MEMBER": {
      return Object.assign({}, state, {
        familyMember: action.familyMember,

      });
    }
    case "RESET_MIS_DATOS_STATE": {
      return defaultState;
    }

    default:
      return state;
  }
};
export default misDatosReducer;
