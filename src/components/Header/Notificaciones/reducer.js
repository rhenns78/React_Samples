import defaultState from "./state";

const notificacionesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOADING_NOTIFICACIONES": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }
    case "SET_HEADER_NOTIFICATIONS": {
      return Object.assign({}, state, {
        notificactionHeaderList: action.notificactionHeaderList,
        totalUnread: action.totalUnread,
      });
    }
    case "SET_TOKEN_JWT": {
      return Object.assign({}, state, {
        tokenJwt: action.tokenJwt,

      });
    }
    case "SET_POP_OVER_STATUS": {
      return Object.assign({}, state, {
        openPopOver: action.open,

      });
    }
    default:
      return state;
  }
};

export default notificacionesReducer;
