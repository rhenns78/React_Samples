import { GetPrestacionesApi } from "../../../../../services/SiniestrosEmpresa";
// import apiConfig from "../../../../../config/api";
import {
  GetDraftDocument, CreateDraftDocuments, DeleteDraftComplaint, UpdateDraftDocument,
  doUploadDocumentApi, doGetUploadDocumentApi, doDeleteFileApi, doDeleteContainerApi,
} from "../../../../../services/PrestacionesEconomicasApi";
import { openCloseToast } from "../../../../Global/actions";
import { getUserInfo } from "../../../../../services/misDatosApi";
import validaciones from "../../../../../helpers/validaciones";

export const loading = (isLoading) => ({
  type: "LOADING_PRESTACIONES_EMPRESA",
  isLoading,
});

export const setPrestacionesEmpresa = (listaPrestaciones, filtros, total) => ({
  type: "SET_PRESTACIONES_EMPRESA",
  listaPrestaciones,
  filtros,
  total,
});

export const setTipoPrestacion = (tipo) => ({
  type: "SET_TIPO_PRESTACION",
  tipo,
});
export const setCleanDataDraft = () => ({
  type: "SET_CLEAN_DATA_DRAFT",
});
export const openCloseModalBorrador = (isOpen) => ({
  type: "OPEN_CLOSE_MODAL_BORRADOR",
  isOpen,
});
export const openCloseModalContinue = (isOpen) => ({
  type: "OPEN_CLOSE_MODAL_CONTINUE",
  isOpen,
});
export const openCloseModalDelete = (isOpen) => ({
  type: "OPEN_CLOSE_MODAL_DELETE",
  isOpen,
});
export const editingDraft = (editing) => ({
  type: "EDITING_DRAFT",
  editing,
});

export const setStep = (step) => ({
  type: "SET_STEP",
  step,
});
export const setShowHideForm = (showHideForm) => ({

  type: "SET_SHOWHIDE_FORM",
  showHideForm,
});
export const setDataForms = (jsonData) => ({
  type: "SET_JSON_DATA",
  jsonData,
});

export const nextStep = () => ({
  type: "NEXT_STEP",
});

export const lastStep = () => ({
  type: "LAST_STEP",
});

export const setDraft = (jsonData) => ({
  type: "SET_DRAFT",
  jsonData,
});

export const setDocumentList = (listaDocumentosIngresados) => ({
  type: "SET_DOCUMENT_LIST",
  listaDocumentosIngresados,
});


export const doGetFinancialbenefits = (filtros) => async (dispatch) => {
  dispatch(loading(true));

  try {
    const request = await GetPrestacionesApi(filtros);
    if (request.status === 200) {
      const result = await request.json();
      dispatch(setPrestacionesEmpresa(result.PrestacionesEconomicas));
    }
  } catch (error) {
    console.log(error);
  }
  dispatch(loading(false));
};


