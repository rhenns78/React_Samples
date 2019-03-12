import React from "react";
import { connect } from "react-redux";
import TableTabs from "../../../../../Shared/tableTabs";
import AtencionesMedicas from "./atencionesMedicas";
import PeriodosReposo from "./periodosReposo";
import EvaluacionesIncapacidad from "./evaluaciones";
import Prestaciones from "./prestacionesEconomicas";
import Denuncias from "./denuncias";
// import { doGetSiniestroEmpresaDetailsApi } from "../actions";

class DetallesSiniestroEmpresa extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      indexTable: 0,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.selectedSiniestro.IdSiniestro != null && prevProps.selectedSiniestro.IdSiniestro == null) {
      // this.props.dispatch(doGetSiniestroEmpresaDetailsApi(this.props.selectedSiniestro.IdSiniestro));
      this.setState({ indexTable: 0 });
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
    tabs.push({
      contentId: 4, index: tabs.length, Name: "Denuncias", Number: this.props.denuncias.length,
    });
    return tabs;
  }

  handleTabChange = (index) => {
    this.setState({ indexTable: index });
  }

  render() {
    return (
      <div style={{ overflowX: "hidden" }}>
        <TableTabs
          selectedSiniestro={this.props.selectedSiniestro}
          index={this.state.indexTable}
          changeTabCallback={this.handleTabChange}
          tabs={this.getTabs()}
        />

        {this.state.indexTable === 0 && <AtencionesMedicas showNoData={this.props.showNoDataAtencionesMedicasEmpresa} data={this.props.atencionesMedicas} />}
        {this.state.indexTable === 1 && <PeriodosReposo showNoData={this.props.showNoDataPeriodosReposoEmpresa} data={this.props.periodosReposo} />}
        {this.state.indexTable === 2 && <EvaluacionesIncapacidad showNoData={this.props.showNoDataEvaluacionesIncapaEmpresa} data={this.props.evaluacionesIncapa} />}
        {this.state.indexTable === 3 && <Prestaciones showNoData={this.props.showNoDataPrestacionesEconomicasEmpresa} data={this.props.prestacionesEconomicas} />}
        {this.state.indexTable === 4 && <Denuncias data={this.props.denuncias} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedSiniestro: state.siniestroEmpresa.selectedSiniestro,
  atencionesMedicas: state.siniestroEmpresa.atencionesMedicas,
  periodosReposo: state.siniestroEmpresa.periodosReposo,
  evaluacionesIncapa: state.siniestroEmpresa.evaluacionesIncapa,
  prestacionesEconomicas: state.siniestroEmpresa.prestacionesEconomicas,
  denuncias: state.siniestroEmpresa.denuncias,
  showNoDataAtencionesMedicasEmpresa: state.siniestroEmpresa.showNoDataAtencionesMedicasEmpresa,
  showNoDataPeriodosReposoEmpresa: state.siniestroEmpresa.showNoDataPeriodosReposoEmpresa,
  showNoDataEvaluacionesIncapaEmpresa: state.siniestroEmpresa.showNoDataEvaluacionesIncapaEmpresa,
  showNoDataPrestacionesEconomicasEmpresa: state.siniestroEmpresa.showNoDataPrestacionesEconomicasEmpresa,

});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetallesSiniestroEmpresa);
