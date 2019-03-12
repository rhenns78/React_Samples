const getForm = ({ perfiles, selectedPerfil, modalCallback }) => ({
  colCount: 3,
  labelLocation: "top",
  items: [
    {
      text: "Nombre",
      dataField: "Name",
      label: {
        alignment: "left",
      },
      editorOptions: {
        placeholder: "Nombre",
      },
    },
    {
      text: "Perfil",
      dataField: "IdProfile",
      label: {
        alignment: "left",
      },
      editorType: "dxSelectBox",
      editorOptions: {
        placeholder: "Seleccione un perfil",
        dataSource: perfiles,
        value: selectedPerfil,
        displayExpr: "Name",
        valueExpr: "Id",
      },
    },
    {
      itemType: "button",
      horizontalAlignment: "center",
      verticalAlignment: "bottom",
      buttonOptions: {
        text: selectedPerfil !== "" ? "Editar funcionalidades" : "Agregar funcionalidades",
        type: "default",
        onClick: modalCallback,
      },
    },
    {
      text: "Descripcion",
      dataField: "Description",
      colSpan: 3,
      label: {
        alignment: "left",
      },
      editorOptions: {
        placeholder: "Descripcion",
      },
    },
  ],
});

export default getForm;
