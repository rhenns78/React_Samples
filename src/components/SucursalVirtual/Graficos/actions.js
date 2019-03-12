
import { GetTokenPowerBi } from "../../../services/listasApi";
import { openCloseToast } from "../../Global/actions";

export const loading = (isLoading) => ({
  type: "LOADING_GRAPHICS",
  isLoading,
});


export const setTokenPowerBi = (EmbedTokenPowerBi) => ({
  type: "SET_TOKEN_POWERBI",
  EmbedTokenPowerBi,
});

export const setGraphicsSetting = (config) => ({
  type: "SET_GRAPHICS_SETTING",
  config,
});
export const cleanGraphicsSetting = () => ({
  type: "SET_CLEAN_GRAPHICS_SETTING",

});


export const getTokenPowerBi = (groupId, reportId) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await GetTokenPowerBi(groupId, reportId);
    const resultResponse = await response.json();

    if (response.status === 200 && resultResponse.Success === true) {
      dispatch(setTokenPowerBi(resultResponse.EmbedToken));
    } else {
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error",
        typeStyle: "error",
      }));
    }
  } catch (error) {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente más tarde",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

