import DefaultState from "./state";

const SiniestroEmpresaReducer = (state = DefaultState, action) => {
  switch (action.type) {
    case "LOADING_SINIESTRO_EMPRESA": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }
    case "SET_SINIESTRO": {
      return Object.assign({}, state, {
        selectedSiniestro: action.siniestro,
      });
    }
    case "VIEW_DOCUMENTS": {
      return Object.assign({}, state, {
        viewDocument: action.view,
      });
    }
    case "SET_SINIESTRO_EMPRESA_DETAILS": {
      return { ...state, ...action.details };
    }
    case "SET_SINIESTROS_EMPRESA": {
      return Object.assign({}, state, {
        siniestros: action.siniestros,
        filtrosSiniestros: action.filtros,
        totalSiniestros: action.total,
      });
    }
    case "SET_DOCUMENT_SINIESTRO": {
      return Object.assign({}, state, {
        listDocuments: action.listDocuments,
      });
    }
    case "SET_SHOW_DATA_EMPRESA": {
      return { ...state, ...action.details };
    }
    default:
      return state;
  }
};

export default SiniestroEmpresaReducer;
