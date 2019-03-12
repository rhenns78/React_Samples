import defaultState from "./state";


const asignacionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOADING_ASIGNAR_ROLES": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }
    case "SET_ROLES": {
      return Object.assign({}, state, {
        roles: action.roles,
      });
    }
    case "SET_EMPLOYESS": {
      return Object.assign({}, state, {
        employees: action.employees,
      });
    }
    case "SET_ROLES_FILTER": {
      return Object.assign({}, state, {
        rolesFilter: action.filter,
      });
    }

    default:
      return state;
  }
};

export default asignacionReducer;
