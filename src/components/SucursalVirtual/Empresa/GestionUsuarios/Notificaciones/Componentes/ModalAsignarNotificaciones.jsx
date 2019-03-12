import React from "react";
import { connect } from "react-redux";
import { Popup, Button } from "devextreme-react";
import ListaNotificaciones from "./listaNotificaciones";
import LoadingOverlay from "../../../../../Shared/LoadingOverlay";
import { doUpdateUserSuscriptions, doUpdateExternalUserSuscriptions } from "../actions";

class ModalAsignarNotificaciones extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      disableNext: true,
      selectedItems: null,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.isOpen && this.props.selectedUserNotifications && !prevProps.selectedUserNotifications) {
      const selectedItems = this.props.selectedUserNotifications.filter((e) => e.Subscriptors.length > 0);
      this.setState({ selectedItems });
    }
  }

  handleClose = () => {
    if (this.props.onClose) this.props.onClose();
    this.setState({ disableNext: true, selectedItems: null });
  }

  handleSuscribir = () => {
    if (this.props.typeUserRelationFilter === "EXT") {
      const Data = {
        oldSuscriptions: this.props.selectedUserNotifications,
        selectedSuscriptions: this.state.selectedItems,
        BranchId: this.props.selectedUser.BranchId,
        Cellphone: this.props.selectedUser.Cellphone,
        CompanyName: this.props.selectedUser.CompanyName,
        CompanyRut: this.props.selectedUser.CompanyRut,
        CreationDate: this.props.selectedUser.CreationDate,
        Email: this.props.selectedUser.Email,
        EmployeeName: this.props.selectedUser.EmployeeName,
        Id: this.props.selectedUser.Id,
        LastName: this.props.selectedUser.LastName,
        Name: this.props.selectedUser.Name,
      };
      this.props.dispatch(doUpdateExternalUserSuscriptions(Data, this.handleClose));
    }
    if (this.props.typeUserRelationFilter === "INT") {
      this.props.dispatch(doUpdateUserSuscriptions(
        {
          userName: this.props.selectedUser.EmployeeName,
          userRut: this.props.selectedUser.Rut,
          companyId: this.props.companyId,
          sucursalId: this.props.sucursalId,
          selectedSuscriptions: this.state.selectedItems,
          oldSuscriptions: this.props.selectedUserNotifications,
        },
        this.handleClose,
      ));
    }
  }

  handleSelection = (e) => {
    const selectedItems = e.component.option("selectedItems");
    this.setState({ selectedItems, disableNext: false });
  }

  render() {
    return (
      <Popup
        visible={this.props.isOpen}
        showTitle
        title={this.props.selectedUser.EmployeeName}
        onHiding={this.handleClose}
        maxWidth={600}
        maxHeight={540}
        dragEnabled={false}
      >
        <div>
          {this.props.isLoading && <LoadingOverlay />}
          <div className="modalSuscripcionWrapper">
            <ListaNotificaciones
              data={this.props.selectedUserNotifications}
              hideDetails
              onSelection={this.handleSelection}
              hideNumbers
              showCheck
              selected={this.state.selectedItems}
            />
          </div>

          <div className="button-row">
            <Button
              onClick={this.handleClose}
              style={{ marginRight: 20 }}
              text="Cancelar"
            />
            <Button
              onClick={this.handleSuscribir}
              type="success"
              style={{ marginLeft: 20 }}
              disabled={this.state.disableNext}
              text="Guardar cambios"
            />
          </div>
        </div>
      </Popup>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedUserNotifications: state.notificacionesEmpresa.selectedUserNotifications,
  isLoading: state.notificacionesEmpresa.isLoading,
  companyId: state.global.companyId,
  sucursalId: state.global.sucursalId,
  typeUserRelationFilter: state.notificacionesEmpresa.typeUserRelationFilter,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalAsignarNotificaciones);
