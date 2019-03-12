import defaultState from "./state";

const SolicitudesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOADING_SOLICITUDES": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }
    case "LOAD_SOLICITUDES": {
      return Object.assign({}, state, {
        solicitudes: action.solicitudes,
      });
    }
    case "SET_ERROR_COMPANY_RUT": {
      return Object.assign({}, state, {
        companyRutError: action.message,
      });
    }
    default:
      return state;
  }
};

export default SolicitudesReducer;
