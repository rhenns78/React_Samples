import React from "react";
import { connect } from "react-redux";
import { checkAccess, ids } from "../../../../helpers/rolAccess";
import { loadTabs } from "../../../Header/actions";

import Siniestro from "./Siniestro/view";
import Prestaciones from "./Prestaciones/view";

class Siniestros extends React.PureComponent {
  componentDidUpdate = (prevProps) => {
    if ((prevProps.userAccessIds === null && Array.isArray(this.props.userAccessIds))
      || this.props.currentHeader !== "Siniestros") {
      this.loadTabs();
    }
  }

  loadTabs = () => {
    const tabs = [];
    if (checkAccess(ids.siniestro, this.props.userAccessIds)) tabs.push({ text: "Siniestros", contentId: 0 });
    if (checkAccess(ids.prestaciones, this.props.userAccessIds)) tabs.push({ text: "Prestaciones económicas", contentId: 1 });
    this.props.dispatch(loadTabs("Siniestros", tabs, tabs.length ? tabs[0].contentId : null));
  }

  renderBody = () => {
    switch (this.props.selectedTab) {
      case 0: {
        return (<Siniestro />);
      }
      case 1: {
        return (<Prestaciones />);
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
  selectedTab: state.header.contentId,
  currentHeader: state.header.title,
  userAccessIds: state.global.userAccessIds,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Siniestros);
