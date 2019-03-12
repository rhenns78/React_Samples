import helper from "../../../../../helpers/validaciones";

export const dataSucursalMock = (sucursalName) => [
  {
    className: "col-5",
    Header: sucursalName,
    multiple: true,
    TextCircle: `${helper.getFirstLetter(sucursalName)}`,
    borderBotton: true,
    Lists: [
      {
        title: "sucursalName",
        list: [
          {
            id: "Rut", iconText: "Re", text: "Metropolitana", disabled: true,
          },
          {
            id: "Birth", iconText: "Co", text: "Santiago Centro", disabled: true,
          },
        ],
      },
      {
        title: "Contacto comercial",
        list: [
          {
            id: "Rut", iconText: "Re", text: "José Sebastián Bravo Soto", disabled: true,
          },
          {
            id: "Birth", iconText: "Em", text: "jbravo@achs.cl", disabled: true,
          },
          {
            id: "Birth", iconText: "Cel", text: "+569 87666756", disabled: true,
          },
          {
            id: "Birth", iconText: "Fijo", text: "+562 87666756", disabled: true,
          },
        ],
      },
      {
        title: "Contacto preventivo",
        list: [
          {
            id: "Rut", iconText: "No", text: "Alfonso Andrés Rodríguez", disabled: true,
          },
          {
            id: "Birth", iconText: "Em", text: "arodriguez@achs.cl", disabled: true,
          },
          {
            id: "Birth", iconText: "Cel", text: "+569 77985676", disabled: true,
          },
          {
            id: "Birth", iconText: "Fijo", text: "+569 77985676", disabled: true,
          },
        ],
      },
      {
        title: "Agencia ACHS",
        list: [
          {
            id: "Rut", iconText: "No", text: "Ramón Carnicer", disabled: true,
          },
          {
            id: "Birth", iconText: "Dir", text: "Ramón Carnicer 163, Providencia", disabled: true,
          },
          {
            id: "Birth", iconText: "Hor", text: "9:00 - 17:00", disabled: true,
          },
          {
          },
        ],
      },
    ],
    Button: {
      visible: false,
    },
    background: "#C10068",
  },
];

