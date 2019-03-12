import React from "react";
import { connect } from "react-redux";
import { Popup, Button } from "devextreme-react";
import { openCloseModalEliminarEmpresa, doDeleteCompanies } from "./actions";
import LoadingOverlay from "../../../../Shared/LoadingOverlay";

class ModalEliminar extends React.PureComponent {
  handleClose = () => {
    this.props.dispatch(openCloseModalEliminarEmpresa(false));
  }

  handleDelete = () => {
    this.props.dispatch(doDeleteCompanies(
      this.props.UserInfo.RUT,
      this.props.selectedCompanies,
      this.handleClose
    ));
  }

  render() {
    return (
      <Popup
        visible={this.props.isOpenModalEliminar}
        onHiding={this.handleClose}
        title="Eliminar empresas"
        showTitle
        height={200}
        width={600}
        dragEnabled={false}
      >
        <div style={{ textAlign: "center" }}>
          {this.props.isLoading && <LoadingOverlay />}
          <span>¿Quieres eliminar las empresas seleccionadas de tus empresas asignadas ?</span>
          <div className="button-row">
            <Button
              onClick={this.handleClose}
              style={{ marginRight: 20 }}
              text="Cancelar"
            />

            <Button
              onClick={this.handleDelete}
              type="danger"
              style={{ marginLeft: 20 }}
              text="Eliminar empresa"
            />
          </div>
        </div>
      </Popup>
    );
  }
}


const mapStateToProps = (state) => ({
  UserInfo: state.global.userData,

  isOpenModalEliminar: state.empresasAutoasignadas.isOpenModalEliminar,
  isLoading: state.empresasAutoasignadas.isLoading,
  selectedCompanies: state.empresasAutoasignadas.selectedCompanies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalEliminar);
