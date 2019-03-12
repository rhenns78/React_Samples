import defaultState from "./state";

const SiniestroReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOADING_SINIESTROS": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }
    case "SET_SINIESTROS": {
      return Object.assign({}, state, {
        listaSiniestros: action.siniestros,
        filtrosTablaSiniestro: action.filtros,
      });
    }
    case "VIEW_DETAILS": {
      return Object.assign({}, state, {
        viewDetails: action.view,
      });
    }
    case "RESET_DETAILS": {
      return Object.assign({}, state, {
        atencionesMedicas: [],
        periodosReposo: [],
        evaluacionesIncapa: [],
        prestacionesEconomicas: [],
      });
    }
    case "SET_SELECTED_SINIESTRO": {
      return Object.assign({}, state, {
        selectedSiniestro: action.siniestro,
      });
    }

    case "SET_DOCUMENT_SINIESTRO": {
      return Object.assign({}, state, {
        listDocuments: action.listDocuments,
      });
    }
    case "SET_SINIESTRO_DETAILS": {
      return { ...state, ...action.details };
    }
    case "SET_LAST_SINIESTRO": {
      return Object.assign({}, state, {
        lastSiniestro: action.siniestro,
      });
    }
    case "SET_SHOW_DATA_ATENCIONES_MEDICAS_DETALLE": {
      return Object.assign({}, state, {
        showNoDataAtencionesMedicas: action.showNoDataAtencionesMedicas,
      });
    }
    default:
      return state;
  }
};

export default SiniestroReducer;
