import { ids } from "../../helpers/rolAccess";
import { paths } from "../../config/routes";

const menuWorker = [
  {
    name: "Siniestros", route: paths.siniestros, accessId: ids.siniestros, icon: "I",
  },
  { name: "Cotizaciones", route: "/cotiza", icon: "J" },
  { name: "Prevención", route: "/previene", icon: "K" },

];

const menuCompany = [
  {
    name: "Datos empresa", route: paths.miEmpresa, accessId: ids.miEmpresa, icon: "B",
  },
  {
    name: "Gestionar usuarios", route: paths.gestionarUsuario, accessId: ids.miEmpresa, icon: "k",
  },
  {
    name: "Siniestros", route: paths.siniestrosEmpresa, accessId: ids.siniestrosEmpresa, icon: "I",
  },
  { name: "Seguros", route: "/seguros", icon: "M" },
  { name: "Proveedores", route: "/proveedores-empresa", icon: "N" },
  { name: "Devoluciones", route: "/devoluciones", icon: "N" },
  { name: "Decreto supremo N°67", route: "/decreto", icon: "N" },
  { name: "Certificados", route: "/certificados", icon: "N" },
  { name: "Prevención", route: "/prevencion", icon: "N" },
  { name: "Estadísticas", route: "/stats", icon: "N" },
];

export default [
  {
    name: "Inicio",
    icon: "A",
    route: paths.root,
    subMenu: [
      { name: "Bienvenido", icon: "B", route: paths.root },
      { name: "Preguntas frecuentes", icon: "K", route: paths.faq },
      { name: "Tour Guiado", icon: "B" },
    ],
  },

  {
    name: "Trabajador",
    icon: "C",
    route: paths.siniestros,
    accessId: ids.miPerfil,
    subMenu: menuWorker,
  },
  {
    name: "Empresa",
    icon: "D",
    showSelects: true,
    accessId: ids.miEmpresa,
    route: paths.miEmpresa,
    subMenu: menuCompany,
  },
  {
    name: "Beneficios",
    icon: "E",
    route: "/mundo",
    subMenu: [
      { name: "Mundo ACHS", route: "/mundo", icon: "M" },
      { name: "Beneficios", route: "/bene", icon: "E" },
    ],
  },
  {
    name: "Soporte",
    icon: "F",
    route: "/sucursales",
    subMenu: [
      { name: "Sucursales", route: "/sucursales", icon: "O" },
      { name: "FAQ", route: "/faq", icon: "P" },
      { name: "Reclamos", route: "/reclamos", icon: "Q" },
    ],
  },

  {
    name: "Mi Cuenta",
    stackBottom: true,
    icon: "H",
    route: paths.perfil,
    subMenu: [
      { name: "Mi Cuenta", route: paths.perfil, icon: "B" },
      { name: "Notificaciones", route: paths.configHistorialUsuario, icon: "k" },
      { name: "Solicitudes", route: paths.solicitudesTrabajador, icon: "I" },
      { name: "Empresas ACHS", route: paths.empresasAchs, icon: "I" },
    ],
  },

  {
    name: "Mantenedor",
    icon: "G",
    route: paths.mantenedores,
    accessId: ids.mantenedores,
    subMenu: [
      { name: "General", route: paths.mantenedores, icon: "B" },
      { name: "Notificaciones", route: paths.configuracionNotificaciones, icon: "k" },
    ],
  },
];