export const doGetDraft = (data) => async (dispatch) => {
  dispatch(loading(true));
  const toast = {};
  try {
    const request = await GetDraftDocument(data.employeeRut, data.companyRut, data.userRut, data.idFinancialBenefit);
    if (request.status === 200) {
      let form = {};
      const result = await request.json();

      if (result.FinancialBenefit) {
        form = JSON.parse(result.FinancialBenefit.JsonData);
        form.Id = result.FinancialBenefit.Id;

        dispatch(setDraft(form));
        dispatch(setStep(form.currentStep));
        dispatch(editingDraft(true));
        dispatch(openCloseModalContinue(true));
      } else {
        const responseGetUser = await getUserInfo("11764068-K");
        const resultGetUser = await responseGetUser.json();
        const newJsonData = { ...data.jsonData };
        if (responseGetUser.status === 200) {
          if (resultGetUser.Success) {
            const infoUser = {
              Rut: validaciones.formatRut(resultGetUser.Profile.Rut, { showDots: true, showHyphen: true }),
              FirstName: resultGetUser.Profile.Name,
              LastName: resultGetUser.Profile.FatherLastName,
              Bank: resultGetUser.Profile.Payment.Bank.Description,
              AccountType: resultGetUser.Profile.Payment.AccountType.Description,
              AccountNumber: resultGetUser.Profile.Payment.AccountNumber,
              FormaPago: resultGetUser.Profile.Payment.Bank.Description ? "Transferencia electrónica" : null,

            };

            dispatch(setStep(1));
            dispatch(setShowHideForm(true));
            newJsonData.fechaSiniestro = data.fechaSiniestro;
            newJsonData.idFinancialBenefit = data.idFinancialBenefit;
            newJsonData.formInfoPrevisional = {
              checkAllMonth: false,
            };
            newJsonData.formInfoTrabajador = {
              ...infoUser,
            };

            dispatch(setDataForms(newJsonData));
          } else {
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
      }
    }
    if (request.status === 500) {
      toast.isToastOpen = true;
      toast.msgToast = "Error de conexión, intente mas tarde";
      toast.typeStyle = "error";
      dispatch(openCloseToast(toast));
    }
  } catch (error) {
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
    const request = await CreateDraftDocuments(Data);
    if (request.status === 200) {
      if (showNotification) {
        toast.isToastOpen = true;
        toast.msgToast = "Creación de borrador realizada";
        toast.typeStyle = "success";
        dispatch(openCloseToast(toast));
        dispatch(setCleanDataDraft());
        dispatch(setShowHideForm(false));
        dispatch(openCloseModalBorrador(false));
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
    const request = await UpdateDraftDocument(Data);
    if (request.status === 200) {
      if (showNotification) {
        dispatch(openCloseToast({
          isToastOpen: true,
          msgToast: "Borrador actualizado",
          typeStyle: "success",
        }));

        dispatch(setCleanDataDraft());
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

export const doDeleteDraft = (IdDraftFinancialBenefit, data) => async (dispatch) => {
  dispatch(loading(true));
  try {
    if (IdDraftFinancialBenefit) {
      const request = await DeleteDraftComplaint(IdDraftFinancialBenefit);
      if (request.status === 200) {
        const requestConatiner = await doDeleteContainerApi(data);
        if (requestConatiner.status === 200) {
          dispatch(openCloseToast({
            isToastOpen: true,
            msgToast: "Borrador y documentos eliminados",
            typeStyle: "success",
          }));
        } else {
          dispatch(openCloseToast({
            isToastOpen: true,
            msgToast: "Borrador Eliminado",
            typeStyle: "success",
          }));
        }

        dispatch(setCleanDataDraft());
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
      dispatch(setCleanDataDraft());
      dispatch(setShowHideForm(false));
      dispatch(openCloseModalBorrador(false));
    }
  } catch (e) {
    console.log(e);
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente más tarde",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

export const doGetDocuements = (data) => async (dispatch) => {
  // dispatch(loading(true));
  try {
    const request = await doGetUploadDocumentApi(data.rutUsuario, data.rutTrabajador, data.idPrestacion);
    if (request.status === 200) {
      const result = await request.json();
      const lista = [];
      if (result.ListaDocumentos && result.ListaDocumentos.length > 0) {
        result.ListaDocumentos.forEach((element) => {
          lista.push({
            Nombre: element.Nombre.replace(/%20/g, " "),
            Uri: element.Uri,

          });
        });
        dispatch(setDocumentList(lista));
      }
    }
  } catch (e) {
    console.log(e);
    // dispatch(openCloseToast({
    //   isToastOpen: true,
    //   msgToast: "Error de conexión, intente más tarde",
    //   typeStyle: "error",
    // }));
  }
  // dispatch(loading(false));
};
export const doUploadFile = (data) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const newFile = new FormData();

    newFile.append("files", data.files);
    newFile.append("rutTrabajador", data.rutTrabajador);
    newFile.append("rutUsuario", data.rutUsuario);
    newFile.append("idPrestacion", data.idPrestacion);
    const response = await doUploadDocumentApi(newFile);
    if (response.status === 200) {
      dispatch(doGetDocuements({
        rutTrabajador: data.rutTrabajador,
        rutUsuario: data.rutUsuario,
        idPrestacion: data.idPrestacion,
      }));
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: "Documento ingresado",
        typeStyle: "success",
      }));
    }
  } catch (e) {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente más tarde",
      typeStyle: "error",
    }));
  }
  dispatch(loading(false));
};

export const doDeleteSingleFile = (data, showNotification) => async (dispatch) => {
  if (showNotification) dispatch(loading(true));
  try {
    const request = await doDeleteFileApi(data);
    if (request.status === 200) {
      if (showNotification) {
        dispatch(doGetDocuements({
          rutTrabajador: data.rutTrabajador,
          rutUsuario: data.rutUsuario,
          idPrestacion: data.idPrestacion,
        }));
        dispatch(openCloseToast({
          isToastOpen: true,
          msgToast: "Documento Eliminado",
          typeStyle: "success",
        }));
      }
    }
  } catch (e) {
    dispatch(openCloseToast({
      isToastOpen: true,
      msgToast: "Error de conexión, intente más tarde",
      typeStyle: "error",
    }));
  }
  if (showNotification) dispatch(loading(false));
};

