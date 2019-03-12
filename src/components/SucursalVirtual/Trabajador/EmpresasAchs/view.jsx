import React from "react";
import { connect } from "react-redux";
import { checkAccess, ids } from "../../../../helpers/rolAccess";
import { loadTabs } from "../../../Header/actions";
import Autoasignadas from "./Autoasignadas/view";

class EmpresasAchs extends React.PureComponent {
  componentDidUpdate = (prevProps) => {
    if ((prevProps.userAccessIds === null && Array.isArray(this.props.userAccessIds)) || this.props.currentHeader !== "Empresas ACHS") {
      this.loadTabs();
    }
  }

  loadTabs = () => {
    const tabs = [];
    if (checkAccess(ids.usuario, this.props.userAccessIds)) tabs.push({ text: "Empresas autoasignadas", contentId: 0 });

    this.props.dispatch(loadTabs("Empresas ACHS", tabs, tabs.length ? tabs[0].contentId : null));
  }

  renderBody = () => {
    switch (this.props.selectedTab) {
      case 0: {
        return (<Autoasignadas />);
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

export default connect(mapStateToProps, mapDispatchToProps)(EmpresasAchs);
