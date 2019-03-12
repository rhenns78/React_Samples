export const MockUsuarios = [
  {
    name: "Nelson Oyarce", rut: "11764068-K", rol: "Sin rol", asignDate: new Date(),
  },
  {
    name: "Sergio Carreño", rut: "24555391-9", rol: "Admin", asignDate: new Date(),
  },
  {
    name: "Artour Garaev", rut: "14707626-6", rol: "Externo", asignDate: new Date(),
  },
  {
    name: "Nombre Apellido", rut: "12.312.312-3", rol: "Recursos humanos", asignDate: new Date(),
  },
];

export const MockNotificaciones = [
  {
    name: "Siniestros", details: "Descripción del módulo", icon: "error_outline", subs: 34,
  },
  {
    name: "Denuncias", details: "Descripción del módulo", icon: "error", subs: 24,
  },
  {
    name: "Prestacinoes económicas", details: "Descripción del módulo", icon: "add_comment", subs: 15,
  },
  {
    name: "Prevención", details: "Descripción del módulo", icon: "error", subs: 1,
  },
  {
    name: "Seguros", details: "Descripción del módulo", icon: "error", subs: 12,
  },
  {
    name: "Proveedores", details: "Descripción del módulo", icon: "error", subs: 31,
  },
  {
    name: "Beneficios", details: "Descripción del módulo", icon: "error", subs: 11,
  },
  {
    name: "Soporte", details: "Descripción del módulo", icon: "error", subs: 6,
  },
  {
    name: "SEL", details: "Descripción del módulo", icon: "error", subs: 8,
  },
];

