import defaultState from "./state";

const HistorialNotificacionesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOADING_HISTORIAL_NOTIFICACIONES": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }
    case "SET_LISTA_NOTIFICACIONES_AND_FILTERS": {
      return Object.assign({}, state, {
        listaNotificaciones: action.notificaciones,
        filters: action.filters,
        totalRows: action.totalRows,
      });
    }
    case "SET_LISTA_NOTIFICACIONES": {
      return Object.assign({}, state, {
        listaNotificaciones: action.notificaciones,
      });
    }
    case "SET_NOTIFICATION_FILTERS": {
      return Object.assign({}, state, {
        filters: action.filters,
      });
    }
    case "RESET_HISTORY": {
      return {
        ...state,
        listaNotificaciones: [],
        totalRows: 0,
        isLoading: false,
        filters: [
          { id: "all", icon: "error", name: "Todas las notificaciones" },
          { id: "employee", icon: "error", name: "Personales" },
        ],
        parameters: {
          companyRut: null,
          read: null,
          type: "all",
          pageIndex: 0,
          pageSize: 20,
        },
        tabs: [
          { id: null, text: "Todas" },
          { id: true, text: "Leídas" },
          { id: false, text: "No leídas" },
        ],
      };
    }
    case "CHANGE_PARAMETERS_NOTIFICATION": {
      return Object.assign({}, state, {
        parameters: { ...action.parameters },
      });
    }
    default:
      return state;
  }
};

export default HistorialNotificacionesReducer;
