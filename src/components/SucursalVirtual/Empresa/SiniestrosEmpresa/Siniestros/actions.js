import { GetSiniestrosEmpresaApi } from "../../../../../services/SiniestrosEmpresa";
import { getSiniestroDetailsApi } from "../../../../../services/siniestrosApi";


export const loading = (isLoading) => ({
  type: "LOADING_SINIESTRO_EMPRESA",
  isLoading,
});

export const setSiniestro = (siniestro) => ({
  type: "SET_SINIESTRO",
  siniestro,
});


export const setSiniestrosEmpresa = (siniestros, filtros, total) => ({
  type: "SET_SINIESTROS_EMPRESA",
  siniestros,
  filtros,
  total,
});

export const setSiniestroEmpresaDetails = (details) => ({
  type: "SET_SINIESTRO_EMPRESA_DETAILS",
  details,
});
export const setDocumentSiniestro = (listDocuments) => ({
  type: "SET_DOCUMENT_SINIESTRO",
  listDocuments,
});
export const setshowNoDataEmpresa = (details) => ({
  type: "SET_SHOW_DATA_EMPRESA",
  details,
});


export const doGetSiniestrosEmpresa = (filtros) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await GetSiniestrosEmpresaApi(filtros);
    if (request.status === 200) {
      const result = await request.json();
      dispatch(setSiniestrosEmpresa(result.ListadoSiniestros));
    }
  } catch (e) {
    console.log(e);
  }
  dispatch(loading(false));
};

export const doGetSiniestroEmpresaDetailsApi = (idSiniestro) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await getSiniestroDetailsApi(idSiniestro);
    if (request.status === 200) {
      const result = await request.json();
      dispatch(setSiniestroEmpresaDetails({
        atencionesMedicas: result.Siniestro.ListadoAtencionesMedicas,
        periodosReposo: result.Siniestro.ListadoReposo,
        evaluacionesIncapa: result.Siniestro.ListadoEvaluacionIncapacidad,
        prestacionesEconomicas: result.Siniestro.ListadoPrestacionesEconomicas,
        // TODO: mock denunvias
        // denuncias: result.Siniestro.ListadoDenuncias,
      }));
      dispatch(setshowNoDataEmpresa({
        showNoDataAtencionesMedicasEmpresa: !(result.Siniestro.ListadoAtencionesMedicas.length > 0),
        showNoDataPeriodosReposoEmpresa: !(result.Siniestro.ListadoReposo.length > 0),
        showNoDataEvaluacionesIncapaEmpresa: !(result.Siniestro.ListadoEvaluacionIncapacidad.length > 0),
        showNoDataPrestacionesEconomicasEmpresa: !(result.Siniestro.ListadoPrestacionesEconomicas.length > 0),

      }));
    }
  } catch (e) {
    console.log(e);
  }
  dispatch(loading(false));
};

