import React from "react";
import { connect } from "react-redux";
import TablaAtencionesMedicas from "./TablaAtencionesMedicas";
import TablaPeriodosReposo from "./TablaPeriodosReposo";
import TablaEvalacionInca from "./TablaEvaluacion";
import TablaPrestaciones from "./tablaPrestaciones";
import { doGetDetails } from "../actions";
import TableTabs from "../../../../../Shared/tableTabs";


class Details extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tableStep: 0,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.selectedSiniestro.IdSiniestro != null && prevProps.selectedSiniestro.IdSiniestro == null) {
      this.props.dispatch(doGetDetails(this.props.selectedSiniestro.IdSiniestro));
      this.setState({ tableStep: 0 });
    }
  }

  getTabs = () => {
    const tabs = [];
    tabs.push({
      contentId: 0, index: tabs.length, Name: "Atenciones médicas", Number: this.props.atencionesMedicas.length,
    });
    tabs.push({
      contentId: 1, index: tabs.length, Name: "Periodos de reposo", Number: this.props.periodosReposo.length,
    });
    this.props.evaluacionesIncapa.length && tabs.push({
      contentId: 2, index: tabs.length, Name: "Evaluación de incapacidad", Number: this.props.evaluacionesIncapa.length,
    });
    tabs.push({
      contentId: 3, index: tabs.length, Name: "Prestaciones económicas", Number: this.props.prestacionesEconomicas.length,
    });
    return tabs;
  }

  handleChangeTab = (index) => {
    this.setState({ tableStep: index });
  }


  render() {
    return (
      <div style={{ overflowX: "hidden" }}>
        <TableTabs
          selectedSiniestro={this.props.selectedSiniestro}
          index={this.state.tableStep}
          changeTabCallback={this.handleChangeTab}
          tabs={this.getTabs()}
        />

        {this.state.tableStep === 0 && <TablaAtencionesMedicas showNoData={this.props.showNoDataAtencionesMedicas} data={this.props.atencionesMedicas} />}
        {this.state.tableStep === 1 && <TablaPeriodosReposo data={this.props.periodosReposo} />}
        {this.state.tableStep === 2 && <TablaEvalacionInca data={this.props.evaluacionesIncapa} />}
        {this.state.tableStep === 3 && <TablaPrestaciones data={this.props.prestacionesEconomicas} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedSiniestro: state.siniestro.selectedSiniestro,
  atencionesMedicas: state.siniestro.atencionesMedicas,
  periodosReposo: state.siniestro.periodosReposo,
  evaluacionesIncapa: state.siniestro.evaluacionesIncapa,
  prestacionesEconomicas: state.siniestro.prestacionesEconomicas,
  showNoDataAtencionesMedicas: state.siniestro.showNoDataAtencionesMedicas,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
