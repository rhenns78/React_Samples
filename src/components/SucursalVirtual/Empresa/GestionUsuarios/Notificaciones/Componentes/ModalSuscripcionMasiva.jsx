import React from "react";
import { connect } from "react-redux";
import { Popup, Button } from "devextreme-react";
import Stepper from "react-stepper-horizontal";
import ListaNotificaciones from "./listaNotificaciones";
import ListaUsuarios from "./listaUsuarios";
import { doGetUsuarios, doMassiveSuscription } from "../actions";
import LoadingOverlay from "../../../../../Shared/LoadingOverlay";

class ModalSuscripcionMasiva extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      selectedNotifications: null,
      selectedUsers: null,
      disableNext: true,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (!prevProps.isOpen && this.props.isOpen) {
      if (this.props.usuarios && !this.props.usuarios.length) this.props.dispatch(doGetUsuarios(this.props.companyId));
    }
  }

  handleSelectNotification = (e) => {
    const selectedItems = e.component.option("selectedItems");
    this.setState({ selectedNotifications: selectedItems, disableNext: !selectedItems.length });
  }

  handleSelectUsuarios = (e) => {
    this.setState({ selectedUsers: e.selectedRowsData, disableNext: !e.selectedRowsData.length });
  }

  handleClose = () => {
    this.setState({
      selectedUsers: null,
      selectedNotifications: null,
      disableNext: true,
      step: 0,
    });
    this.props.onClose();
  }

  handleNextStep = () => {
    this.setState({ step: 1, disableNext: true });
  }

  handleSuscribe = () => {
    const Data = {
      NotificationGroupsId: this.state.selectedNotifications.map((e) => e.NotificationGroupId),
      EmployeesRut: this.state.selectedUsers.map((t) => t.Rut),
      CompanyRut: this.props.companyId,
      BranchId: this.props.sucursalId,
    };

    this.props.dispatch(doMassiveSuscription(Data, this.handleClose));
  }

  render() {
    const {
      isOpen,
    } = this.props;
    return (
      <Popup
        visible={isOpen}
        title="Suscripción masiva"
        showTitle
        maxWidth={600}
        maxHeight={600}
        onHiding={this.handleClose}
        dragEnabled={false}
      >
        <div>
          {this.props.isLoading && <LoadingOverlay />}
          <Stepper
            className="stepper-registro"
            activeStep={this.state.step}
            circleTop={15}
            activeColor="#00963a"
            completeColor="#0C652F"
            steps={[
              { title: "Seleccionar trabajadores" },
              { title: "Seleccionar notificaciones" },
            ]}
          />

          {this.state.step === 0 && (
            <ListaUsuarios
              usuarios={this.props.usuarios}
              onSelect={this.handleSelectUsuarios}
              typeUserRelationFilter={this.props.typeUserRelationFilter}
              hideDate
              showSearch
              height={330}
            />
          )}

          {this.state.step === 1 && (
            <React.Fragment>
              <div className="modalSuscripcionWrapper">

                <ListaNotificaciones
                  data={this.props.notificaciones}
                  selected={this.state.selectedNotifications}
                  onSelection={this.handleSelectNotification}
                  selectionMode="multiple"
                  showCheck
                  hideNumbers
                  hideDetails
                />
              </div>

            </React.Fragment>
          )}


          <div className="button-row">
            <Button
              onClick={this.handleClose}
              style={{ marginRight: 20 }}
              text="Cancelar"
            />
            {this.state.step === 0 && (
              <Button
                onClick={this.handleNextStep}
                type="success"
                style={{ marginLeft: 20 }}
                disabled={this.state.disableNext}
                text="Siguiente"
              />
            )}
            {this.state.step === 1 && (
              <Button
                onClick={this.handleSuscribe}
                type="success"
                style={{ marginLeft: 20 }}
                disabled={this.state.disableNext}
                text="Suscribir trabajadores"
              />
            )}
          </div>
        </div>
      </Popup>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.notificacionesEmpresa.isLoading,
  notificaciones: state.notificacionesEmpresa.notificaciones,
  usuarios: state.notificacionesEmpresa.usuarios,
  companyId: state.global.companyId,
  sucursalId: state.global.sucursalId,
  typeUserRelationFilter: state.notificacionesEmpresa.typeUserRelationFilter,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalSuscripcionMasiva);
