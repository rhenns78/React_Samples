import { getLastPrestacionesApi } from "../../../../../services/PrestacionesEconomicasApi";
import trace from "../../../../../helpers/trace";
import { openCloseToast } from "../../../../Global/actions";

export const loading = (isLoading) => ({
  type: "LOADING_PRESTACIONES",
  isLoading,
});

export const setLastPrestacion = (lastPrestacion) => ({
  type: "SET_PRESTACION",
  lastPrestacion,
});

export const setPrestaciones = (prestaciones, filtros) => ({
  type: "SET_PRESTACIONES",
  prestaciones,
  filtros,
});

export const setLinkPdf = (linkPdfPrestacion) => ({
  type: "SET_LINKPDF_PRESTACION",
  linkPdfPrestacion,
});


export const getLastPrestacion = (rutUsuario) => async (dispatch) => {
  trace.information("consumo servicio para resactar ultima prestación economica");
  dispatch(loading(true));
  const toast = {};
  try {
    const response = await getLastPrestacionesApi(rutUsuario);
    const result = await response.json();

    if (response.ok) {
      dispatch(setLastPrestacion(result.UltimaPrestacionEconomica));
    } else {
      toast.isToastOpen = true;
      toast.msgToast = result.Message;
      toast.typeStyle = "error";
      dispatch(openCloseToast(toast));
    }
  } catch (error) {
    trace.information("ERROR", error);
    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión, intente más tarde";
    toast.typeStyle = "error";
    dispatch(openCloseToast(toast));
  }
  dispatch(loading(false));
};

