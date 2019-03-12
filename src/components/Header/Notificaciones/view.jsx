import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { paths } from "../../../config/routes";
// import LoadingOverlay from "../../Shared/LoadingOverlay";
import HistorialNotificacion from "./historialNotificaciones";
// import { changeTabIndex } from "../actions";
import { setPopOverStatus } from "./actions";
import { setNotificationAsReadById, setNotificationsAsReadByFilter } from "../../SucursalVirtual/Trabajador/Notificaciones/HistorialNotificaciones/actions";

class Resumen extends React.PureComponent {
  handleViewHistory = () => {
    this.props.dispatch(push(paths.configHistorialUsuario));
    // this.props.dispatch(changeTabIndex(4, 4));
    this.props.dispatch(setPopOverStatus(false));
  }
  doAsReader = (id) => {
    this.props.dispatch(setNotificationAsReadById(id));
  }
  doAsReaderMassive = () => {
    this.props.dispatch(setNotificationsAsReadByFilter({ type: "all" }));
  }
  render() {
    return (
      <div>
        <HistorialNotificacion
          doAsReaderCallback={this.doAsReader}
          doAsReaderMassiveCallback={this.doAsReaderMassive}
          handleGoToHistory={this.handleViewHistory}
        />
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  notificactionHeaderList: state.headerNotificaciones.notificactionHeaderList,
  UserInfo: state.global.userData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Resumen);
