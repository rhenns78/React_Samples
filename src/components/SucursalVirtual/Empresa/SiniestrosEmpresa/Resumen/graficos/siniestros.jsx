import React from "react";
import { connect } from "react-redux";
import ReportSiniestro from "powerbi-report-component";
const config = {};


class SiniestrosGrafico extends React.PureComponent {
  render() {
    const reporte = [];
    if (this.props.companyId) {
      config.embedType = "report";
      config.tokenType = "Embed";
      config.accessToken = this.props.EmbedTokenPowerBi;
      config.embedUrl = "";

      if (this.props.sucursalId === "") {
        config.embedUrl = `https://app.powerbi.com/reportEmbed?reportId=ed6149b4-1519-47aa-8824-d6e406535ac4&groupId=c4a892ec-8d1b-4247-b155-0bbb223555e6&filter=Consolidado%2FBP_RutEmpresa eq '${this.props.companyId}' and Consolidado/Meses eq '${this.props.periodo}' `;
      } else {
        config.embedUrl = `https://app.powerbi.com/reportEmbed?reportId=ed6149b4-1519-47aa-8824-d6e406535ac4&groupId=c4a892ec-8d1b-4247-b155-0bbb223555e6&filter=Consolidado%2FBP_RutEmpresa eq '${this.props.companyId}' and Consolidado/Siniestro_BPEmpresa eq '${this.props.sucursalId}'`;
      }
      config.embedId = "ed6149b4-1519-47aa-8824-d6e406535ac4";
      config.extraSettings = {
        filterPaneEnabled: false,
        navContentPaneEnabled: false,
        allowFullScreen: false,
      };


      const key = `siniestro${new Date().getTime()}`;
      reporte.push(<ReportSiniestro
        key={key}
        embedType={config.embedType}
        tokenType={config.tokenType}
        accessToken={config.accessToken}
        embedUrl={config.embedUrl}
        embedId={config.embedId}
        extraSettings={{
          filterPaneEnabled: config.extraSettings.filterPaneEnabled,
          navContentPaneEnabled: config.extraSettings.navContentPaneEnabled,

        }}

        permissions="All"
        style={{
          height: "300px",
          border: "0",
          padding: "0px",
          background: "#eee",
        }}
      />);

      // console.log("url:>", config.embedUrl);
    }


    return (
      <React.Fragment >
        {reporte}
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

export default connect(mapStateToProps, mapDispatchToProps)(SiniestrosGrafico);

