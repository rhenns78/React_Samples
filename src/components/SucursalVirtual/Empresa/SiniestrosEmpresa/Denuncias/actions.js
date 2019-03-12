import Moment from "moment";
import { GetDenunciasApi, CreateDraftComplains, GetDraftComplains, UpdateDraftComplaint, DeleteDraftComplaint, GetDenunciasPendientesTrabajador } from "../../../../../services/denunciasApi";
import { openCloseToast, getLists } from "../../../../Global/actions";
import { getUserInfo } from "../../../../../services/misDatosApi";
import validaciones from "../../../../../helpers/validaciones";

export const loading = (isLoading) => ({
  type: "LOADING_DENUNCIAS_EMPRESA",
  isLoading,
});

export const nextStep = () => ({
  type: "NEXT_STEP",
});

export const lastStep = () => ({
  type: "LAST_STEP",
});

export const setStep = (step) => ({
  type: "SET_STEP",
  step,
});

export const setDenunciasEmpresa = (listaDenuncias, filtros, total) => ({
  type: "SET_DENUNCIAS_EMPRESA",
  listaDenuncias,
  filtros,
  total,
});
export const setShowHideForm = (showHideForm) => ({
  type: "SET_SHOWHIDE_FORM",
  showHideForm,
});

export const setDataNewComplain = (jsonData) => ({
  type: "SET_DATA_NEW_COMPLAIN",
  jsonData,
});

export const setDraft = (jsonData) => ({
  type: "SET_DRAFT",
  jsonData,
});
export const setCleanDataComplain = () => ({
  type: "SET_CLEAN_DATA_COMPLAIN",
});

export const openCloseModalBorrador = (isOpen) => ({
  type: "OPEN_CLOSE_MODAL_BORRADOR",
  isOpen,
});

export const editingDraft = (editing) => ({
  type: "EDITING_DRAFT",
  editing,
});

export const setDataTrabajador = (data) => ({
  type: "SET_DATA_TRABAJADOR",
  data,
});

export const updateDataGridDenuncias = (update) => ({
  type: "UPDATE_DATA_GRID_DENUNCIAS",
  update,
});

export const setPendingComplaints = (complaints) => ({
  type: "SET_PENDING_COMPLAINTS",
  complaints,
});

export const disableNewComplaintButton = (disable) => ({
  type: "DISABLE_NEW_COMPLAINT_BUTTON",
  disable,
});

export const openCloseModalContinue = (isOpen) => ({
  type: "OPEN_CLOSE_MODAL_CONTINUE",
  isOpen,
});

export const openCloseModalDelete = (isOpen) => ({
  type: "OPEN_CLOSE_MODAL_DELETE",
  isOpen,
});

export const setTipoDenuncia = (tipo) => ({
  type: "SET_TIPO_DENUNCIA",
  tipo,
});

export const callListMyData = (rutUsuario, lista) => async (dispatch) => {
  await dispatch(getLists(lista));
};

export const doGetComplaint = (filtros) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await GetDenunciasApi(filtros);
    if (request.status === 200) {
      const result = await request.json();
      dispatch(setDenunciasEmpresa(result.ListaDenuncias));
    }
  } catch (error) {
    console.log(error);
  }
  dispatch(loading(false));
};

export const doGetDraft = (CompanyId, rutTrabajador) => async (dispatch) => {
  dispatch(loading(true));
  const toast = {};
  try {
    const request = await GetDraftComplains(CompanyId, rutTrabajador);
    if (request.status === 200) {
      let form = {};
      const result = await request.json();

      form = JSON.parse(result.Complaint.JsonData);
      form.Id = result.Complaint.Id;
      console.log(form);

      dispatch(setDraft(form));
      dispatch(setStep(form.currentStep));
      dispatch(editingDraft(true));
      dispatch(openCloseModalContinue(true));

      // dispatch(setShowHideForm(true));
    }
    if (request.status === 500) {
      toast.isToastOpen = true;
      toast.msgToast = "Error de conexión, intente mas tarde";
      toast.typeStyle = "error";
      dispatch(openCloseToast(toast));
    }
  } catch (error) {
    console.log(error);
    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión, intente mas tarde";
    toast.typeStyle = "error";
    dispatch(openCloseToast(toast));
  }
  dispatch(loading(false));
};

