import React from "react";
import { connect } from "react-redux";
import { Popup, Button } from "devextreme-react";
import { doMassiveDelete, doMassiveDeleteExternalWorkers } from "../actions";
import LoadingOverlay from "../../../../../Shared/LoadingOverlay";

class ModalEliminarSuscripciones extends React.PureComponent {
  handleDelete = () => {
    if (this.props.typeUserRelationFilter === "INT") {
      this.props.dispatch(doMassiveDelete({
        NotificationGroupId: this.props.selectedNotification.NotificationGroupId,
        CompanyRut: this.props.companyId,
        EmployeesRut: this.props.selectedUsers.map((e) => e.EmployeeRut),
      }, this.handleClose));
    }
    if (this.props.typeUserRelationFilter === "EXT") {
      this.props.dispatch(doMassiveDeleteExternalWorkers({
        NotificationGroupId: this.props.selectedNotification.NotificationGroupId,
        CompanyRut: this.props.companyId,
        arrayAsignaciones: this.props.selectedUsers.map((e) => e.Id),
      }, this.handleClose));
    }
  }

  handleClose = () => {
    this.props.onClose();
  }

  render() {
    return (
      <Popup
        visible={this.props.isOpen}
        showTitle
        title="Eliminar suscripciones"
        onHiding={this.handleClose}
        maxWidth={600}
        maxHeight={240}
        dragEnabled={false}
      >
        <div style={{ textAlign: "center" }}>
          {this.props.isLoading && <LoadingOverlay />}
          <span>
            ¿Estás seguro de eliminar las suscripciones de los trabajadores seleccionados?
          </span>
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
              text="Eliminar suscripciones"
            />
          </div>
        </div>
      </Popup>
    );
  }
}


const mapStateToProps = (state) => ({
  selectedNotification: state.notificacionesEmpresa.selectedNotification,
  companyId: state.global.companyId,
  isLoading: state.notificacionesEmpresa.isLoading,
  typeUserRelationFilter: state.notificacionesEmpresa.typeUserRelationFilter,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalEliminarSuscripciones);
