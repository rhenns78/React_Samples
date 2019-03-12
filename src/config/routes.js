import ReactAI from "react-appinsights";
import createHistory from "history/createBrowserHistory";

import RecuperarContraseña from "../components/Acceso/RecuperarPassword/view";
import Login from "../components/Acceso/Login/view";
import Registro from "../components/Acceso/Registro/view";
import RegistroEmpresa from "../components/Acceso/RegistroEmpresa/view";
// import ErrorCustom from "../components/Error/view";

import Perfil from "../components/SucursalVirtual/Trabajador/Perfil/view";
import Siniestros from "../components/SucursalVirtual/Trabajador/Siniestros/view";
import ConfiguracionHistorialNotificacionesUsuario from "../components/SucursalVirtual/Trabajador/Notificaciones/view";
import SolicitudesTrabajador from "../components/SucursalVirtual/Trabajador/Solicitudes/view";
import AprobarSolicitudes from "../components/SucursalVirtual/Empresa/GestionUsuarios/AprobarSolicitudes/view";
import ActivarCuenta from "../components/Acceso/ActivarCuenta/view";
import DashBoard from "../components/SucursalVirtual/Inicio/dashboard";
import Mantenedores from "../components/SucursalVirtual/Mantenedores/General/view";
import ConfiguracionNotifcaciones from "../components/SucursalVirtual/Mantenedores/Configuraciones/view";
import MiEmpresa from "../components/SucursalVirtual/Empresa/MiEmpresa/view";
import GestionUsuarios from "../components/SucursalVirtual/Empresa/GestionUsuarios/view";

import SiniestrosEmpresa from "../components/SucursalVirtual/Empresa/SiniestrosEmpresa/view";
import Maps from "../components/Maps/view";
import EmpresasAchs from "../components/SucursalVirtual/Trabajador/EmpresasAchs/view";
import Faq from "../components/SucursalVirtual/Inicio/faq";

const history = createHistory();
ReactAI.init({ instrumentationKey: "8a1c69be-30ce-4375-9d1b-3868061eb863" }, history);

export const paths = {
  any: "*",
  root: "/",
  faq: "/preguntas-frecuentes",
  login: "/login",
  registro: "/registro",
  registroEmpresa: "/registroEmpresa",
  recuperarContraseña: "/recuperarContraseña",
  perfil: "/perfil",
  configHistorialUsuario: "/notificaciones",
  solicitudesTrabajador: "/solicitudes",
  aprobarSolicitudes: "/aprobarSolicitudes",
  activarCuenta: "/activarCuenta/:token",
  mantenedores: "/mantenedores",
  configuracionNotificaciones: "/configuracionNotificaciones",
  miEmpresa: "/miEmpresa",
  gestionarUsuario: "/gestionarUsuarios",
  siniestros: "/siniestros",
  presacionesDoc: "/doc",
  siniestrosEmpresa: "/siniestros-empresa",
  maps: "/maps",
  empresasAchs: "/empresas-achs",
};

export const loginRoutes = [
  { path: paths.root, component: Login },
  { path: paths.registro, component: Registro },
  { path: paths.recuperarContraseña, component: RecuperarContraseña },
  { path: paths.registroEmpresa, component: RegistroEmpresa },
  { path: paths.activarCuenta, component: ActivarCuenta },
  { path: paths.any, component: Login },
];

const routes = [
  { path: paths.root, component: DashBoard },
  { path: paths.faq, component: Faq },
  { path: paths.perfil, component: Perfil },
  { path: paths.configHistorialUsuario, component: ConfiguracionHistorialNotificacionesUsuario },
  { path: paths.solicitudesTrabajador, component: SolicitudesTrabajador },
  { path: paths.aprobarSolicitudes, component: AprobarSolicitudes },
  { path: paths.miEmpresa, component: MiEmpresa },
  { path: paths.gestionarUsuario, component: GestionUsuarios },
  { path: paths.mantenedores, component: Mantenedores },
  { path: paths.configuracionNotificaciones, component: ConfiguracionNotifcaciones },
  { path: paths.siniestros, component: Siniestros },
  { path: paths.siniestrosEmpresa, component: SiniestrosEmpresa },
  { path: paths.maps, component: Maps },
  { path: paths.empresasAchs, component: EmpresasAchs },
  { path: paths.any, component: DashBoard },
];

export default routes;
