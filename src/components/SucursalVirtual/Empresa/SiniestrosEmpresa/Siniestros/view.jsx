import React from "react";
import { connect } from "react-redux";
import SwipeableViews from "react-swipeable-views";

import TablaSiniestros from "./tablaSiniestros";
import LoadingOverlay from "../../../../Shared/LoadingOverlay";
import DetallesSiniestroEmpresa from "./detalles/view";
import {
  setSiniestro,
  //  doGetSiniestrosEmpresa,
  doGetSiniestroEmpresaDetailsApi,
  setshowNoDataEmpresa,

} from "./actions";
import { doGetDocumentBySiniestro } from "../../../Documentos/actions";
import HeaderInfo from "./detalles/headerInfo";
// import ModalDocumentos from "./documentos/view";
import ModalDocumentos from "../../../Documentos/modalDocumentos";

class Siniestros extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };

    // props.dispatch(doGetSiniestrosEmpresa({
    //   RutEmpresa: props.companyId,
    // }));
  }

  handleViewDetails = (row) => {
    this.props.dispatch(doGetSiniestroEmpresaDetailsApi(row.data.IdSiniestro));
    this.setState({ index: 1 });
  }

  handleBack = () => {
    this.setState({ index: 0 });
    this.props.dispatch(setshowNoDataEmpresa({
      showNoDataAtencionesMedicasEmpresa: false,
      showNoDataPeriodosReposoEmpresa: false,
      showNoDataEvaluacionesIncapaEmpresa: false,
      showNoDataPrestacionesEconomicasEmpresa: false,

    }));
    this.props.dispatch(setSiniestro({ IdSiniestro: null }));
  }

  viewDocuments = (row) => {
    // llamo a end point que busca los documento

    const IdSiniestro = row.data.IdSiniestro;
    this.props.dispatch(doGetDocumentBySiniestro(IdSiniestro, null));
  }

  handleSetSiniestro = (data) => {
    this.props.dispatch(setSiniestro(data));
  }

  render() {
    return (
      <div>
        {this.props.isLoading && <LoadingOverlay />}
        <ModalDocumentos />
        <SwipeableViews
          index={this.state.index}
          disabled
          async
        >
          <div>
            <TablaSiniestros
              // data={this.props.siniestros}
              // onDetails={this.state.index === 1}
              handleViewDocuments={this.viewDocuments}
              setSiniestro={this.handleSetSiniestro}
              handleViewDetails={this.handleViewDetails}
            />
          </div>
          <div>
            <HeaderInfo handleBack={this.handleBack} />
            <DetallesSiniestroEmpresa />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.siniestroEmpresa.isLoading,

});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Siniestros);
