import { getSiniestroDetailsApi, getLastSiniestroApi } from "../../../../../services/siniestrosApi";
import { openCloseToast } from "../../../../Global/actions";

// import { getSiniestrosApi } from "../../../../../services/siniestrosApi"; GetSiniestroDocumentsApi, GetDocument

export const loading = (isLoading) => ({
  type: "LOADING_SINIESTROS",
  isLoading,
});

export const setSiniestros = (siniestros, filtros) => ({
  type: "SET_SINIESTROS",
  siniestros,
  filtros,
});

export const viewDetails = (view) => ({
  type: "VIEW_DETAILS",
  view,
});

export const setSelectedSiniestro = (siniestro) => ({
  type: "SET_SELECTED_SINIESTRO",
  siniestro,
});

export const setSiniestroDetails = (details) => ({
  type: "SET_SINIESTRO_DETAILS",
  details,
});

export const resetDetails = () => ({
  type: "RESET_DETAILS",
});


export const setLastSiniestro = (siniestro) => ({
  type: "SET_LAST_SINIESTRO",
  siniestro,
});

export const setDocumentSiniestro = (listDocuments) => ({
  type: "SET_DOCUMENT_SINIESTRO",
  listDocuments,
});

export const setshowNoDataAtencionesMedicas = (showNoDataAtencionesMedicas) => ({
  type: "SET_SHOW_DATA_ATENCIONES_MEDICAS_DETALLE",
  showNoDataAtencionesMedicas,
});


export const doGetLastSiniestro = (rut) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await getLastSiniestroApi(rut);
    if (request.status === 200) {
      const response = await request.json();
      let data = {};
      if (response.Success) { data = response.UltimoSiniestro; }

      dispatch(setLastSiniestro(data));
    }
  } catch {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error al obtener el siniestro",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

export const doGetDetails = (idSiniestro) => async (dispatch) => {
  dispatch(loading(true));
  try {
    dispatch(resetDetails());
    const request = await getSiniestroDetailsApi(idSiniestro);
    if (request.status === 200) {
      const response = await request.json();
      if (response.Success) {
        const siniestro = response.Siniestro;
        dispatch(setSiniestroDetails({
          atencionesMedicas: siniestro.ListadoAtencionesMedicas,
          periodosReposo: siniestro.ListadoReposo,
          evaluacionesIncapa: siniestro.ListadoEvaluacionIncapacidad,
          prestacionesEconomicas: siniestro.ListadoPrestacionesEconomicas,
        }));

        dispatch(setshowNoDataAtencionesMedicas(!(siniestro.ListadoAtencionesMedicas.length > 0)));
      }
    } else {
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error al obtener el detalle del siniestro",
        typeStyle: "error",
      }));
    }
  } catch (e) {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error al obtener el detalle del siniestro",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

