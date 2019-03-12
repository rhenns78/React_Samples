import React from "react";
import { connect } from "react-redux";
import { loadTabs } from "../../../Header/actions";

import { checkAccess, ids } from "../../../../helpers/rolAccess";


import HistorialNoficaciones from "./HistorialNotificaciones/view";
import ConfiguracionNotificacion from "./ConfiguracionNotificaciones/view";
class Notificaciones extends React.PureComponent {
  componentDidUpdate = (prevProps) => {
    if ((prevProps.userAccessIds === null && Array.isArray(this.props.userAccessIds))
      || this.props.currentHeader !== "Notificaciones") {
      this.loadTabs();
    }
  }

  loadTabs = () => {
    const tabs = [];

    if (checkAccess(ids.notificacionesT, this.props.userAccessIds)) tabs.push({ text: "Historial de notificaciones", contentId: 0 });
    if (checkAccess(ids.configuracionNotificacion, this.props.userAccessIds)) tabs.push({ text: "Configuración notificaciones", contentId: 1 });
    this.props.dispatch(loadTabs("Notificaciones", tabs, tabs.length ? tabs[0].contentId : null));
  }

  renderBody = () => {
    switch (this.props.selectedTab) {
      case 0: {
        return (<HistorialNoficaciones />);
      }
      case 1: {
        return (<ConfiguracionNotificacion />);
      }
      default:
        return <div />;
    }
  }
  render() {
    return (
      <div style={{ paddingBottom: 60 }}>
        {this.renderBody()}

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  UserInfo: state.global.userData,
  selectedTab: state.header.contentId,
  currentHeader: state.header.title,
  userAccessIds: state.global.userAccessIds,


});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notificaciones);
