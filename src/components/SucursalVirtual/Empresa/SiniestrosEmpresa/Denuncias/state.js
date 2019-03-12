export default {
  isLoading: false,
  shouldUpdateDataGrid: false,
  listaDenuncias: [],
  showHideForm: false,
  isOpenModalBorrador: false,
  isOpenModalContinue: false,
  isOpenModalDelete: false,
  editingDraft: false,
  filtrosDenuncias: null,
  totalDenuncias: null,
  selectedTipoDenuncia: {
    icon: "error", name: "Denuncias pendientes",
  },
  activeStep: 1,
  lastCompletedStep: 1,
  steps: [
    {
      id: 1, text: "Información de la denuncia", subtext: "Ingrese los datos requeridos para crear una nueva denuncia",
    },
    {
      id: 2, text: "Información del trabajador", subtext: "Debes llenar toda la información del trabajador que se ha accidentado",
    },
    {
      id: 3, text: "Datos del accidente", text2: "Datos de la enfermedad", subtext: "Describa de la forma más detallada los hechos que ocurrieron",
    },
    {
      id: 4, text: "Denunciante", subtext: "Información de la persona que realiza la denuncia del siniestro",
    },
    {
      id: 5, text: "Datos de la empresa", subtext: "Información de la empresa que realiza la denuncia del siniestro",
    },
    {
      id: 6, text: "Enviar denuncia", subtext: null,
    },
  ],
  isModified: false,
  dataTrabajador: {},
  disableContinueNewComplaint: false,
  pendingComplaints: [],
  jsonData: {
    Id: null,
    formInfoDenuncia: {},
    formInfoTrabajador: {},
    formDatoSiniestro: {},
    formDatosEmpresa: {},
    formDenunciante: {},
    formDatosEnfermedad: {},
    currentStep: 1,
  },
};
