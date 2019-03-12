import defaultState from "./state";

const globalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOADING_CONFIGURACION_NOTIFICACION_TRABAJADOR": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }
    case "SET_CONFIGURACION_NOTIFICACION_TRABAJADOR": {
      return Object.assign({}, state, {
        listCompanyNotifications: action.listCompanyNotifications,
      });
    }

    default:
      return state;
  }
};

export default globalReducer;
