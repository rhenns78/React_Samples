import React from "react";
import { connect } from "react-redux";
import { loadTabs } from "../../../Header/actions";
// import AsignacionRoles from "../MiEmpresa/AsignacionRoles/view";
// import AprobarSolicitudes from "../MiEmpresa/AprobarSolicitudes/view";
import { checkAccess, ids } from "../../../../helpers/rolAccess";
// import { getRolesByProfileId } from "./AsignacionRoles/actions";
// import constants from "../../../../helpers/constants";

// import NotificacionesEmpresa from "./Notificaciones/view";
import DatosEmpresa from "./DatosEmpresa/view";

class MiEmpresa extends React.PureComponent {
  componentDidUpdate = (prevProps) => {
    if ((prevProps.userAccessIds === null && Array.isArray(this.props.userAccessIds))
      || this.props.currentHeader !== "Mi Empresa") {
      this.loadTabs();
    }
  }

  loadTabs = () => {
    const tabs = [];
    if (checkAccess(ids.datosEmpresa, this.props.userAccessIds)) tabs.push({ text: "Datos Empresa", contentId: 0 });

    this.props.dispatch(loadTabs("Mi Empresa", tabs, tabs.length ? tabs[0].contentId : null));
  }

  renderBody = () => {
    switch (this.props.selectedTab) {
      case 0: {
        return (<DatosEmpresa />);
      }

      default:
        return <div />;
    }
  }
  render() {
    return (
      <div>
        {this.renderBody()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userAccessIds: state.global.userAccessIds,
  selectedTab: state.header.contentId,
  currentHeader: state.header.title,
  roles: state.asignacionRoles.roles,
  perfiles: state.mantenedores.perfiles,
  rolesMAntenedor: state.mantenedores.roles,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(MiEmpresa);
