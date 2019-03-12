import defaultState from "./state";

const mantenedoresReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_MANTENEDOR_ROLES": {
      return { ...state, ...action.mantenedores };
    }
    case "SET_ROLES_AND_FILTER_LIST": {
      return Object.assign({}, state, {
        roles: action.roles,
        filtrosTablaRoles: action.filtrosTablaRoles,
      });
    }
    case "SET_PERFILES_AND_FILTER_LIST": {
      return Object.assign({}, state, {
        perfiles: action.perfiles,
        filtrosTablaPerfiles: action.filtrosTablaPerfiles,
      });
    }
    case "LOADING_MANTENEDORES": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }
    case "SET_ROL_FUNCIONALITIES": {
      return Object.assign({}, state, {
        selectedFuncionalities: action.func,
      });
    }
    case "SET_EVENT_DATA_ROL": {
      return Object.assign({}, state, {
        eventDataRol: action.eventDataRol,
      });
    }
    default:
      return state;
  }
};
export default mantenedoresReducer;
