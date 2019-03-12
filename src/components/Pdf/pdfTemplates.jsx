import React from "react";
import { connect } from "react-redux";
import FormularioDenunciaAccidente from "../SucursalVirtual/Empresa/SiniestrosEmpresa/Denuncias/NuevaDenuncia/htmlPrevisualizacion/FormularioDenunciaAccidenteTemp";

const PdfTemplates = ({ data }) => (
  <div
    style={{
      opacity: 0, position: "absolute", overflow: "hidden", height: 0,
    }}
  >
    <FormularioDenunciaAccidente
      data={data}
    />
  </div>
);

const mapStateToProps = (state) => ({
  data: state.pdf.data,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PdfTemplates);
