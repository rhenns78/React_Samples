import defaultState from "./state";

const logInReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_DATA_LOGIN": {
      const data = { ...action.data };
      return Object.assign({}, state, {
        data,
      });
    }
    case "SET_DATA_ACTIVE_USER": {
      return Object.assign({}, state, {
        activeUserData: action.activeUser
      })
    }
    case "SET_MESSAGE_LOGIN": {
      return Object.assign({}, state, {
        message: action.message,
      });
    }
    case "SET_SHOW_PASS": {
      return Object.assign({}, state, {
        showPassInput: action.show,
        isAccountTemp: action.isAccountTemp,
      })
    }
    case "DISABLE_BUTTON": {
      return Object.assign({}, state, {
        disableButton: action.disable,
      })
    }
    case "ACCOUNT_IS_ACTIVE": {
      return Object.assign({}, state, {
        isAccountActive: action.isActive,
      })
    }
    case "RESET_LOGIN_STATe": {
      return Object.assign({}, state, {
        data: {
          Username: null,
          Password: null,
          AuthType: null,
          ApplicationId: "",
      
        },
        showPassInput: false,
        disableButton: true,
        message: null,
        isLoggedIn: false,
        isAccountActive: true,
      })
    }
    default:
      return state;
  }
};
export default logInReducer;
