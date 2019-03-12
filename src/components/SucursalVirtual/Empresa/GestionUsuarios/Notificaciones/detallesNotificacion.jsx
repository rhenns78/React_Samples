import React from "react";
import { connect } from "react-redux";
import { Button } from "devextreme-react";
import ListaUsuarios from "./Componentes/listaUsuarios";
import ModalSuscribirTrabajadores from "./Componentes/modalSuscribirTrabajadores";
import { openCloseModalSuscribirTrabajadores, openCloseModalEliminarSuscripciones, setAvaliableUsers } from "./actions";
import ModalEliminarSuscripciones from "./Componentes/modaEliminarSuscripciones";

class DetallesNotificaciones extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showDelete: true,
      selectedUsers: null,
    };
  }

  handleBack = () => {
    this.setState({ showDelete: true, selectedUsers: [] });
    this.props.onBack();
  }

  handleSelection = (e) => {
    this.setState({ selectedUsers: e.selectedRowsData, showDelete: !e.selectedRowKeys.length });
  }

  handleModalClose = () => {
    this.props.dispatch(openCloseModalSuscribirTrabajadores(false));
    if (this.props.typeUserRelationFilter === "EXT") {
      this.props.dispatch(setAvaliableUsers(false));
    }
  }

  handleOpenModalSuscribir = () => {
    this.props.dispatch(openCloseModalSuscribirTrabajadores(true));
    if (this.props.typeUserRelationFilter === "EXT") {
      this.props.dispatch(setAvaliableUsers(true));
    }
  }

  handleModalEliminar = () => {
    this.props.dispatch(openCloseModalEliminarSuscripciones(true));
  }

  handleCloseModalEliminar = () => {
    this.props.dispatch(openCloseModalEliminarSuscripciones(false));
  }

  render() {
    const {
      selectedNotification,
    } = this.props;

    return (
      <React.Fragment>

        <ModalSuscribirTrabajadores
          onClose={this.handleModalClose}
          isOpen={this.props.isOpenModalSuscribirTrabajadores}
        />

        <ModalEliminarSuscripciones
          onClose={this.handleCloseModalEliminar}
          isOpen={this.props.isOpenModalEliminarSuscripcion}
          selectedUsers={this.state.selectedUsers}
          isLoading={this.props.isLoading}
        />

        {selectedNotification &&
          <div className="notification-empresa-suscritos">
            <i onClickCapture={this.handleBack} className="achs-icon">j</i>
            <i className="achs-icon icon">{selectedNotification.icon || "o"}</i>
            <div className="notification-text">
              <span className="name">{selectedNotification.NotificationGroupCode}</span>
              <span className="details">{selectedNotification.NotificationGroupDesc}</span>
            </div>
            <span className="notification-subs">
              <span>{selectedNotification.Subscriptors ? selectedNotification.Subscriptors.length : 0}</span>
              {`${(selectedNotification.Subscriptors ? selectedNotification.Subscriptors.length : 0) === 1 ? " suscripción" : " suscripciones"}`}
            </span>
          </div>
        }

        <ListaUsuarios
          usuarios={this.props.selectedNotification ? this.props.selectedNotification.Subscriptors : []}
          selected={this.state.selectedUsers}
          onSelect={this.handleSelection}
          typeUserRelationFilter={this.props.typeUserRelationFilter}
          actions={
            this.state.showDelete ?
              <Button
                text={this.props.typeUserRelationFilter === "EXT" ? "Suscribir trabajador" : "Suscribir trabajadores"}
                style={{ marginLeft: 10 }}
                onClick={this.handleOpenModalSuscribir}
                type="default"
              />
              :
              <Button
                text="Eliminar suscripción"
                style={{ marginLeft: 10 }}
                onClick={this.handleModalEliminar}
                type="danger"
              />
          }
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isOpenModalEliminarSuscripcion: state.notificacionesEmpresa.isOpenModalEliminarSuscripcion,
  selectedNotification: state.notificacionesEmpresa.selectedNotification,
  isOpenModalSuscribirTrabajadores: state.notificacionesEmpresa.isOpenModalSuscribirTrabajadores,
  usuarios: state.notificacionesEmpresa.usuarios,
  typeUserRelationFilter: state.notificacionesEmpresa.typeUserRelationFilter,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetallesNotificaciones);
