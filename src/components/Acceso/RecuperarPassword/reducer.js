import defaultState from './state';

const recoverReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "CHANGE_STEP": {
      return Object.assign({}, state, {
        step: action.newStep,
        disableNext: true,
      })
    }
    case "ENABLE_NEXT": {
      return Object.assign({}, state, {
        disableNext: false,
      })
    }
    case "DISABLE_NEXT": {
      return Object.assign({}, state, {
        disableNext: true,
      })
    }
    case "LOADING_RECUPERAR_PASSWORD": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      })
    }
    case "SET_USER_OPTIONS": {
      return Object.assign({}, state, {
        isTemporal: action.IsTemporalUser,
        email: action.Email,
        phone: action.CellPhoneNumber,
      })
    }
    case "SET_SEND_OPTIONS": {
      return Object.assign({}, state, {
        email: action.email,
        phone: action.phone,
      });
    }
    case "SET_VALIDATION_CODE": {
      return Object.assign({}, state, {
        validationCode: action.validationCode,
      });
    }
    case "SET_CODE_ERROR": {
      return Object.assign({}, state, {
        codeError: action.error,
      })
    }
    case "SET_INFO_USER_ERROR": {
      return Object.assign({}, state, {
        userInfoError: action.error,
      })
    }
    case "RESET_STATE": {
      return Object.assign({}, state, {
        step: 0,
        validationCode: '',
        codeError: false,
        userInfoError: false,
        disableNext: true,
        email: '',
        phone: '',
      })
    }
    default:
      return state;
  }
};
export default recoverReducer;
