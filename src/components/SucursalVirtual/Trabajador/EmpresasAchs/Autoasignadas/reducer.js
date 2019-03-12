import defaultState from "./state";

const misDatosReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOADING_AUTOASIGNACIONES": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }
    case "SET_EMPRESAS_ACHS": {
      return Object.assign({}, state, {
        assignedCompanies: action.companies,
      });
    }
    case "UPDATE_ASSIGNED_COMPANIES": {
      return Object.assign({}, state, {
        updateAssignedCompanies: action.update,
      });
    }
    case "UPDATE_ALL_COMPANIES": {
      return Object.assign({}, state, {
        updateAllCompanies: action.update,
      });
    }
    case "OPEN_CLOSE_MODAL_AGREGAR_EMPRESAS": {
      return Object.assign({}, state, {
        isOpenModalAgregar: action.isOpen,
      });
    }
    case "OPEN_CLOSE_MODAL_ELIMINAR_EMPRESA": {
      return Object.assign({}, state, {
        isOpenModalEliminar: action.isOpen,
      });
    }
    case "SET_ALL_COMPANIES": {
      return Object.assign({}, state, {
        allCompanies: action.companies,
      });
    }
    case "SET_SELECTED_COMPANIES": {
      return Object.assign({}, state, {
        selectedCompanies: action.companies,
      });
    }
    default:
      return state;
  }
};
export default misDatosReducer;
