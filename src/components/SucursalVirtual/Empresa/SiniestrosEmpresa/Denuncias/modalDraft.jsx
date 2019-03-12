import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Popup, Button } from "devextreme-react";
import { openCloseModalContinue, setShowHideForm, setCleanDataComplain, doDeleteDraft, openCloseModalDelete, updateDataGridDenuncias } from "./actions";


class ModalDraft extends React.PureComponent {
  handleDelete = () => {
    this.props.dispatch(openCloseModalDelete(true));
    this.props.dispatch(openCloseModalContinue(false));
  }

  handleCerrarDelete = () => {
    this.props.dispatch(openCloseModalDelete(false));
  }

  doDeleteDraft = () => {
    const idComplaint = this.props.jsonData.Id;
    this.props.dispatch(doDeleteDraft(idComplaint));
    this.props.dispatch(setCleanDataComplain());
    this.props.dispatch(openCloseModalDelete(false));
    this.props.dispatch(updateDataGridDenuncias(true));
  }

  handleCerrar = () => {
    this.props.dispatch(setShowHideForm(false));
    this.props.dispatch(setCleanDataComplain());
    this.props.dispatch(openCloseModalContinue(false));
  }

  handleOpenDraft = () => {
    this.props.dispatch(setShowHideForm(true));
    this.props.dispatch(openCloseModalContinue(false));
  }

  render() {
    return (
      <Fragment>
        <Popup
          visible={this.props.isOpenModalContinue}
          dragEnabled={false}
          maxHeight="200px"
          onHiding={() => this.handleCerrar(false)}
          maxWidth="500px"
          title="Borrador"
          showTitle
          contentComponent={React.memo((Props) => (
            <React.Fragment>
              <div className="col-12" style={{ justifyContent: "center" }}>
                <div style={{ width: "100%", textAlign: "center" }}>
                  <p> ¿Deseas continuar con la denuncia en curso o descartar el borrador y eliminar sus datos? </p>
                </div>
              </div>
              <div className="col-12" style={{ marginTop: 20 }} >
                <Button
                  text="Descartar borrador"
                  className="delete-button-outline"
                  type="normal"
                  onClick={() => this.handleDelete(true)}
                />
                <Button
                  text="Continuar Borrador"
                  type="success"
                  onClick={this.handleOpenDraft}
                  style={{ float: "right" }}
                />
              </div>
            </React.Fragment>
          ))}
        />

        <Popup
          visible={this.props.isOpenModalDelete}
          dragEnabled={false}
          maxHeight="200px"
          onHiding={() => this.handleCerrarDelete()}
          maxWidth="500px"
          title="Borrador"
          showTitle
          contentComponent={React.memo((Props) => (
            <React.Fragment>
              <div className="col-12" style={{ justifyContent: "center" }}>
                <div style={{ width: "100%", textAlign: "center" }}>
                  <p> ¿Estás seguro de descartar el borrador? </p>
                  <p> Todos los datos ingresos se perderán </p>
                </div>
              </div>
              <div className="col-12" style={{ marginTop: 20, textAlign: "center" }} >
                <Button
                  text="Cancelar"
                  type="normal"
                  onClick={() => this.handleCerrarDelete(true)}
                />
                <Button
                  text="Descartar borrador"
                  type="danger"
                  onClick={this.doDeleteDraft}
                  style={{ marginLeft: 30 }}
                />
              </div>
            </React.Fragment>
          ))}
        />
      </Fragment>
    );
  }
}


const mapStateToProps = (state) => ({

  isOpenModalContinue: state.denuncias.isOpenModalContinue,
  isOpenModalDelete: state.denuncias.isOpenModalDelete,
  jsonData: state.denuncias.jsonData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalDraft);
