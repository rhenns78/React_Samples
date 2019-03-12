const getForm = () => ({
  colCount: 3,
  labelLocation: "top",
  items: [
    {
      text: "Nombre",
      dataField: "Name",
      label: { 
        alignment: "left"
      },
      editorOptions: {
        placeholder: 'Nombre'
      }
    },
    {
      text: "Descripción",
      colSpan: 2,
      dataField: "Description",
      label: { 
        alignment: "left"
      },
      editorOptions: {
        placeholder: 'Descripción',
      }
    },
  ],
});

export default getForm;