import { openCloseToast } from "../../../../Global/actions";

import { getEmplyeesByCompanyRut, getExternalEmployees } from "../../../../../services/userRolesApi";
import { getCompanySuscriptions, massiveSuscriptionApi, massiveDeleteApi, massiveExternalDeleteApi, suscribeMultipleUsersApi, getNotificationsOfUser,
  deleteUserSuscriptions, externalWorkerSuscriptionApi, getCompanySuscriptionsExternal, massiveExternalWorkerSuscriptionApi, getNotificationsOfExternalUser,
  deleteExternalUserSuscriptionsApi } from "../../../../../services/NotificacionesApi";

export const loading = (isLoading) => ({
  type: "IS_LOADING_NOTIFICACION_EMPRESA",
  isLoading,
});

export const setSelectedNotification = (selected) => ({
  type: "SET_SELECTED_NOTIFICATION",
  selected,
});

export const setNotificaciones = (notificaciones) => ({
  type: "SET_NOTIFICACIONES",
  notificaciones,
});

export const setUsuarios = (usuarios) => ({
  type: "SET_USUARIOS",
  usuarios,
});
export const setAvaliableUsers = (availableListUser) => ({
  type: "SET_AVAIABLE_LIST_USERS",
  availableListUser,
});

export const openCloseModalSuscripcionMasiva = (isOpen) => ({
  type: "OPEN_CLOSE_MODAL_SUSCRIPCION_MASIVA",
  isOpen,
});

export const openCloseModalSuscribirTrabajadores = (isOpen) => ({
  type: "OPEN_CLOSE_MODAL_SUSCRIBIR_TRABAJADORES",
  isOpen,
});

export const openCloseModalEliminarSuscripciones = (isOpen) => ({
  type: "OPEN_CLOSE_MODAL_ELIMINAR_SUSCRIPCIONES",
  isOpen,
});

export const setSelectedUserNotifications = (list) => ({
  type: "SET_SELECTED_USER_NOTIFICATIONS",
  list,
});
export const setTypeRelationFilter = (typeUserRelationFilter) => ({
  type: "SET_TYPE_RELATION_FILITER",
  typeUserRelationFilter,
});

