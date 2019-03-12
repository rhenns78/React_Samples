import defaultState from "./state";

const globalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOADING_NOTIFICACIONES": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }
    case "SET_NOTIFICACIONES_COMPANY": {
      return Object.assign({}, state, {
        listCompanyNotifications: action.listCompanyNotifications,
      });
    }

    default:
      return state;
  }
};

export default globalReducer;