export const doCreateDraft = (Data, showNotification) => async (dispatch) => {
  if (showNotification) dispatch(loading(true));
  const toast = {};
  try {
    const request = await CreateDraftComplains(Data);
    if (request.status === 200) {
      if (showNotification) {
        toast.isToastOpen = true;
        toast.msgToast = "Creación de borrador realizada";
        toast.typeStyle = "success";
        dispatch(openCloseToast(toast));

        dispatch(setCleanDataComplain());
        dispatch(setShowHideForm(false));
        dispatch(openCloseModalBorrador(false));
        dispatch(updateDataGridDenuncias(true));
      }
    }
    if (request.status === 500) {
      if (showNotification) {
        toast.isToastOpen = true;
        toast.msgToast = "Error de conexión, intente mas tarde";
        toast.typeStyle = "error";
        dispatch(openCloseToast(toast));
      }
    }
  } catch (error) {
    console.log(error);
    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión, intente mas tarde";
    toast.typeStyle = "error";
    dispatch(openCloseToast(toast));
  }
  if (showNotification) dispatch(loading(false));
};

export const doUpdateDraft = (Data, showNotification) => async (dispatch) => {
  if (showNotification) dispatch(loading(true));
  try {
    const request = await UpdateDraftComplaint(Data);
    if (request.status === 200) {
      if (showNotification) {
        dispatch(openCloseToast({
          isToastOpen: true,
          msgToast: "Borrador actualizado",
          typeStyle: "success",
        }));

        dispatch(setCleanDataComplain());
        dispatch(setShowHideForm(false));
        dispatch(openCloseModalBorrador(false));
      }
    } else if (showNotification) {
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Error de conexión, intente mas tarde",
        typeStyle: "error",
      }));
    }
  } catch (e) {
    console.log(e);
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente mas tarde",
      typeStyle: "error",
    }));
  }
  if (showNotification) dispatch(loading(false));
};

export const doDeleteDraft = (idComplaint) => async (dispatch) => {
  dispatch(loading(true));
  try {
    if (idComplaint) {
      const request = await DeleteDraftComplaint(idComplaint);
      if (request.status === 200) {
        dispatch(updateDataGridDenuncias(true));
        dispatch(openCloseToast({
          isToastOpen: true,
          msgToast: "Borrador Eliminado",
          typeStyle: "success",
        }));
        dispatch(setCleanDataComplain());
        dispatch(setShowHideForm(false));
        dispatch(openCloseModalBorrador(false));
      } else {
        dispatch(openCloseToast({
          isToastOpen: true,
          msgToast: "Error de conexión, intente mas tarde",
          typeStyle: "error",
        }));
      }
    } else {
      dispatch(setCleanDataComplain());
      dispatch(setShowHideForm(false));
      dispatch(openCloseModalBorrador(false));
    }
  } catch (e) {
    console.log(e);
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente mas tarde",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

// Llamo datos del trabajador por rut

export const getWorkerData = (showNotifications, jsonData, workerRut) => async (dispatch) => {
  if (showNotifications) dispatch(loading(true));
  const toast = {};
  try {
    const response = await getUserInfo(workerRut);
    const result = await response.json();
    const form = { ...jsonData };

    if (response.status === 200) {
      if (result.Success) {
        const data = {
          Rut: validaciones.formatRut(result.Profile.Rut, { showDots: true, showHyphen: true }),
          FirstName: result.Profile.Name,
          LastName: result.Profile.FatherLastName,
          MothersName: result.Profile.MotherLastName,
          Birthdate: result.Profile.Birthdate,
        };
        form.formInfoTrabajador = {
          ...data,
          ...jsonData.formInfoTrabajador,
        };
        dispatch(setDataTrabajador(data));
        dispatch(setDataNewComplain(form));
      } else if (showNotifications) {
        dispatch(openCloseToast({
          isToastOpen: true,
          msgToast: "No se encontró información del usuario",
          typeStyle: "warning",
        }));
      }
    } else {
      toast.isToastOpen = true;
      toast.msgToast = result.Message;
      toast.typeStyle = "error";
      dispatch(openCloseToast(toast));
    }
  } catch (error) {
    toast.isToastOpen = true;
    toast.msgToast = "Error de conexión, intente mas tarde";
    toast.typeStyle = "error";
    dispatch(openCloseToast(toast));
  }
  if (showNotifications) dispatch(loading(false));
};

export const getDenunciasPendientes = (modalPendientes, complaintType, fechaPresentacion, data) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await GetDenunciasPendientesTrabajador(data);
    if (request.status === 200) {
      const result = await request.json();
      if (result.Success) {
        modalPendientes();
        dispatch(setPendingComplaints(result.Complaints));
        const any = result.Complaints.filter((item) => item.TipoSiniestro === complaintType
          && !Moment(fechaPresentacion).isSame(item.FechaSiniestro));

        if (any.length) {
          dispatch(disableNewComplaintButton(true));
        }
      } else {
        dispatch(nextStep());
      }
    }
  } catch (e) {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente mas tarde",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