export const doGetNotificaciones = (CompanyId, selectedGroupId) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await getCompanySuscriptions(CompanyId);
    if (request.status === 200) {
      const result = await request.json();
      if (result.Success) {
        dispatch(setNotificaciones(result.Data));
        if (selectedGroupId) {
          dispatch(setSelectedNotification(result.Data.find((e) => e.NotificationGroupId === selectedGroupId)));
        }
      }
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

export const doGetNotificacionesExternos = (CompanyId, selectedGroupId) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await getCompanySuscriptionsExternal(CompanyId);

    if (request.status === 200) {
      const result = await request.json();
      if (result.Success === true) {
        dispatch(setNotificaciones(result.Data));
        if (selectedGroupId) {
          dispatch(setSelectedNotification(result.Data.find((e) => e.NotificationGroupId === selectedGroupId)));
        }
      } else {
        dispatch(openCloseToast({
          isToastOpen: true,
          msgToast: "No existen suscripciones para trabajadores externos",
          typeStyle: "warning",
        }));
        dispatch(setNotificaciones([]));
      }
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


export const doGetUsuarios = (CompanyId) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await getEmplyeesByCompanyRut(CompanyId);
    if (request.status === 200) {
      const result = await request.json();
      dispatch(setUsuarios(result.Employees));
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
export const doGetUsuariosExternos = (CompanyId) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await getExternalEmployees(CompanyId);
    if (request.status === 200) {
      const result = await request.json();
      const ExternalWorkers = [];

      result.Data.forEach((i) => {
        if (i.Name !== "" && i.LastName !== "" && i.Email !== "") {
          ExternalWorkers.push({
            BranchId: i.BranchId,
            Cellphone: i.Cellphone,
            CompanyName: i.CompanyName,
            CompanyRut: i.CompanyRut,
            CreationDate: i.CreationDate,
            Email: i.Email,
            Id: i.Id,
            LastName: i.LastName,
            Name: i.Name,
            NotificationGroupCode: i.NotificationGroupCode,
            NotificationGroupDesc: i.NotificationGroupDesc,
            NotificationGroupId: i.NotificationGroupId,
            EmployeeName: `${i.Name} ${i.LastName}`,
          });
        }
      });

      if (ExternalWorkers.length === 0) {
        dispatch(openCloseToast({
          isToastOpen: true,
          msgToast: "No existen trabajadores",
          typeStyle: "warning",
        }));
      }
      dispatch(setUsuarios(ExternalWorkers));
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
export const doMultipleUserSubscription = (groupName, data, closeModalCallback) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await suscribeMultipleUsersApi(data);
    if (request.status === 200) {
      const result = await request.json();
      if (result.Success) {
        closeModalCallback();
        dispatch(doGetNotificaciones(data.CompanyRut, data.NotificationGroupId));
        dispatch(openCloseToast({
          isToastOpen: true,
          msgToast: `Los trabajadores se han suscrito a ${groupName}.`,
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
  dispatch(loading(false));
};
export const doUpdateUserSuscriptions = (
  {
    userName, userRut, companyId, sucursalId, selectedSuscriptions, oldSuscriptions,
  },
  closeModalCallback,
) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const newSubs = [];
    const deletedSubs = [];

    selectedSuscriptions.forEach((newSub) => {
      const oldSub = oldSuscriptions.find((e) => e.NotificationGroupId === newSub.NotificationGroupId);
      if (oldSub.Subscriptors.length === 0) {
        newSubs.push(newSub.NotificationGroupId);
      }
    });

    oldSuscriptions.forEach((oldSub) => {
      const newSub = selectedSuscriptions.find((e) => e.NotificationGroupId === oldSub.NotificationGroupId);
      if (oldSub.Subscriptors.length > 0 && !newSub) {
        deletedSubs.push(oldSub.NotificationGroupId);
      }
    });

    let newSuccess = false;
    let deleteSuccess = false;

    if (newSubs.length) {
      const newSuscriptions = {
        NotificationGroupsId: newSubs,
        EmployeesRut: [
          userRut,
        ],
        CompanyRut: companyId,
        BranchId: sucursalId,
      };
      const requestNewSubs = await massiveSuscriptionApi(newSuscriptions);
      if (requestNewSubs.status === 200) {
        const resultNewSubs = await requestNewSubs.json();
        if (resultNewSubs.Success) newSuccess = true;
      }
    }

    if (deletedSubs.length) {
      const deletedSuscriptions = {
        EmployeeRut: userRut,
        CompanyRut: companyId,
        NotificationGroupsId: deletedSubs,
      };
      const requestDelete = await deleteUserSuscriptions(deletedSuscriptions);
      if (requestDelete.status === 200) {
        const resultDelete = await requestDelete.json();
        if (resultDelete.Success) deleteSuccess = true;
      }
    }

    if (deleteSuccess || newSuccess) {
      dispatch(doGetNotificaciones(companyId));
      closeModalCallback();
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: `Las suscripciones de ${userName} fueron actualizadas`,
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

export const doUpdateExternalUserSuscriptions = (Data, closeModalCallback) => async (dispatch) => {
  try {
    const newSubs = [];
    const deletedSubs = [];

    const selectedSuscriptions = Data.selectedSuscriptions;
    const oldSuscriptions = Data.oldSuscriptions;


    selectedSuscriptions.forEach((newSub) => {
      const oldSub = oldSuscriptions.find((e) => e.NotificationGroupId === newSub.NotificationGroupId);
      if (oldSub.Subscriptors.length === 0) {
        newSubs.push(newSub.NotificationGroupId);
      }
    });

    oldSuscriptions.forEach((oldSub) => {
      const newSub = selectedSuscriptions.find((e) => e.NotificationGroupId === oldSub.NotificationGroupId);
      if (oldSub.Subscriptors.length > 0 && !newSub) {
        deletedSubs.push(oldSub.NotificationGroupId);
      }
    });

    let newSuccess = false;
    let deleteSuccess = false;

    if (newSubs.length) {
      const newSuscriptions = {
        NotificationGroupIds: newSubs,
        BranchId: Data.BranchId,
        CompanyRut: Data.CompanyRut,
        Name: Data.Name,
        LastName: Data.LastName,
        Email: Data.Email,
        Cellphone: Data.Cellphone,
      };
      const requestNewSubs = await massiveExternalWorkerSuscriptionApi(newSuscriptions);
      if (requestNewSubs.status === 200) {
        const resultNewSubs = await requestNewSubs.json();
        if (resultNewSubs.Success) newSuccess = true;
      }
    }

    if (deletedSubs.length) {
      const deletedSuscriptions = {
        ExternalEmail: Data.Email,
        CompanyRut: Data.CompanyRut,
        NotificationGroupsId: deletedSubs,
      };
      const requestDelete = await deleteExternalUserSuscriptionsApi(deletedSuscriptions);
      if (requestDelete.status === 200) {
        const resultDelete = await requestDelete.json();
        if (resultDelete.Success) deleteSuccess = true;
      }
    }

    if (deleteSuccess || newSuccess) {
      dispatch(doGetNotificacionesExternos(Data.CompanyRut));
      closeModalCallback();
      dispatch(openCloseToast({
        isToastOpen: true,
        msgToast: `Las suscripciones de ${Data.Name} ${Data.LastName} fueron actualizadas`,
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
export const doMassiveSuscription = (data, closeModalCallback) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await massiveSuscriptionApi(data);
    if (request.status === 200) {
      const result = await request.json();
      if (result.Success) {
        closeModalCallback();
        dispatch(doGetNotificaciones(data.CompanyRut));
        dispatch(openCloseToast({
          isToastOpen: true,
          msgToast: "Los trabajadores se han suscrito a las notificaciones.",
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
  dispatch(loading(false));
};

export const doExternaMassiveSuscrition = (data, closeModalCallback) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await massiveExternalWorkerSuscriptionApi(data);
    if (request.status === 200) {
      const result = await request.json();
      if (result.Success) {
        closeModalCallback();
        dispatch(doGetUsuariosExternos(data.CompanyRut));
        dispatch(doGetNotificacionesExternos(data.CompanyRut));
        dispatch(openCloseToast({
          isToastOpen: true,
          msgToast: `${data.Name} ${data.LastName} se ha suscrito a las notificaciones seleccionadas.`,
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
  dispatch(loading(false));
};
export const doExternalWorkSuscription = (data, closeModalCallback) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await externalWorkerSuscriptionApi(data);
    if (request.status === 200) {
      const result = await request.json();
      if (result.Success) {
        closeModalCallback();
        dispatch(doGetUsuariosExternos(data.CompanyRut));
        dispatch(doGetNotificacionesExternos(data.CompanyRut, data.NotificationGroupId));
        dispatch(openCloseToast({
          isToastOpen: true,
          msgToast: `${data.Name} ${data.LastName} se ha suscrito a las notificaciones.`,
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
  dispatch(loading(false));
};

export const doMassiveDeleteExternalWorkers = (data, closeModalCallback) => async (dispatch) => {
  dispatch(loading(true));

  try {
    const dataDos = {
      ExternalnotificationsIds: data.arrayAsignaciones,
    };

    const request = await massiveExternalDeleteApi(dataDos);
    if (request.status === 200) {
      const result = await request.json();

      if (result.Success) {
        closeModalCallback();
        dispatch(doGetNotificacionesExternos(data.CompanyRut, data.NotificationGroupId));
        dispatch(openCloseToast({
          isToastOpen: true,
          msgToast: "Se han eliminado las suscripciones de los trabajadores seleccionados",
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
  dispatch(loading(false));
};
export const doMassiveDelete = (data, closeModalCallback) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await massiveDeleteApi(data);
    if (request.status === 200) {
      const result = await request.json();
      if (result.Success) {
        closeModalCallback();
        dispatch(doGetNotificaciones(data.CompanyRut, data.NotificationGroupId));
        dispatch(openCloseToast({
          isToastOpen: true,
          msgToast: "Se han eliminado las suscripciones de los trabajadores seleccionados",
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
  dispatch(loading(false));
};

export const doGetUserSuscriptions = (selectedUser, companyId) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await getNotificationsOfUser(selectedUser.Rut, companyId);
    if (request.status === 200) {
      const result = await request.json();
      if (result.Success) {
        dispatch(setSelectedUserNotifications(result.Data));
      }
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

export const doGetExternalUserSuscriptions = (selectedUser, companyId) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const request = await getNotificationsOfExternalUser(companyId, selectedUser.Email);
    if (request.status === 200) {
      const result = await request.json();
      if (result.Success) {
        dispatch(setSelectedUserNotifications(result.Data));
      }
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
