import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Popup, Button } from "devextreme-react";
import { openCloseModalContinue, setShowHideForm, setCleanDataDraft, doDeleteDraft, openCloseModalDelete } from "./actions";
import validaciones from "../../../../../helpers/validaciones";

class ModalDraft extends React.PureComponent {
  handleDelete = () => {
    this.props.dispatch(openCloseModalDelete(true));
    this.props.dispatch(openCloseModalContinue(false));
  }

  handleCerrarDelete = () => {
    this.props.dispatch(openCloseModalDelete(false));
  }

  doDeleteDraft = () => {
    const IdDraftFinancialBenefit = this.props.jsonData.Id;
    const rutWorker = validaciones.formatRut(this.props.jsonData.formInfoTrabajador.Rut, { showDots: false, showHyphen: true });
    const data = {
      rutUsuario: this.props.userData.RUT,
      rutTrabajador: rutWorker,
      idPrestacion: this.props.jsonData.idFinancialBenefit,
    };
   
  
    this.props.dispatch(doDeleteDraft(IdDraftFinancialBenefit, data));
    this.props.dispatch(setCleanDataDraft());
    this.props.dispatch(openCloseModalDelete(false));
  }

  handleCerrar = () => {
    this.props.dispatch(setShowHideForm(false));
    this.props.dispatch(setCleanDataDraft());
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
                  <p> ¿Deseas continuar el borrador documento o desea eliminarlo? </p>
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

  isOpenModalContinue: state.prestacionesEmpresa.isOpenModalContinue,
  isOpenModalDelete: state.prestacionesEmpresa.isOpenModalDelete,
  jsonData: state.prestacionesEmpresa.jsonData,
  userData: state.global.userData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalDraft);
