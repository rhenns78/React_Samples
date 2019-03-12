import { combineReducers } from "redux";

// Reducers
import mainReducer from "../components/Main/reducer";
import mapReducer from "../components/Maps/reducer";
import userRegisterReducer from "../components/Acceso/Registro/reducer";
import userTempReducer from "../components/Acceso/RegistroEmpresa/reducer";
import loginReducer from "../components/Acceso/Login/reducer";
import globalReducer from "../components/Global/reducer";
import recoverReducer from "../components/Acceso/RecuperarPassword/reducer";
import solicitudReducer from "../components/SucursalVirtual/Trabajador/Solicitudes/SolicitudesPendientes/reducer";
import activateReducer from "../components/Acceso/ActivarCuenta/reducer";
import AprobarSolicitudesReducer from "../components/SucursalVirtual/Empresa/GestionUsuarios/AprobarSolicitudes/reducer";
import headerReducer from "../components/Header/reducer";
import misDatosReducer from "../components/SucursalVirtual/Trabajador/Perfil/MisDatos/reducer";
import asignacionRolesReducer from "../components/SucursalVirtual/Empresa/GestionUsuarios/AsignacionRoles/reducer";
import mantenedoresReducer from "../components/SucursalVirtual/Mantenedores/General/reducer";
import siniestroReducer from "../components/SucursalVirtual/Trabajador/Siniestros/Siniestro/reducer";
import prestacionesReducer from "../components/SucursalVirtual/Trabajador/Siniestros/Prestaciones/reducer";
import siniestroEmpresaReducer from "../components/SucursalVirtual/Empresa/SiniestrosEmpresa/Siniestros/reducer";
import denunciasEmpresaReducer from "../components/SucursalVirtual/Empresa/SiniestrosEmpresa/Denuncias/reducer";
import prestacionesEmpresaReducer from "../components/SucursalVirtual/Empresa/SiniestrosEmpresa/PrestacionesEconomicas/reducer";
import documentReducer from "../components/SucursalVirtual/Documentos/reducer";
import mantenedorNotificacionesReducer from "../components/SucursalVirtual/Mantenedores/Configuraciones/Notificaciones/reducer";
import pdfReducer from "../components/Pdf/reducer";
import NotificacionesEmpresaReducer from "../components/SucursalVirtual/Empresa/GestionUsuarios/Notificaciones/reducer";
import graficosReducer from "../components/SucursalVirtual/Graficos/reducer";
import resumenEmpresaReducer from "../components/SucursalVirtual/Empresa/SiniestrosEmpresa/Resumen/reducer";
import HistorialNotificacionesReducer from "../components/SucursalVirtual/Trabajador/Notificaciones/HistorialNotificaciones/reducer";
import headerNotificacionesReducer from "../components/Header/Notificaciones/reducer";
import configNotificacionesTrabajadorReducer from "../components/SucursalVirtual/Trabajador/Notificaciones/ConfiguracionNotificaciones/reducer";
import autoasignadasReducer from "../components/SucursalVirtual/Trabajador/EmpresasAchs/Autoasignadas/reducer";

