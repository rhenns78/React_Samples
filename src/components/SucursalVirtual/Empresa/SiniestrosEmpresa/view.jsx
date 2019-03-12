import React from "react";
import { connect } from "react-redux";

import { checkAccess, ids } from "../../../../helpers/rolAccess";
import { loadTabs } from "../../../Header/actions";

import Resumen from "./Resumen/view";
import Siniestros from "./Siniestros/view";
import Denuncias from "./Denuncias/view";
import PrestacionesEconomicas from "./PrestacionesEconomicas/view";


class SiniestrosEmpresa extends React.PureComponent {
  componentDidUpdate = (prevProps) => {
    if ((prevProps.userAccessIds === null && Array.isArray(this.props.userAccessIds))
      || this.props.currentHeader !== "Siniestros ") {
      this.loadTabs();
    }
  }


  loadTabs = () => {
    const tabs = [];
    if (checkAccess(ids.resumenSiniestro, this.props.userAccessIds)) tabs.push({ text: "Resumen", contentId: 0 });
    if (checkAccess(ids.siniestroEmpresa, this.props.userAccessIds)) tabs.push({ text: "Siniestros", contentId: 1 });
    if (checkAccess(ids.denunciasEmpresa, this.props.userAccessIds)) tabs.push({ text: "Denuncias", contentId: 2 });
    if (checkAccess(ids.prestacionesEmpresa, this.props.userAccessIds)) tabs.push({ text: "Prestaciones económicas", contentId: 3 });

    this.props.dispatch(loadTabs("Siniestros ", tabs, tabs.length ? tabs[0].contentId : null));
  }

  renderBody = () => {
    switch (this.props.selectedTab) {
      case 0: {
        return (
          <React.Fragment >
            <Resumen key="resumen" />
          </React.Fragment>);
      }
      case 1: {
        return (

          <React.Fragment>
            <Siniestros />
          </React.Fragment>
        );
      }
      case 2: {
        return (
          <React.Fragment>
            <Denuncias />
          </React.Fragment>
        );
      }
      case 3: {
        return (<PrestacionesEconomicas />);
      }
      default:
        return <div />;
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderBody()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedTab: state.header.contentId,
  currentHeader: state.header.title,
  userAccessIds: state.global.userAccessIds,
  // showHideGriphics: state.graficos.showHideGriphics,
  // EmbedTokenPowerBi: state.graficos.EmbedTokenPowerBi,

  companyId: state.global.companyId,
  sucursalId: state.global.sucursalId,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SiniestrosEmpresa);
