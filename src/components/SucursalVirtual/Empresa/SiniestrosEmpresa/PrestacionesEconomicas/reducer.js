import defaultState from "./state";

const PrestacionEmpresaReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOADING_PRESTACIONES_EMPRESA": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }
    case "SET_TIPO_PRESTACION": {
      return Object.assign({}, state, {
        selectedTipoPrestacion: action.tipo,
      });
    }
    case "SET_PRESTACIONES_EMPRESA": {
      return Object.assign({}, state, {
        listaPrestaciones: action.listaPrestaciones,
        totalPrestaciones: action.total,
        filtrosPrestaciones: action.filtros,
      });
    }

    case "OPEN_CLOSE_MODAL_BORRADOR": {
      return Object.assign({}, state, {
        isOpenModalBorrador: action.isOpen,
      });
    }
    case "EDITING_DRAFT": {
      return Object.assign({}, state, {
        editingDraft: action.editing,
      });
    }
    case "OPEN_CLOSE_MODAL_CONTINUE": {
      return Object.assign({}, state, {
        isOpenModalContinue: action.isOpen,
      });
    }
    case "OPEN_CLOSE_MODAL_DELETE": {
      return Object.assign({}, state, {
        isOpenModalDelete: action.isOpen,
      });
    }

    case "SET_CLEAN_DATA_DRAFT": {
      return Object.assign({}, state, {
        isModified: false,
        isOpenModalBorrador: false,
        lastCompletedStep: 1,
        activeStep: 0,
        editingDraft: false,

        jsonData: {
          Id: null,
          idFinancialBenefit: null,
          monthsDisplay: [],
          middleStepsEnabled: true,
          fechaSiniestro: null,
          formInfoTrabajador: {},
          formInfoLaboral: {},
          formInfoPrevisional: {},
          formEnvioDocumento: {},
          currentStep: 1,
        },
      });
    }

    case "SET_SHOWHIDE_FORM": {
      const actualState = { ...state };
      if (!action.showHideForm) actualState.activeStep = 1;
      return Object.assign({}, state, {
        showHideForm: action.showHideForm,
        activeStep: actualState.activeStep,
      });
    }
    case "SET_STEP": {
      let maxStep = state.lastCompletedStep;
      if (action.step > state.lastCompletedStep) maxStep = action.step;
      return Object.assign({}, state, {
        activeStep: action.step,
        lastCompletedStep: maxStep,
      });
    }
    case "NEXT_STEP": {
      const middleStepsEnabled = state.jsonData.middleStepsEnabled;
      const nextStep = middleStepsEnabled === false ? state.lastStep : state.activeStep + 1;

      return Object.assign({}, state, {
        activeStep: nextStep,
        lastCompletedStep: nextStep > state.lastCompletedStep ? nextStep : state.lastCompletedStep,
      });
    }
    case "LAST_STEP": {
      const middleStepsEnabled = state.jsonData.middleStepsEnabled;
      const backStep = middleStepsEnabled === false ? 1 : state.activeStep - 1;

      return Object.assign({}, state, {
        activeStep: backStep,
      });
    }


    case "SET_JSON_DATA": {
      return Object.assign({}, state, {
        jsonData: action.jsonData,
        isModified: true,
      });
    }
    case "SET_DRAFT": {
      return Object.assign({}, state, {
        jsonData: action.jsonData,
        lastCompletedStep: action.jsonData.lastCompletedStep,
      });
    }
    case "SET_DOCUMENT_LIST": {
      return Object.assign({}, state, {
        listaDocumentosIngresados: action.listaDocumentosIngresados,
      });
    }

    default:
      return state;
  }
};

export default PrestacionEmpresaReducer;
