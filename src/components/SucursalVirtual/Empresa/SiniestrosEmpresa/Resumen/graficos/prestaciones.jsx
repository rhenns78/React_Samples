import React from "react";
import { connect } from "react-redux";
import ReportPrestaciones from "powerbi-report-component";


class PrestacionesGrafico extends React.PureComponent {
  render() {
    const reporte3 = [];
    if (this.props.companyId) {
      const config2 = {};
      config2.embedType = "report";
      config2.tokenType = "Embed";
      config2.accessToken = this.props.EmbedTokenPowerBi;
      config2.embedUrl = "";
      if (this.props.sucursalId === "") {
        config2.embedUrl = `https://app.powerbi.com/reportEmbed?reportId=ed6149b4-1519-47aa-8824-d6e406535ac4&groupId=c4a892ec-8d1b-4247-b155-0bbb223555e6&pageName=ReportSectionddf8741dc7895d9d447a&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUNFTlRSQUwtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQifQ%3d%3d&filter=Consolidado/BP_RutEmpresa eq '${this.props.companyId}'`;
      } else {
        config2.embedUrl = `https://app.powerbi.com/reportEmbed?reportId=ed6149b4-1519-47aa-8824-d6e406535ac4&groupId=c4a892ec-8d1b-4247-b155-0bbb223555e6&pageName=ReportSectionddf8741dc7895d9d447a&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUNFTlRSQUwtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQifQ%3d%3d&filter=Consolidado/BP_RutEmpresa eq '${this.props.companyId}' and Consolidado/Siniestro_BPEmpresa eq '${this.props.sucursalId}'`;
      }
      config2.embedId = "ed6149b4-1519-47aa-8824-d6e406535ac4";
      config2.extraSettings = {
        filterPaneEnabled: false,
        navContentPaneEnabled: false,
        allowFullScreen: false,
      };
      const prestaciones = `prestaciones${new Date().getTime()}`;
      reporte3.push(<ReportPrestaciones
        key={prestaciones}
        embedType={config2.embedType}
        tokenType={config2.tokenType}
        accessToken={config2.accessToken}
        embedUrl={config2.embedUrl}
        embedId={config2.embedId}
        extraSettings={{
          filterPaneEnabled: config2.extraSettings.filterPaneEnabled,
          navContentPaneEnabled: config2.extraSettings.navContentPaneEnabled,

        }}

        permissions="All"
        style={{
          height: "300px",
          border: "0",
          padding: "0px",
          background: "#eee",
        }}
      />);
    }


    return (

      <React.Fragment >
        {reporte3}
      </React.Fragment>

    );
  }
}
const mapStateToProps = (state) => ({

  EmbedTokenPowerBi: state.graficos.EmbedTokenPowerBi,
  companyId: state.global.companyId,
  sucursalId: state.global.sucursalId,

});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PrestacionesGrafico);

