
export const checkAccess = (id, userFunctionalitiesIds) => {
  if (!id) return true;
  if (!Array.isArray(userFunctionalitiesIds)) return false;
  return userFunctionalitiesIds.indexOf(id) !== -1;
};

export const ids = {
  miPerfil: "FUN_MI_PERFIL",
  misDatos: "FUN_MIS_DATOS",
  usuario: "FUN_USUARIO",
  correoPassword: "FUN_CORREO_Y_CONTRAS",
  solicitudesPendientes: "FUN_SOLICITUDES_PEN",
  mantenedores: "FUN_MANTENEDORES",
  roles: "FUN_ROLES",
  perfiles: "FUN_PERFILES",
  miEmpresa: "FUN_MI_EMPRESA",
  aprobarSolicitudes: "FUN_APROBAR_SOLICIT",
  datosEmpresa: "FUN_DATOS_EMPRESA",
  asignarRoles: "FUN_ASIGNAR_ROLES",
  siniestros: "FUN_SINIESTROS",
  prestaciones: "FUN_PRESTACIONES",
  siniestro: "FUN_SINIESTRO",
  notificacionesE: "FUN_NOTIFICACIONES_E",
  notificacionesT: "FUN_NOTIFICACIONES_T",
  mantenedorNotEmpresa: "FUN_MANT_NOTIFIC_EMP",
  mantenedorNotTrabajador: "FUN_MANT_NOTIFIC_TRA",
  siniestrosEmpresa: "FUN_SINIESTROS_EMPRE",
  resumenSiniestro: "FUN_RESUMEN_SINIESTR",
  siniestroEmpresa: "FUN_SINIESTRO_EMPRES",
  denunciasEmpresa: "FUN_DENUNCIAS_EMPRES",
  prestacionesEmpresa: "FUN_PRESTACIONES_EC_",
};

const listaFuncionalidades = [
  { Code: ids.miPerfil, Description: "Mi perfil" },
  { Code: ids.usuario, Description: "Usuario", parentCode: ids.miPerfil },
  { Code: ids.misDatos, Description: "Mis datos", parentCode: ids.miPerfil },
  { Code: ids.correoPassword, Description: "Correo y Contraseña", parentCode: ids.miPerfil },
  { Code: ids.solicitudesPendientes, Description: "Solicitudes pendientes", parentCode: ids.miPerfil },
  { Code: ids.notificacionesT, Description: "Historial de notificaciones", parentCode: ids.miPerfil },

  { Code: ids.mantenedores, Description: "Mantenedores" },
  { Code: ids.roles, Description: "Roles", parentCode: ids.mantenedores },
  { Code: ids.perfiles, Description: "Perfiles", parentCode: ids.mantenedores },
  { Code: ids.mantenedorNotEmpresa, Description: "Notificaciones Empresa", parentCode: ids.mantenedores },
  { Code: ids.mantenedorNotTrabajador, Description: "Notificaciones trabajador", parentCode: ids.mantenedores },

  { Code: ids.miEmpresa, Description: "Mi Empresa" },
  { Code: ids.aprobarSolicitudes, Description: "Aprobar solicitudes", parentCode: ids.miEmpresa },
  { Code: ids.datosEmpresa, Description: "Datos empresa", parentCode: ids.miEmpresa },
  { Code: ids.asignarRoles, Description: "Asignar roles", parentCode: ids.miEmpresa },
  { Code: ids.notificacionesE, Description: "Notificaciones Empresa", parentCode: ids.miEmpresa },

  { Code: ids.siniestros, Description: "Siniestros" },
  { Code: ids.siniestro, Description: "Siniestros", parentCode: ids.siniestros },
  { Code: ids.prestaciones, Description: "Prestaciones economicas", parentCode: ids.siniestros },

  { Code: ids.siniestrosEmpresa, Description: "Siniestros Empresa" },
  { Code: ids.resumenSiniestro, Description: "Resumen", parentCode: ids.siniestrosEmpresa },
  { Code: ids.siniestroEmpresa, Description: "Siniestros", parentCode: ids.siniestrosEmpresa },
  { Code: ids.denunciasEmpresa, Description: "Denuncias", parentCode: ids.siniestrosEmpresa },
  { Code: ids.prestacionesEmpresa, Description: "Prestaciones economicas", parentCode: ids.siniestrosEmpresa },

];

export default listaFuncionalidades;
