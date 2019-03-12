import React from "react";
import { connect } from "react-redux";
import { loadTabs } from "../../../Header/actions";
// import LoadingOverlay from "../../../Shared/LoadingOverlay";
import Roles from "./Roles/roles";
import Perfiles from "./Perfiles/view";
// import Notifiicacion from "./Notificaciones/view";
// // getRoles,
// import { getPerfiles } from "./../General/actions";
// import { doGetCompanyNotificaction } from "../../Mantenedores/Notificaciones/actions";
import { checkAccess, ids } from "../../../../helpers/rolAccess";

class Mantenedores extends React.PureComponent {
  // constructor(props) {
  //   super(props);

  //   // if (!props.roles.length) props.dispatch(getRoles());
  //   // if (!props.perfiles.length) props.dispatch(getPerfiles());
  // }

  componentDidUpdate = (prevProps) => {
    if ((prevProps.userAccessIds === null && Array.isArray(this.props.userAccessIds))
      || this.props.currentHeader !== "General") {
      this.loadTabs();
    }
  }

  loadTabs = () => {
    const tabs = [];
    if (checkAccess(ids.roles, this.props.userAccessIds)) tabs.push({ text: "Roles", contentId: 0 });
    if (checkAccess(ids.perfiles, this.props.userAccessIds)) tabs.push({ text: "Perfiles", contentId: 1 });

    this.props.dispatch(loadTabs("General", tabs, tabs.length ? tabs[0].contentId : null));
  }

  renderBody = () => {
    switch (this.props.selectedTab) {
      case 0:
        return <Roles />;
      case 1:
        return <Perfiles />;


      default:
        return <div />;
    }
  }

  render() {
    return (
      <div>
        {/* {this.props.isLoading && <LoadingOverlay />} */}
        {this.renderBody()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedTab: state.header.contentId,
  currentHeader: state.header.title,
  roles: state.mantenedores.roles,
  perfiles: state.mantenedores.perfiles,
  isLoading: state.mantenedores.isLoading,
  userAccessIds: state.global.userAccessIds,
  companyId: state.global.companyId,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Mantenedores);
