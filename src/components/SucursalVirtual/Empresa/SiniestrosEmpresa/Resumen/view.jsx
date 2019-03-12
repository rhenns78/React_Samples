import React from "react";
import { connect } from "react-redux";
import LoadingOverlay from "../../../../Shared/LoadingOverlay";
import SelectTipo from "../../../../Shared/SelectTipo";
import Indicadores from "./indicadores";

import { cleanGraphicsSetting } from "../../../Graficos/actions";
import ReportSiniestros from "./graficos/siniestros";
import ReportDeununcias from "./graficos/denuncias";
import PrestacionesGrafico from "./graficos/prestaciones";


const Data = [
  { name: "trabajo", value: 10 },
  { name: "trayecto", value: 22 },
  { name: "enfermedad", value: 0 },
];
class Resumen extends React.PureComponent {
  constructor(props) {
    super(props);
    props.dispatch(cleanGraphicsSetting());
  }


  handleSelectTipo = (tipo) => {
    // this.props.dispatch(setTipoDenuncia(tipo));
  }
  renderIndicadores = () => (
    <React.Fragment >


      <div className="indicadoresCard-flex" >
        <div className="indicadoresCard-content" >
          <span className="dx-form-group-caption" style={{ color: "#004A52", marginTop: 10 }} >  Siniestro de Enero 2018 </span>
          <Indicadores sources={Data} />

        </div>
        <div className="indicadoresCard-content" >
          <span className="dx-form-group-caption" style={{ color: "#004A52", marginTop: 10 }} >Siniestro de Enero 2019</span>
          <Indicadores />
        </div>


      </div>
    </React.Fragment>)


  render() {
    // console.log(this.props.companyId, this.props.sucursalId);
    return (
      <div>
        {this.props.isLoadingGraphics && <LoadingOverlay />}
        <div style={{ marginBottom: 40 }} >
          {this.renderIndicadores()}
        </div>
        <div style={{ marginBottom: 40 }} >
          <div className="indicadoresCard-flex" >
            <div className="tituloSeccion"> <span className="texto"> Periodo de consulta: </span>
              <SelectTipo
                selected={this.props.selectedOption}
                onClick={this.handleSelectTipo}
                items={[
                  { name: "12 meses anteriores" },
                  { name: "6 meses anteriores" },
                  { name: "3 meses anteriores" },
                ]}
              />

            </div>

          </div>
          <div style={{ marginLeft: 3 }} >
            <span className="dx-form-group-caption" style={{ color: "#004A52", marginTop: 40 }} >Siniestros</span>
            <div className="dashboard-card">
              {this.props.EmbedTokenPowerBi ? <ReportSiniestros /> : null}
            </div>


          </div>
        </div>
        <div style={{ marginBottom: 40, marginLeft: 3 }} >
          <div className="indicadoresCard-flex" >
            <div className="indicadoresCard-content" >
              <span className="dx-form-group-caption" style={{ color: "#004A52", marginTop: 10 }} >Denuncias </span>
              <div className="dashboard-card" style={{ marginRight: 10 }}>
                {this.props.EmbedTokenPowerBi ? <ReportDeununcias /> : null}
              </div>
            </div>
            <div className="indicadoresCard-content" >
              <span className="dx-form-group-caption" style={{ paddingLeft: 10, color: "#004A52", marginTop: 10 }} >Prestaciones Económicas</span>
              <div className="dashboard-card" style={{ marginLeft: 10 }}>
                {this.props.EmbedTokenPowerBi ? <PrestacionesGrafico /> : null}
              </div>
            </div>


          </div>
        </div>


      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  isLoading: state.resumenEmpresa.isLoading,
  selectedOption: state.resumenEmpresa.selectedOption,
  isLoadingGraphics: state.graficos.isLoading,

  userAccessIds: state.global.userAccessIds,
  showHideGriphics: state.graficos.showHideGriphics,
  EmbedTokenPowerBi: state.graficos.EmbedTokenPowerBi,

  companyId: state.global.companyId,
  sucursalId: state.global.sucursalId,

});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Resumen);
