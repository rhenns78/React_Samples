import React from "react";
import { connect } from "react-redux";
import { Popup } from "devextreme-react";
import { viewDocumentos, doOpenDocument } from "./actions";


import TablaArchivos from "./tablaArchivos";
import LoadingOverlay from "../../Shared/LoadingOverlay";

class ModalDocumentos extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 1,
      selectedDoc: {},
    };
  }

  handleClose = () => {
    this.props.dispatch(viewDocumentos(false, {}));
    this.setState({ index: 0, selectedDoc: {} });
  }

  handleBack = () => {
    this.setState({ index: 0, selectedDoc: {} });
  }

  handleArchivos = (selectedDocument) => {
    this.setState({ index: 1, selectedDoc: selectedDocument });
  }
  openFile = (DocumentId) => {
    this.props.dispatch(doOpenDocument(DocumentId));
  }

  render() {
    // console.log("En carpeta documentos");
    const {
      viewDocumentos,
      infoDocuments,
    } = this.props;
    return (
      <Popup
        visible={viewDocumentos}
        showTitle
        maxHeight="600px"
        dragEnabled={false}
        onHiding={this.handleClose}
        closeOnOutsideClick
        title={`Documentos - ${infoDocuments && infoDocuments.TipoSiniestro !== "undefined" ? infoDocuments.TipoSiniestro : "S/D"} #${infoDocuments ? infoDocuments.IdSiniestro : ""}`}

        contentRender={() =>
          (<div className="row" style={{ padding: 10 }}>
            {this.props.isLoading && <LoadingOverlay />}
            <TablaArchivos openFile={this.openFile} documento={this.props.listDocuments} />

          </div>)
        }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  infoDocuments: state.documentos.infoDocuments,
  viewDocumentos: state.documentos.viewDocumentos,
  listDocuments: state.documentos.listDocuments,
  isLoading: state.documentos.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalDocumentos);