// Default States
import mainState from "../components/Main/state";
import userRegisterState from "../components/Acceso/Registro/state";
import userTempState from "../components/Acceso/RegistroEmpresa/state";
import loginState from "../components/Acceso/Login/state";
import globalState from "../components/Global/state";
import recoverState from "../components/Acceso/RecuperarPassword/state";
import SolicitudState from "../components/SucursalVirtual/Trabajador/Solicitudes/SolicitudesPendientes/state";
import activateState from "../components/Acceso/ActivarCuenta/state";
import AprobarSolicitudesState from "../components/SucursalVirtual/Empresa/GestionUsuarios/AprobarSolicitudes/state";
import headerState from "../components/Header/state";
import misDatosState from "../components/SucursalVirtual/Trabajador/Perfil/MisDatos/state";
import asignacionRolesState from "../components/SucursalVirtual/Empresa/GestionUsuarios/AsignacionRoles/state";
import mantenedoresState from "../components/SucursalVirtual/Mantenedores/General/state";
import siniestroState from "../components/SucursalVirtual/Trabajador/Siniestros/Siniestro/state";
import prestacionesState from "../components/SucursalVirtual/Trabajador/Siniestros/Prestaciones/state";
import siniestroEmpresaState from "../components/SucursalVirtual/Empresa/SiniestrosEmpresa/Siniestros/state";
import denunciasEmpresaState from "../components/SucursalVirtual/Empresa/SiniestrosEmpresa/Denuncias/state";
import prestacionesEmpresaState from "../components/SucursalVirtual/Empresa/SiniestrosEmpresa/PrestacionesEconomicas/state";
import mapState from "../components/Maps/state";
import documentState from "../components/SucursalVirtual/Documentos/state";
import mantenedorNotificacionesState from "../components/SucursalVirtual/Mantenedores/Configuraciones/Notificaciones/state";
import pdfState from "../components/Pdf/state";
import NotificacionesEmpresaState from "../components/SucursalVirtual/Empresa/GestionUsuarios/Notificaciones/state";
import graficosState from "../components/SucursalVirtual/Graficos/state";
import resumenEmpresaState from "../components/SucursalVirtual/Empresa/SiniestrosEmpresa/Resumen/state";
import HistorialNotificacionesState from "../components/SucursalVirtual/Trabajador/Notificaciones/HistorialNotificaciones/state";
import headerNotificacionesState from "../components/Header/Notificaciones/state";
import configNotificacionesTrabajadorState from "../components/SucursalVirtual/Trabajador/Notificaciones/ConfiguracionNotificaciones/state";
import autoasignadasState from "../components/SucursalVirtual/Trabajador/EmpresasAchs/Autoasignadas/state";

export const rootState = {
  main: mainState,
  userRegister: userRegisterState,
  header: headerState,
  userTemp: userTempState,
  login: loginState,
  global: globalState,
  recover: recoverState,
  solicitudes: SolicitudState,
  aprobarSolicitudes: AprobarSolicitudesState,
  activarUser: activateState,
  misDatos: misDatosState,
  asignacionRoles: asignacionRolesState,
  mantenedores: mantenedoresState,
  siniestro: siniestroState,
  siniestroEmpresa: siniestroEmpresaState,
  denuncias: denunciasEmpresaState,
  prestaciones: prestacionesState,
  prestacionesEmpresa: prestacionesEmpresaState,
  map: mapState,
  documentos: documentState,
  mantenedorNotificaciones: mantenedorNotificacionesState,
  pdf: pdfState,
  notificacionesEmpresa: NotificacionesEmpresaState,
  graficos: graficosState,
  resumenEmpresa: resumenEmpresaState,
  historialNotificaciones: HistorialNotificacionesState,
  headerNotificaciones: headerNotificacionesState,
  configNotificacionesTrabajador: configNotificacionesTrabajadorState,
  empresasAutoasignadas: autoasignadasState,
};

export const rootReducer = combineReducers({
  main: mainReducer,
  userRegister: userRegisterReducer,
  userTemp: userTempReducer,
  header: headerReducer,
  login: loginReducer,
  global: globalReducer,
  recover: recoverReducer,
  solicitudes: solicitudReducer,
  aprobarSolicitudes: AprobarSolicitudesReducer,
  activeUser: activateReducer,
  misDatos: misDatosReducer,
  asignacionRoles: asignacionRolesReducer,
  mantenedores: mantenedoresReducer,
  siniestro: siniestroReducer,
  siniestroEmpresa: siniestroEmpresaReducer,
  denuncias: denunciasEmpresaReducer,
  prestaciones: prestacionesReducer,
  prestacionesEmpresa: prestacionesEmpresaReducer,
  map: mapReducer,
  documentos: documentReducer,
  mantenedorNotificaciones: mantenedorNotificacionesReducer,
  pdf: pdfReducer,
  notificacionesEmpresa: NotificacionesEmpresaReducer,
  graficos: graficosReducer,
  resumenEmpresa: resumenEmpresaReducer,
  historialNotificaciones: HistorialNotificacionesReducer,
  headerNotificaciones: headerNotificacionesReducer,
  configNotificacionesTrabajador: configNotificacionesTrabajadorReducer,
  empresasAutoasignadas: autoasignadasReducer,
});