export const mocksGruposYsuscriptores = {
  Data: [
    {
      NotificationGroupId: 3,
      NotificationGroupDesc: "Notificaciones de Siniestros",
      NotificationGroupCode: "NOTIF_SINIESTRO",
      Subscriptors: [
        {
          NotificationGroupId: 3,
          NotificationGroupDesc: "Notificaciones de Siniestros",
          NotificationGroupCode: "NOTIF_SINIESTRO",
          CompanyRut: "70360100-6",
          CompanyName: "ACHS",
          EmployeeRut: "11764068-K",
          EmployeeEmail: "felipe@gmail.com",
          EmployeeName: "Nelson Oyarce",
          BranchId: "Stgo",
          Roles: [
            "Admin",
            "Dependiente",
          ],
        },
        {
          NotificationGroupId: 3,
          NotificationGroupDesc: "Notificaciones de Siniestros",
          NotificationGroupCode: "NOTIF_SINIESTRO",
          CompanyRut: "70360100-6",
          CompanyName: "ACHS",
          EmployeeRut: "16769124-2",
          EmployeeEmail: "luisme@lagash.com",
          EmployeeName: "Luis Mercado",
          BranchId: "Stgo",
          Roles: [
            "Dependiente",
          ],
        },
      ],
    },
    {
      NotificationGroupId: 4,
      NotificationGroupDesc: "Grupo 1",
      NotificationGroupCode: "GRUPO_1",
      Subscriptors: [
        {
          NotificationGroupId: 4,
          NotificationGroupDesc: "Grupo 1",
          NotificationGroupCode: "GRUPO_1",
          CompanyRut: "70360100-6",
          CompanyName: "ACHS",
          EmployeeRut: "11764068-K",
          EmployeeEmail: "felipe@gmail.com",
          EmployeeName: "Nelson Oyarce",
          BranchId: "Stgo",
          Roles: [
            "Admin",
            "Dependiente",
          ],
        },
        {
          NotificationGroupId: 4,
          NotificationGroupDesc: "Grupo 1",
          NotificationGroupCode: "GRUPO_1",
          CompanyRut: "70360100-6",
          CompanyName: "ACHS",
          EmployeeRut: "12468088-3",
          EmployeeEmail: "ticoncar@achs.cl",
          EmployeeName: "JUAN ENRIQUE DURÁN SALAMANCA",
          BranchId: "Stgo",
          Roles: [
            "RRHH",
          ],
        },
        {
          NotificationGroupId: 4,
          NotificationGroupDesc: "Grupo 1",
          NotificationGroupCode: "GRUPO_1",
          CompanyRut: "70360100-6",
          CompanyName: "ACHS",
          EmployeeRut: "16513199-1",
          EmployeeEmail: "yarellaf@lagash.com",
          EmployeeName: "YARELLA FERNÁNDEZ",
          BranchId: "Stgo",
          Roles: [
            "Admin",
            "Dependiente",
          ],
        },
        {
          NotificationGroupId: 4,
          NotificationGroupDesc: "Grupo 1",
          NotificationGroupCode: "GRUPO_1",
          CompanyRut: "70360100-6",
          CompanyName: "ACHS",
          EmployeeRut: "16769124-2",
          EmployeeEmail: "luisme@lagash.com",
          EmployeeName: "Luis Mercado",
          BranchId: "Stgo",
          Roles: [
            "Dependiente",
          ],
        },
      ],
    },
    {
      NotificationGroupId: 5,
      NotificationGroupDesc: "Grupo 2",
      NotificationGroupCode: "GRUPO_2",
      Subscriptors: [
        {
          NotificationGroupId: 5,
          NotificationGroupDesc: "Grupo 2",
          NotificationGroupCode: "GRUPO_2",
          CompanyRut: "70360100-6",
          CompanyName: "ACHS",
          EmployeeRut: "11764068-K",
          EmployeeEmail: "felipe@gmail.com",
          EmployeeName: "Nelson Oyarce",
          BranchId: "Stgo",
          Roles: [
            "Admin",
            "Dependiente",
          ],
        },
        {
          NotificationGroupId: 5,
          NotificationGroupDesc: "Grupo 2",
          NotificationGroupCode: "GRUPO_2",
          CompanyRut: "70360100-6",
          CompanyName: "ACHS",
          EmployeeRut: "16513199-1",
          EmployeeEmail: "yarellaf@lagash.com",
          EmployeeName: "YARELLA FERNÁNDEZ",
          BranchId: "Stgo",
          Roles: [
            "Admin",
            "Dependiente",
          ],
        },
        {
          NotificationGroupId: 5,
          NotificationGroupDesc: "Grupo 2",
          NotificationGroupCode: "GRUPO_2",
          CompanyRut: "70360100-6",
          CompanyName: "ACHS",
          EmployeeRut: "16769124-2",
          EmployeeEmail: "luisme@lagash.com",
          EmployeeName: "Luis Mercado",
          BranchId: "Stgo",
          Roles: [
            "Dependiente",
          ],
        },
      ],
    },
    {
      NotificationGroupId: 6,
      NotificationGroupDesc: "Grupo 3",
      NotificationGroupCode: "GRUPO_3",
      Subscriptors: [
        {
          NotificationGroupId: 6,
          NotificationGroupDesc: "Grupo 3",
          NotificationGroupCode: "GRUPO_3",
          CompanyRut: "70360100-6",
          CompanyName: "ACHS",
          EmployeeRut: "11764068-K",
          EmployeeEmail: "felipe@gmail.com",
          EmployeeName: "Nelson Oyarce",
          BranchId: "Stgo",
          Roles: [
            "Admin",
            "Dependiente",
          ],
        },
        {
          NotificationGroupId: 6,
          NotificationGroupDesc: "Grupo 3",
          NotificationGroupCode: "GRUPO_3",
          CompanyRut: "70360100-6",
          CompanyName: "ACHS",
          EmployeeRut: "16513199-1",
          EmployeeEmail: "yarellaf@lagash.com",
          EmployeeName: "YARELLA FERNÁNDEZ",
          BranchId: "Stgo",
          Roles: [
            "Admin",
            "Dependiente",
          ],
        },
        {
          NotificationGroupId: 6,
          NotificationGroupDesc: "Grupo 3",
          NotificationGroupCode: "GRUPO_3",
          CompanyRut: "70360100-6",
          CompanyName: "ACHS",
          EmployeeRut: "16769124-2",
          EmployeeEmail: "luisme@lagash.com",
          EmployeeName: "Luis Mercado",
          BranchId: "Stgo",
          Roles: [
            "Dependiente",
          ],
        },
      ],
    },
  ],
  Success: true,
};
