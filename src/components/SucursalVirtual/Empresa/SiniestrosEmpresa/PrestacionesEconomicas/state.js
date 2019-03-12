export default {
  isLoading: false,
  listaPrestaciones: [],
  filtrosPrestaciones: null,
  totalPrestaciones: 0,
  selectedTipoPrestacion: { icon: "error", name: "Prestaciones pendientes" },

  showHideForm: false,
  isOpenModalBorrador: false,
  isOpenModalContinue: false,
  isOpenModalDelete: false,
  editingDraft: false,
  activeStep: 1,
  lastStep: 4,
  lastCompletedStep: 1,
  steps: [
    {
      id: 1, text: "Información del trabajador", subtext: "Ingrese la información del trabajador que recibirá la prestación económica",
    },
    {
      id: 2, text: "Información laboral", subtext: "Ingresar la información laboral del trabajador que recibirá la prestación",
    },
    {
      id: 3, text: "Información previsional", subtext: "Ingrese la información previsional del trabajdor",
    },
    {
      id: 4, text: "Enviar documentación", subtext: "Envio de toda la documentación antes completada",
    },

  ],
  isModified: false,
  listaDocumentosIngresados: [],
  jsonData: {
    Id: null,
    idFinancialBenefit: null,
    monthsDisplay: [],
   
    middleStepsEnabled: true,
    fechaSiniestro: null,
    formInfoTrabajador: {},
    formInfoLaboral: {},
    formInfoPrevisional: {
      checkAllMonth: false,
    },
    formEnvioDocumento: {},
    currentStep: 1,
    step1Complete: false,
    step2Complete: false,
    step3Complete: false,
    step4Complete: false,
    container: null,
  },


};

