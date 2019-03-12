import React from "react";
import { connect } from "react-redux";
import ReportDenuncias from "powerbi-report-component";


class DenunciasGrafico extends React.PureComponent {
  render() {
    const reporte1 = [];
    if (this.props.companyId) {
      const config1 = {};
      config1.embedType = "report";
      config1.tokenType = "Embed";
      config1.accessToken = this.props.EmbedTokenPowerBi;
      config1.embedUrl = "";
      if (this.props.sucursalId === "") {
        config1.embedUrl = `https://app.powerbi.com/reportEmbed?reportId=ed6149b4-1519-47aa-8824-d6e406535ac4&groupId=c4a892ec-8d1b-4247-b155-0bbb223555e6&pageName=ReportSectionddf8741dc7895d9d447a&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUNFTlRSQUwtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQifQ%3d%3d&filter=Consolidado/BP_RutEmpresa eq '${this.props.companyId}'`;
      } else {
        config1.embedUrl = `https://app.powerbi.com/reportEmbed?reportId=ed6149b4-1519-47aa-8824-d6e406535ac4&groupId=c4a892ec-8d1b-4247-b155-0bbb223555e6&pageName=ReportSectionddf8741dc7895d9d447a&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUNFTlRSQUwtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQifQ%3d%3d&filter=Consolidado/BP_RutEmpresa eq '${this.props.companyId}' and Consolidado/Siniestro_BPEmpresa eq '${this.props.sucursalId}'`;
      }

      config1.embedId = "ed6149b4-1519-47aa-8824-d6e406535ac4";
      config1.extraSettings = {
        filterPaneEnabled: false,
        navContentPaneEnabled: false,
        allowFullScreen: false,
      };

      const keydenuncia = `denunciasreport${new Date().getTime()}`;
      reporte1.push(<ReportDenuncias
        key={keydenuncia}
        embedType={config1.embedType}
        tokenType={config1.tokenType}
        accessToken={config1.accessToken}
        embedUrl={config1.embedUrl}
        embedId={config1.embedId}
        extraSettings={{
          filterPaneEnabled: config1.extraSettings.filterPaneEnabled,
          navContentPaneEnabled: config1.extraSettings.navContentPaneEnabled,

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
        {reporte1}
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

export default connect(mapStateToProps, mapDispatchToProps)(DenunciasGrafico);

