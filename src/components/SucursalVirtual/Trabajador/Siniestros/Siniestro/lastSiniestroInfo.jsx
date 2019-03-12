import React from "react";
import { Button } from "devextreme-react";
import { connect } from "react-redux";
import { doGetDocumentBySiniestro } from "../../../Documentos/actions";
import validaciones from "../../../../../helpers/validaciones";

const EmptyIcon = (props) =>
  (<div
    style={{
      height: props.size,
      width: props.size,
      borderRadius: props.border,
      border: "solid 1px rgba(255, 255, 255, .5)",
      backgroundColor: props.full ? "#9DC551" : "#888B8D",
    }}
  />);

class LastSiniestroInfo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hide: !props.isExpanded,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.isExpanded !== this.props.isExpanded) {
      this.setState({ hide: !this.props.isExpanded });
    }
  }

  handleViewDetails = (data) => {
    this.props.handleDetails(1, data);
  }

  handleBack = () => {
    this.props.handleDetails(0, { IdSiniestro: null });
  }

  handleViewDocuments = (row) => {
    const IdSiniestro = row.IdSiniestro;
    const data = row;
    this.props.dispatch(doGetDocumentBySiniestro(IdSiniestro, data));
  }

  render() {
    const {
      selectedSiniestro,
      lastSiniestro,
      listaSiniestros,
    } = this.props;

    const data = this.props.showingDetails ? selectedSiniestro : lastSiniestro;

    if (validaciones.isEmpty(data)) return null;

    if (listaSiniestros && !this.props.showingDetails) {
      const siniestroActivo = listaSiniestros.filter((item) => item.Reposo);
      if (siniestroActivo.length === 0) {
        return <div></div>;
      }
    }

    return (
      <div className={`details-card-wrapper ${this.props.showingDetails ? "details" : ""}`}>
        {this.props.showingDetails &&
          <Button
            className="details-card-button"
            type="success"
            onClick={() => this.handleBack()}
          >
            <i className="material-icons" style={{ marginRight: 5, fontSize: 35, transform: "rotate(180deg)" }}>subdirectory_arrow_right</i>
          </Button>
        }

        <div className={`row zero details-card ${this.state.hide ? "hidden" : ""} ${this.props.showingDetails ? "details" : ""}`}>
          <div className="col-12" style={{ marginBottom: 10 }}>
            <div className="col-12" style={{ display: "flex", alignItems: "center" }}>
              <EmptyIcon size={20} border={10} full={data.Reposo} />
              <span className="details-card-title">{`${data.TipoSiniestro} #${data.IdSiniestro}`}</span>
              <Button
                icon={this.state.hide ? "chevrondown" : "chevronup"}
                className="show-hide-siniestro-info"
                onClick={() => {
                  this.setState((prevState) => ({ hide: !prevState.hide }));
                }}
              />
              {!this.props.showingDetails && <Button
                onClick={() => this.handleViewDetails(data)}
                text="Ver detalle"
                type="success"
                style={{
                  marginLeft: 15,
                }}
              />}
              {this.props.showingDetails && <Button
                text="Documentos"
                type="default"
                onClick={() => this.handleViewDocuments(data)}
                style={{
                  position: "absolute",
                  right: 0,
                }}
              />}
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="row zero">
              <div className="col-6">Próxima citación:</div>
              <div className="col-6" style={{ fontWeight: "bold", color: "#00B2A9" }}>{`${data.ProximaConsulta || "-"}`}</div>
            </div>
            <div className="row zero">
              <div className="col-6">Lugar próxima consulta:</div>
              <div className="col-6">{`${data.LugarProximaConsulta || "-"}`}</div>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="row zero">
              <div className="col-6">Cobertura:</div>
              <div className="col-6">{`${data.Calificacion}`}</div>
            </div>
            <div className="row zero">
              <div className="col-6">Prestación económica:</div>
              <div className="col-6" style={{ fontWeight: "bold", color: "#00B2A9" }}>{data.PrestacionesEconomicas ? "Si" : "No"}</div>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="row zero">
              <div className="col-6 col-lg-6">Fecha presentación:</div>
              <div className="col-6 col-lg-6">{`${data.FechaPresentacion && new Date(data.FechaPresentacion).toLocaleDateString()}`}</div>
              <div className="col-6 col-lg-6">Fecha siniestro:</div>
              <div className="col-6 col-lg-6">{`${data.FechaSiniestro && new Date(data.FechaSiniestro).toLocaleDateString()}`}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  isExpanded: state.global.isExpanded,
  selectedSiniestro: state.siniestro.selectedSiniestro,
  lastSiniestro: state.siniestro.lastSiniestro,
  listaSiniestros: state.siniestro.listaSiniestros,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(LastSiniestroInfo);
