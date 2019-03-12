import defaultState from "./state";

const DocumentReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOADING_DOCUMENTS": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }
    case "VIEW_DOCUMENTOS": {
      return Object.assign({}, state, {
        viewDocumentos: action.view,
        infoDocuments: action.data,
      });
    }
    case "SET_DOCUMENT_SINIESTRO": {
      return Object.assign({}, state, {
        listDocuments: action.listDocuments,
      });
    }

    default:
      return state;
  }
};

export default DocumentReducer;
