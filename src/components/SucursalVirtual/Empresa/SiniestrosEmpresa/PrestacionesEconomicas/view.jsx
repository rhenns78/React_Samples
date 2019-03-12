import React from "react";
import { connect } from "react-redux";
import PrestacionesEmpresaGrid from "./prestaciones";
import LoadingOverlay from "../../../../Shared/LoadingOverlay";
import SelectTipo from "../../../../Shared/SelectTipo";
import { setTipoPrestacion } from "./actions";
import FormDocumentcion from "./EnvioDocumentos/view";
class PrestacionesEconomicas extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    if (nextProps.isLoading !== this.props.isLoading) {
      return true;
    }

    return false;
  }

  handleSelectTipo = (tipo) => {
    this.props.dispatch(setTipoPrestacion(tipo));
  }

  render() {
    return (
      <div>
        {this.props.isLoading && <LoadingOverlay />}
        <SelectTipo
          selected={this.props.selectedTipoPrestacion}
          onClick={this.handleSelectTipo}
          items={[
            { icon: "error", name: "Prestaciones pendientes" },
            { icon: "access_time", name: "Prestaciones en revisión" },
            { icon: "restore", name: "Prestaciones aprobadas" },
            { icon: "crop_free", name: "Todas las prestaciones" },
          ]}
        />
        <PrestacionesEmpresaGrid />
        <FormDocumentcion />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.prestacionesEmpresa.isLoading,
  selectedTipoPrestacion: state.prestacionesEmpresa.selectedTipoPrestacion,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PrestacionesEconomicas);

