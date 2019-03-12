import defaultState from "./state";

const graficoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOADING_GRAPHICS": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }

    case "SET_TOKEN_POWERBI": {
      return Object.assign({}, state, {
        EmbedTokenPowerBi: action.EmbedTokenPowerBi,
      });
    }
    case "SET_GRAPHICS_SETTING": {
      return Object.assign({}, state, {
        config: action.config,

      });
    }
    case "SET_CLEAN_GRAPHICS_SETTING": {
      return Object.assign({}, state, {
        config: {
          embedType: null,
          tokenType: null,
          accessToken: null,
          embedUrl: null,
          embedId: null,
          extraSettings: {
            filterPaneEnabled: false,
            navContentPaneEnabled: false,
            allowFullScreen: false,
          },

        },

      });
    }
    default:
      return state;
  }
};

export default graficoReducer;
