const globalState = {
  isLoading: false,
  userAccessIds: null,
  isExpanded: true,
  botomBorderColor: "#8D004C",
  toast: {
    isToastOpen: false,
    msgToast: null,
    typeStyle: null,
  },
  listaEmpresas: null,
  companyName: null,
  companyId: null,
  sucursalId: "",
  sucursalName: null,
  companySucursales: [],
  userData: {
    LoginSuccess: false,
    AccessToken: null,
    RefreshToken: null,
    RUT: null,
    Email: null,
    FirstName: null,
    LastName: null,
    TempBD: false,
    DateLogIn: null,
  },
  preventNavigation: false,
  showGraph: false,

  // Listas de combos
  listaProfesiones: [], // no esta
  listaAfp: [], // ok
  listaRegion: [], // ok
  listaEstadoCivil: [], // ok
  listaBancos: [], // ok
  listaTipoJornada: [],
  listaRubro: [], // ok
  listaParentesco: [],
  listaComuna: [], // ok
  listadoSucursales: [],

  listaSexos: [],
  listaNacionalidades: [],
  listaPueblosOriginarios: [],
  listaTiposCalle: [],
  listaClasificacionesAccidentes: [],
  listaMediosPrueba: [],
  listaTiposCuenta: [],
  listaTiposContrato: [],
  listaCategoriasOcupacionales: [],
  listaTiposIngreso: [],
  listaDirecciones: [],

  // isapres & tipocuenta no estan

};

export default globalState;
