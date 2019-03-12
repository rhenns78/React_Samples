import defaultState from "./state";

const globalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GLOBAL_ACTUALIZAR_DATOS_USUARIO": {
      const userData = { ...action.userData };
      return Object.assign({}, state, {
        userData,
      });
    }
    case "OPEN_CLOSE_TOAST": {
      const toast = { ...action.toast };
      return Object.assign({}, state, {
        toast,
      });
    }
    case "LOADING": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }
    case "SET_COMPANY_LIST": {
      return Object.assign({}, state, {
        listaEmpresas: action.listaEmpresas,
      });
    }
    case "SET_SELECTED_COMPANY": {
      return Object.assign({}, state, {
        companyId: action.companyId,
        companyName: action.companyName,
      });
    }
    case "SET_SUCURSALID": {
      return Object.assign({}, state, {
        sucursalId: action.sucursalId,
        sucursalName: action.sucursalName,
      });
    }
    case "SET_COLOR": {
      return Object.assign({}, state, {
        botomBorderColor: action.botomBorderColor,
      });
    }
    case "SET_USER_FUNCTIONALITIES": {
      return Object.assign({}, state, {
        userAccessIds: action.ids,
      });
    }
    case "SET_PREVENT_NAVIGATION": {
      return Object.assign({}, state, {
        preventNavigation: action.preventNavigation,
      });
    }
    case "SET_ALL_LIST": {
      const list = { ...action.list };

      return Object.assign({}, state, {

        listaProfesiones: list.ListadoProfesiones,
        listaAfp: list.ListadoAfps,
        listaRegion: list.Regiones,
        listaEstadoCivil: list.EstadosCiviles,
        listaBancos: list.ListaBancos,
        listaTipoJornada: list.ListaJornadas,
        listaRubro: list.ListaRubros,
        listaParentesco: list.ListaParentescos,
        listaComuna: list.Comunas,
        listadoSucursales: list.listadoSucursales,

        listaSexos: list.listaSexos,
        listaNacionalidades: list.listaNacionalidades,
        listaPueblosOriginarios: list.listaPueblosOriginarios,
        listaTiposCalle: list.listaTiposCalle,
        listaClasificacionesAccidentes: list.listaClasificacionesAccidentes,
        listaMediosPrueba: list.listaMediosPrueba,
        listaTiposCuenta: list.listaTiposCuenta,
        listaTiposContrato: list.listaTiposContrato,
        listaCategoriasOcupacionales: list.listaCategoriasOcupacionales,
        listaTiposIngreso: list.listaTiposIngreso,
        listaDirecciones: list.listaDirecciones,


      });
    }
    case "SET_SUCURSALES_LIST": {
      return Object.assign({}, state, {
        listadoSucursales: action.list,
      });
    }
    case "SET_SUCURSALES_OF_COMPANY": {
      return Object.assign({}, state, {
        companySucursales: action.list,
        sucursalId: "",
        sucursalName: null,
      });
    }
    case "RESET_GLOBAL_STATE": {
      return defaultState;
    }
    case "SET_EXPANDED": {
      return Object.assign({}, state, {
        isExpanded: action.expand,
      });
    }
    default:
      return state;
  }
};

export default globalReducer;
