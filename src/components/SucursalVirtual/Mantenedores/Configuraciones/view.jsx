import React from "react";
import { connect } from "react-redux";
import { loadTabs } from "../../../Header/actions";
import LoadingOverlay from "../../../Shared/LoadingOverlay";

import Notifiicacion from "./Notificaciones/view";

import { doGetCompanyNotificaction } from "./Notificaciones/actions";
import { checkAccess, ids } from "../../../../helpers/rolAccess";

class Mantenedores extends React.PureComponent {
  componentDidUpdate = (prevProps) => {
    if ((prevProps.userAccessIds === null && Array.isArray(this.props.userAccessIds))
      || this.props.currentHeader !== "Notificaciones") {
      this.loadTabs();
    }
  }

  loadTabs = () => {
    const tabs = [];

    if (checkAccess(ids.mantenedorNotEmpresa, this.props.userAccessIds)) tabs.push({ text: "Notificaciones empresa", contentId: 0 });

    this.props.dispatch(loadTabs("Notificaciones", tabs, tabs.length ? tabs[0].contentId : null));
  }

  renderBody = () => {
    switch (this.props.selectedTab) {
      case 0:
        this.props.dispatch(doGetCompanyNotificaction(this.props.companyId));
        return <Notifiicacion type="empresa" />;

      default:
        return <div />;
    }
  }

  render() {
    return (
      <div>
        {this.props.isLoading && <LoadingOverlay />}
        {this.renderBody()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedTab: state.header.contentId,
  currentHeader: state.header.title,
  isLoading: state.mantenedores.isLoading,
  userAccessIds: state.global.userAccessIds,
  companyId: state.global.companyId,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Mantenedores);
