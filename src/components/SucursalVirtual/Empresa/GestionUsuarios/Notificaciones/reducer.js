import defaultState from "./state";

const DenunciasReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "IS_LOADING_NOTIFICACION_EMPRESA": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }
    case "SET_SELECTED_NOTIFICATION": {
      return Object.assign({}, state, {
        selectedNotification: action.selected,
      });
    }
    case "SET_NOTIFICACIONES": {
      return Object.assign({}, state, {
        notificaciones: action.notificaciones,
      });
    }
    case "SET_USUARIOS": {
      return Object.assign({}, state, {
        usuarios: action.usuarios,
      });
    }
    case "SET_AVAIABLE_LIST_USERS": {
      return Object.assign({}, state, {
        availableListUser: action.availableListUser,
      });
    }
    case "SET_SELECTED_USER_NOTIFICATIONS": {
      return Object.assign({}, state, {
        selectedUserNotifications: action.list,
      });
    }
    case "OPEN_CLOSE_MODAL_SUSCRIPCION_MASIVA": {
      return Object.assign({}, state, {
        isOpenModalSuscripcionMasiva: action.isOpen,
      });
    }
    case "OPEN_CLOSE_MODAL_SUSCRIBIR_TRABAJADORES": {
      return Object.assign({}, state, {
        isOpenModalSuscribirTrabajadores: action.isOpen,
      });
    }
    case "OPEN_CLOSE_MODAL_ELIMINAR_SUSCRIPCIONES": {
      return Object.assign({}, state, {
        isOpenModalEliminarSuscripcion: action.isOpen,
      });
    }
    case "SET_TYPE_RELATION_FILITER": {
      return Object.assign({}, state, {
        typeUserRelationFilter: action.typeUserRelationFilter,
      });
    }
    default:
      return state;
  }
};

export default DenunciasReducer;
