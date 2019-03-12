const historialNotificaciones = {
  listaNotificaciones: [],
  totalRows: 0,
  isLoading: false,
  filters: [
    { id: "all", icon: "error", name: "Todas las notificaciones" },
    { id: "employee", icon: "error", name: "Personales" },
  ],
  parameters: {
    companyRut: null,
    read: null,
    type: "all",
    pageIndex: 0,
    pageSize: 20,
  },
  tabs: [
    { id: null, text: "Todas" },
    { id: true, text: "Leídas" },
    { id: false, text: "No leídas" },
  ],
};

export default historialNotificaciones;
