import React from "react";
import { connect } from "react-redux";
import DenunciasGrid from "./denuncias";
import FormDenunicas from "./NuevaDenuncia/view";
import LoadingOverlay from "../../../../Shared/LoadingOverlay";
import { setTipoDenuncia } from "./actions";
import SelectTipo from "../../../../Shared/SelectTipo";

class Denuncias extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    if (nextProps.isLoading !== this.props.isLoading) {
      return true;
    }

    return false;
  }

  handleSelectTipo = (tipo) => {
    this.props.dispatch(setTipoDenuncia(tipo));
  }

  render() {
    return (
      <div>
        {this.props.isLoading && <LoadingOverlay />}
        <SelectTipo
          selected={this.props.selectedTipoDenuncia}
          onClick={this.handleSelectTipo}
          items={[
            { icon: "error", name: "Denuncias pendientes" },
            { icon: "restore", name: "Historial de denuncias" },
            { icon: "crop_free", name: "Todas las denuncias" },
          ]}
        />
        <DenunciasGrid />
        <FormDenunicas />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.denuncias.isLoading,
  selectedTipoDenuncia: state.denuncias.selectedTipoDenuncia,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Denuncias);
