import React from "react";
import { connect } from "react-redux";
import { Button } from "devextreme-react";
import { doGetDocumentBySiniestro } from "../../../../Documentos/actions";

const Item = (props) => (
  <div className="row zero header-item">
    <div className="col-6">{props.name}:</div>
    <div className="col-6" style={{ fontWeight: "bold", color: props.simple ? "#787878" : "#00B2A9" }}>{props.value ? props.value : "-"}</div>
  </div>
);

const EmptyIcon = (props) =>
  (<div
    className={`siniestro-empresa-reposo ${props.full ? "active" : ""}`}
    style={{
      height: props.size,
      width: props.size,
      borderRadius: props.border,
      marginLeft: 10,
      marginRight: 10,
    }}
  />);

class HeaderInfo extends React.PureComponent {
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

  handleViewDocuments = () => {
    const IdSiniestro = this.props.selectedSiniestro.IdSiniestro;
    const dataSiniestro = this.props.selectedSiniestro;
    this.props.dispatch(doGetDocumentBySiniestro(IdSiniestro, dataSiniestro));
  }

  backToSiniestros = () => {
    this.props.handleBack(0);
  }

  render() {
    const {
      selectedSiniestro,
    } = this.props;

    return (
      <div className="details-card-wrapper details">
        <Button
          className="details-card-button"
          type="success"
          onClick={this.backToSiniestros}
        >
          <i className="material-icons" style={{ marginRight: 5, fontSize: 35, transform: "rotate(180deg)" }}>subdirectory_arrow_right</i>
        </Button>
        <div className={`row zero details-card ${this.state.hide ? "hidden" : ""} details`}>
          <div className="col-12" style={{ marginBottom: 10 }}>
            <div className="col-12" style={{ display: "flex", alignItems: "center" }}>
              <span className="details-card-name">{selectedSiniestro.NombreTrabajador}</span>
              <EmptyIcon size={15} border={10} full={selectedSiniestro.ReposoActivo} />
              <span className="details-card-title">{(selectedSiniestro.TipoSiniestro === undefined) ? "" : selectedSiniestro.TipoSiniestro.DescripcionTipoSiniestro}</span>
              <Button
                icon={this.state.hide ? "chevrondown" : "chevronup"}
                className="show-hide-siniestro-info"
                onClick={() => {
                  this.setState((prevState) => ({ hide: !prevState.hide }));
                }}
              />
              <Button
                text="Documentos"
                type="default"
                onClick={this.handleViewDocuments}
                style={{
                  position: "absolute",
                  right: 0,
                }}
              />
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <Item name="Sucursal" value={(selectedSiniestro.Sucursal === undefined) ? "" : selectedSiniestro.Sucursal.Direccion} />
            <Item name="Cobertura" value={(selectedSiniestro.Cobertura === undefined) ? "" : selectedSiniestro.Cobertura.DescripcionCobertura} />
            {/* <Item simple name="Próxima consulta" value={selectedSiniestro.ProximaConsulta} /> */}
            <Item name="Mecanismo del accidente" value={selectedSiniestro.MecanismoAccidente} />
          </div>
          <div className="col-12 col-lg-4">
            <Item name="Cantidad de reposos" value={selectedSiniestro.CantidadReposo} />
            <Item name="Días totales del siniestro" value={selectedSiniestro.DiasTotalesReposo} />
            <Item name="Días totales imputables" value={selectedSiniestro.DiasTotalesImputables} />
            <Item name="Rebajas" value={selectedSiniestro.DiasTotalesRebaja} />
          </div>
          <div className="col-12 col-lg-4">
            <Item simple name="Fecha presentación" value={selectedSiniestro.FechaPresentacion} />
            <Item simple name="Fecha siniestro" value={selectedSiniestro.FechaSiniestro} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isExpanded: state.global.isExpanded,
  selectedSiniestro: state.siniestroEmpresa.selectedSiniestro,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderInfo);
