import defaultState from "./state";

const DenunciasReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOADING_DENUNCIAS_EMPRESA": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }
    case "SET_DENUNCIAS_EMPRESA": {
      return Object.assign({}, state, {
        listaDenuncias: action.listaDenuncias,
        totalDenuncias: action.total,
        filtrosDenuncias: action.filtros,
      });
    }
    case "OPEN_CLOSE_MODAL_BORRADOR": {
      return Object.assign({}, state, {
        isOpenModalBorrador: action.isOpen,
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
      const nextStep = state.activeStep + 1;
      return Object.assign({}, state, {
        activeStep: nextStep,
        lastCompletedStep: nextStep > state.lastCompletedStep ? nextStep : state.lastCompletedStep,
      });
    }
    case "LAST_STEP": {
      return Object.assign({}, state, {
        activeStep: state.activeStep - 1,
      });
    }
    case "SET_DATA_NEW_COMPLAIN": {
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
    case "EDITING_DRAFT": {
      return Object.assign({}, state, {
        editingDraft: action.editing,
      });
    }
    case "SET_TIPO_DENUNCIA": {
      return Object.assign({}, state, {
        selectedTipoDenuncia: action.tipo,
      });
    }
    case "SET_DATA_TRABAJADOR": {
      return Object.assign({}, state, {
        dataTrabajador: action.data,
      });
    }
    case "UPDATE_DATA_GRID_DENUNCIAS": {
      return Object.assign({}, state, {
        shouldUpdateDataGrid: action.update,
      });
    }
    case "SET_PENDING_COMPLAINTS": {
      return Object.assign({}, state, {
        pendingComplaints: action.complaints,
      });
    }
    case "DISABLE_NEW_COMPLAINT_BUTTON": {
      return Object.assign({}, state, {
        disableContinueNewComplaint: action.disable,
      });
    }
    case "SET_CLEAN_DATA_COMPLAIN": {
      return Object.assign({}, state, {
        isModified: false,
        isOpenModalBorrador: false,
        lastCompletedStep: 1,
        activeStep: 0,
        editingDraft: false,
        dataTrabajador: {},
        pendingComplaints: [],
        jsonData: {
          formInfoDenuncia: {},
          formInfoTrabajador: {},
          formDatoSiniestro: {},
          formDatosEmpresa: {},
          formDenunciante: {},
          formDatosEnfermedad: {},
        },
      });
    }

    default:
      return state;
  }
};

export default DenunciasReducer;
