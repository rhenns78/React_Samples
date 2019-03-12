import React from "react";
import { connect } from "react-redux";
import { loadTabs } from "../../../Header/actions";
import AsignacionRoles from "../GestionUsuarios/AsignacionRoles/view";

import AprobarSolicitudes from "../GestionUsuarios/AprobarSolicitudes/view";
import { checkAccess, ids } from "../../../../helpers/rolAccess";
import { getRolesByProfileId } from "./AsignacionRoles/actions";
import constants from "../../../../helpers/constants";
import { getPerfiles } from "../../Mantenedores/General/actions";
import NotificacionesEmpresa from "./Notificaciones/view";


class MiEmpresa extends React.PureComponent {
  constructor(props) {
    super(props);

    !props.perfiles.length && props.dispatch(getPerfiles());
  }

  componentDidUpdate = (prevProps) => {
    if (!this.props.roles && this.props.perfiles.length) {
      const perfilEmpresa = this.props.perfiles.find((p) => p.Code === constants.codePerfilEmpresa);
      if (perfilEmpresa) {
        this.props.dispatch(getRolesByProfileId(perfilEmpresa.Id));
      }
    }

    if ((prevProps.userAccessIds === null && Array.isArray(this.props.userAccessIds))
      || this.props.currentHeader !== "Gestionar usuarios") {
      this.loadTabs();
    }
  }

  loadTabs = () => {
    const tabs = [];

    if (checkAccess(ids.asignarRoles, this.props.userAccessIds)) tabs.push({ text: "Roles", contentId: 0 });
    if (checkAccess(ids.aprobarSolicitudes, this.props.userAccessIds)) tabs.push({ text: "Solicitudes", contentId: 1 });
    if (checkAccess(ids.notificacionesE, this.props.userAccessIds)) tabs.push({ text: "Notificaciones", contentId: 2 });

    this.props.dispatch(loadTabs("Gestionar usuarios", tabs, tabs.length ? tabs[0].contentId : null));
  }

  renderBody = () => {
    switch (this.props.selectedTab) {
      case 0: {
        return (<AsignacionRoles />);
      }
      case 1: {
        return (<AprobarSolicitudes />);
      }
      case 2: {
        return (<NotificacionesEmpresa />);
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
