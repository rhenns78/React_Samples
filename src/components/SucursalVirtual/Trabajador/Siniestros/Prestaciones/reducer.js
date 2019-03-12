import defaultState from "./state";

const PrestacionesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOADING_PRESTACIONES": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }
    case "SET_PRESTACION": {
      return Object.assign({}, state, {
        lastPrestacion: action.lastPrestacion,
      });
    }
    case "SET_PRESTACIONES": {
      return Object.assign({}, state, {
        filtros: action.filtros,
        listaPrestaciones: action.prestaciones,
      });
    }
    case "SET_LINKPDF_PRESTACION": {
      return Object.assign({}, state, {
        linkPdfPrestacion: action.linkPdfPrestacion,
      });
    }
    default:
      return state;
  }
};

export default PrestacionesReducer;
