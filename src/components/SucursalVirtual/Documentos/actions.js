import { GetSiniestroDocumentsApi, GetDocument } from "../../../services/DocumentosApi";
import { openCloseToast } from "../../Global/actions";
// import validacion from "../../../helpers/validaciones";
import trace from "../../../helpers/trace";

export const loading = (isLoading) => ({
  type: "LOADING_DOCUMENTS",
  isLoading,
});


export const viewDocumentos = (view, data) => ({
  type: "VIEW_DOCUMENTOS",
  view,
  data,
});

export const setLastSiniestro = (siniestro) => ({
  type: "SET_LAST_SINIESTRO",
  siniestro,
});

export const setDocumentSiniestro = (listDocuments) => ({
  type: "SET_DOCUMENT_SINIESTRO",
  listDocuments,
});


export const doGetDocumentBySiniestro = (idSiniestro, data) => async (dispatch) => {
  dispatch(loading(true));
  const toast = {};
  try {
    trace.information("Busco los documentos segun idsiniestro");
    // const MockSinistroId = 5115622;
    // console.log("idSiniestro:>", idSiniestro, " idsiniestro after:>", validacion.removeCharacters(idSiniestro, 3));
    // esta llamada removia los tres ceros que iban al principio del numero, pero al hacer esto el servicio no respondia correctamente asi que no se usa este formato
    // const request = await GetSiniestroDocumentsApi(validacion.removeCharacters(idSiniestro, 3));
    const request = await GetSiniestroDocumentsApi(idSiniestro);
    if (request.status === 200) {
      const result = await request.json();
      if (result.Documentos.length > 0) {
        dispatch(setDocumentSiniestro(result.Documentos));
        dispatch(viewDocumentos(true, data));
      } else {
        toast.isToastOpen = true;
        toast.msgToast = "Siniestro sin documentos";
        toast.typeStyle = "warning";
        dispatch(openCloseToast(toast));
      }
    }
  } catch (e) {
    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión, intente mas tarde";
    toast.typeStyle = "error";
    dispatch(openCloseToast(toast));
  }
  dispatch(loading(false));
};

export const doOpenDocument = (documentId) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await GetDocument(documentId);
    const file = new Blob([response], { type: "application/pdf;base64" });
    const objUrl = window.URL.createObjectURL(file);
    window.open(objUrl);
  } catch (e) {
    console.log(e);
  }
  dispatch(loading(false));
};
