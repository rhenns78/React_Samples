import defaultState from "./state";

const SolicitudesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOADING_APROBAR_SOLUCITUDES": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }
    case "SET_SOLICITUDES": {
      return Object.assign({}, state, {
        solicitudes: action.solicitudes
      })
    }
    case "SET_RESET_STATE": {
      return defaultState;
    }

    default:
      return state;
  }
};

export default SolicitudesReducer;
