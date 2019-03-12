import React from "react";

import { connect } from "react-redux";
import { Button } from "devextreme-react";
import { getLastPrestacion } from "./actions";

class LastPrestacionInfo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hide: !props.isExpanded,
    };

    props.dispatch(getLastPrestacion(props.userData.RUT));
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.isExpanded !== this.props.isExpanded) {
      this.setState({ hide: !this.props.isExpanded });
    }
  }

  render() {
    const data = this.props.lastPrestacion;
    return (
      data &&
      <div className="details-card-wrapper">
        <div className={`row zero details-card ${this.state.hide ? "hidden" : ""}`}>
          <div className="col-12" style={{ marginBottom: 10 }}>
            <div className="row zero" style={{ display: "flex", alignItems: "center" }}>
              <div className="col-12" style={{ display: "flex", alignItems: "center" }}>
                <span className="details-card-title">{`${data.TipoPrestacion} #${data.IdPrestacion}`}

                </span>
                <span
                  className="table-label-green"
                > {data.EstadoPago}
                </span>
                <Button
                  icon={this.state.hide ? "chevrondown" : "chevronup"}
                  className="show-hide-siniestro-info"
                  onClick={() => {
                    this.setState((prevState) => ({ hide: !prevState.hide }));
                  }}
                />

              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="row zero">
              <div className="col-6">Estado Documentación:</div>
              <div className="col-6" style={{ fontWeight: "bold", color: "#00B2A9" }}>{`${data.EstadoDocumentacion ? data.EstadoDocumentacion : "Sin Información"}`}</div>
            </div>

          </div>
          <div className="col-12 col-lg-4">
            <div className="row zero">
              <div className="col-6">Días a pagar:</div>
              <div className="col-6">{`${data.DiasTotalesPagados}`}</div>
            </div>

          </div>

        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  isExpanded: state.global.isExpanded,
  lastPrestacion: state.prestaciones.lastPrestacion,
  userData: state.global.userData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(LastPrestacionInfo);
