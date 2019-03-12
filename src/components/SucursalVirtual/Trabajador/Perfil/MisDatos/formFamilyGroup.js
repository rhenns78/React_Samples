const getFormFamilyGroup = ({
  ParentescoCmbx, tipoFamiliar, callValidationRut,
}) => ({
  colCount: 3,
  labelLocation: "top",
  items: [
    {

      text: "Rut",
      dataField: "Rut",
      label: {
        alignment: "left",
      },
      validationRules: [
        { type: "required", message: "Debe ingresar un Rut" },
        {
          type: "custom",
          validationCallback: callValidationRut,
          message: "Rut Inválido",
        },
      ],
   
    },
    {
      text: "Nombre",
      dataField: "FullName",
      label: {
        alignment: "left",
      },
      editorOptions: {
        placeholder: "Nombre",
      },
    },
    {
      text: "Parentesco",
      dataField: "Relationship",
      label: {
        alignment: "left",
      },
      editorType: "dxSelectBox",
      editorOptions: {
        placeholder: "Seleccione Familiar",
        dataSource: ParentescoCmbx,
        value: tipoFamiliar,
        displayExpr: "Parentesco",
        valueExpr: "Codigo",
      },
    },


  ],
});

export default getFormFamilyGroup;

