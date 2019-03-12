import React from "react";
import { connect } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { Button } from "devextreme-react";
import ListaNotificaciones from "./Componentes/listaNotificaciones";
import DetallesNotificaciones from "./detallesNotificacion";
import { doGetNotificaciones,
  doGetUsuarios,
  doGetUsuariosExternos,
  doGetNotificacionesExternos,
  openCloseModalSuscripcionMasiva,
  setSelectedNotification, setTypeRelationFilter, openCloseModalSuscribirTrabajadores } from "./actions";
import ModalSuscripcionMasiva from "./Componentes/ModalSuscripcionMasiva";
import ModalSuscribirTrabajadores from "./Componentes/modalSuscribirTrabajadores";
import UserSearch from "./Componentes/userSearch";
import LoadingOverlay from "../../../../Shared/LoadingOverlay";
import SelectTipo from "../../../../Shared/SelectTipo";
class NotificacionesEmpresa extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };

    props.typeUserRelationFilter === "INT" ? props.dispatch(doGetNotificaciones(props.companyId)) :
      props.dispatch(doGetNotificacionesExternos(props.companyId));

    props.typeUserRelationFilter === "INT" ? props.dispatch(doGetUsuarios(props.companyId))
      : props.dispatch(doGetUsuariosExternos(props.companyId));
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.typeUserRelationFilter !== this.props.typeUserRelationFilter) {
      if (this.props.typeUserRelationFilter === "INT") {
        this.props.dispatch(doGetUsuarios(this.props.companyId));
        this.props.dispatch(doGetNotificaciones(this.props.companyId));
      }
      if (this.props.typeUserRelationFilter === "EXT") {
        this.props.dispatch(doGetUsuariosExternos(this.props.companyId));
        this.props.dispatch(doGetNotificacionesExternos(this.props.companyId));
      }
    }
  }
  handleSuscripcionMasiva = (isOpen) => {
    this.props.dispatch(openCloseModalSuscripcionMasiva(isOpen));
  }

  handleDetails = (event) => {
    this.props.dispatch(setSelectedNotification(event.itemData));
    this.setState({ index: 1 });
  }

  handleBack = () => {
    this.setState({ index: 0 });
  }
  handleSelectTipo =(e) => {
    let typeUserRelationFilter = "INT";
    if (e.name === "Trabajadores sin registro") {
      typeUserRelationFilter = "EXT";
    }
    this.props.dispatch(setTypeRelationFilter(typeUserRelationFilter));
  }

  handleOpenModalSuscribir = () => {
    this.props.dispatch(openCloseModalSuscribirTrabajadores(true));
    // this.props.dispatch(availableListUser(false));
  }
  handleModalClose = () => {
    this.props.dispatch(openCloseModalSuscribirTrabajadores(false));
  }
  

  render() {
    return (
      <React.Fragment>
        {this.props.isLoading && <LoadingOverlay />}
        <SwipeableViews
          index={this.state.index}
          disabled
          async
        >
          <div>
            <ModalSuscripcionMasiva
              onClose={() => this.handleSuscripcionMasiva(false)}
              isOpen={this.props.isOpenModalSuscripcionMasiva}
            />
            <ModalSuscribirTrabajadores
              onClose={this.handleModalClose}
              isOpen={this.props.isOpenModalSuscribirTrabajadores}
            />

            <div style={{ display: "flex", flexDirection: "row" }}>
              <SelectTipo
                selected={this.props.selectedOption}
                onClick={this.handleSelectTipo}
                items={[
                  { name: "Trabajadores internos" },
                  { name: "Trabajadores sin registro" },

                ]}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <UserSearch
                placeholder="Buscar trabajador"
                style={{ flexGrow: 1, marginRight: 10 }}
              />
              {this.props.typeUserRelationFilter === "EXT" ?
                <Button
                  text="Suscribir trabajador"
                  type="default"
                  onClick={() => this.handleOpenModalSuscribir(true)}
                />
                :
                <Button
                  text="Suscripción masiva"
                  type="default"
                  onClick={() => this.handleSuscripcionMasiva(true)}
                />
              }


            </div>
            <ListaNotificaciones
              onDetails={this.handleDetails}
              selectionMode="single"
              data={this.props.notificaciones}
            />
          </div>

          <div>
            <DetallesNotificaciones
              onBack={this.handleBack}
            />
          </div>
        </SwipeableViews>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.notificacionesEmpresa.isLoading,
  notificaciones: state.notificacionesEmpresa.notificaciones,
  isOpenModalSuscripcionMasiva: state.notificacionesEmpresa.isOpenModalSuscripcionMasiva,
  selectedOption: state.notificacionesEmpresa.selectedOption,
  companyId: state.global.companyId,
  sucursalId: state.global.sucursalId,
  typeUserRelationFilter: state.notificacionesEmpresa.typeUserRelationFilter,
  usuarios: state.notificacionesEmpresa.usuarios,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificacionesEmpresa);
