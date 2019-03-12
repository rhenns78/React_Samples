import React from "react";
import { connect } from "react-redux";
import { Button, TextBox, TextArea } from "devextreme-react";
import moment from "moment";
import DataGrid, {
  Column,
} from "devextreme-react/ui/data-grid";
import helper from "../../../../../helpers/validaciones";
import Modal from "./modal";
import UserInfo from "./userInfo";
import LoadingOverLay from "../../../../Shared/LoadingOverlay";

import { doSendNewSolicitud, doDeleteSolicitud, doResendSolicitud, doGetSolicitudes, setErrorCompanyRut } from "./actions";


const actionButtonStyle = {
  padding: "0px 0px 4px 0px",
  width: "70%",
  height: 30,
  marginTop: 5,
};

const ActionButton = (props) => (
  <Button
    type={props.type}
    disabled={props.disabled}
    text={props.text}
    onClick={props.onClick}
    style={props.style}
    render={(btn) => (
      <div
        style={{
          padding: "7px 0px 0px 0px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",

        }}
      >{btn.text}
      </div>
    )}
  />
);

class SolicitudesPendientes extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalTitle: "",
      modalType: null,
      modalHeight: null,
      rutEmpresa: "",
      isValidRut: false,
      descSolicitud: null,
      isValidDesc: false,
      modalLastPage: false,
      modalAcceptCallback: null,
      modalDisableNext: false,
    };

    props.dispatch(doGetSolicitudes(props.UserInfo.RUT));
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.companyRutError == null && this.props.companyRutError === false) {
      this.handleFinalStep();
    }
    if (prevProps.companyRutError == null && this.props.companyRutError !== null && this.props.companyRutError.length > 0) {
      this.handleAddModal();
    }
  }

  handleCloseModal = () => {
    this.props.dispatch(setErrorCompanyRut(null));
    this.setState({
      showModal: false,
      modalHeight: null,
      rutEmpresa: "",
      descSolicitud: null,
      isValidDesc: false,
      modalDisableNext: false,
      modalAcceptCallback: null,
    });
  }

  handleChange = (e) => {
    const ident = (typeof e === "object") ? e.element.id : "";
    let {
      isValidDesc,
      isValidRut,
      rutEmpresa,
      descSolicitud,
    } = this.state;

    switch (ident) {
      case "rutEmpresa": {
        if (helper.validateRut(e.value)) {
          rutEmpresa = helper.formatRut(e.value, { showDots: true, showHyphen: true });
          isValidRut = true;
          e.component.option({
            validationError: { message: "" },
            isValid: isValidRut,
          });
        } else {
          rutEmpresa = e.value;
          isValidRut = false;
          console.log("false rut", isValidRut);
          e.component.option({
            validationError: { message: "Formato de rut invalido" },
            isValid: isValidRut,
          });
        }
        break;
      }
      case "descSolicitud": {
        descSolicitud = e.value;

        if (e.value.trim() == null || e.value.trim() === "") {
          isValidDesc = false;
        } else {
          isValidDesc = true;
        }

        break;
      }
      default:
        break;
    }

    this.setState({
      isValidRut, isValidDesc, rutEmpresa, descSolicitud, modalDisableNext: !(isValidRut && isValidDesc),
    });
  }

  handleAddModal = () => {
    this.setState({
      showModal: true,
      modalTitle: "Nueva solicitud",
      modalHeight: 330,
      modalType: null,
      modalDisableNext: true,
      modalLastPage: false,
      modalAcceptCallback: this.handleAddStep2,
    });
  }

  handleAddStep2 = () => {
    const rutEmpresa = helper.formatRut(this.state.rutEmpresa, { showDots: false, showHyphen: true });
    const userInfo = this.props.UserInfo;
    if (!userInfo.TempBD && this.props.listaEmpresas) {
      const alreadyInCompany = this.props.listaEmpresas.find((c) => c.RutEmpresa === rutEmpresa);
      if (alreadyInCompany) {
        this.props.dispatch(setErrorCompanyRut("Rut invalido, Ya es parte de la empresa"));
        return;
      }
    }
    const description = this.state.descSolicitud;
    this.props.dispatch(doSendNewSolicitud({ rutEmpresa, userInfo, description }));
  }

  handleFinalStep = () => {
    this.setState({
      showModal: true,
      modalTitle: "Solicitud enviada",
      modalLastPage: true,
      modalHeight: 230,
      modalAcceptCallback: this.handleCloseModal,
      modalType: null,
    });
  }

  handleDeleteModal = (data, rutEmpresa) => {
    const userRut = this.props.UserInfo.RUT;
    this.setState({
      rutEmpresa,
      showModal: true,
      modalTitle: "Eliminar solicitud",
      modalType: "del",
      modalLastPage: false,
      modalAcceptCallback: () => {
        this.props.dispatch(doDeleteSolicitud(userRut, data.ID, data.FromUser));
        this.handleCloseModal();
      },
    });
  }

  handleResendModal = (IdSolicitud, rutEmpresa) => {
    this.setState({
      showModal: true,
      rutEmpresa,
      modalLastPage: false,
      modalType: null,
      modalTitle: "Reenviar solicitud",
      modalAcceptCallback: () => {
        this.props.dispatch(doResendSolicitud(IdSolicitud));
        this.handleCloseModal();
      },
    });
  }

  render() {
    let body;

    switch (this.state.modalTitle) {
      case "Reenviar solicitud":
        body = (
          <div style={{ marginTop: 19 }}>
            {`¿Desea reenviar la solicitud al administrador de la empresa ${this.state.rutEmpresa}?`}
          </div>
        );
        break;

      case "Eliminar solicitud":
        body = (
          <div style={{ marginTop: 19 }}>
            {`¿Estás seguro que quieres eliminar la solicitud enviada a la empresa ${this.state.rutEmpresa}`}
          </div>
        );
        break;

      case "Solicitud enviada":
        body = (
          <div style={{ marginTop: 19 }}>
            {`Su solicitud a la empresa rut ${this.state.rutEmpresa} ha sido enviada. 
          Espera la confirmación para ser asignado como trabajador de esta empresa.`}
          </div>
        );
        break;

      case "Nueva solicitud":
        body = (
          <div className="row" style={{ padding: 0, justifyContent: "center" }}>
            {this.props.isLoading && <LoadingOverLay style={{ height: 225 }} />}
            <div className="col-8">
              <h3> <p className="text-left success">Rut Empresa</p></h3>
              <TextBox
                id="rutEmpresa"
                placeholder="Rut empresa"
                onValueChanged={this.handleChange}
                value={this.state.rutEmpresa}
                valueChangeEvent="focusout"
              />
              <h3 style={{ marginTop: 10 }}><p className="text-left">Descripción solicitud</p></h3>
              <TextArea
                id="descSolicitud"
                placeholder="Descripción"
                maxLength={200}
                height={100}
                value={this.state.descSolicitud}
                onValueChanged={this.handleChange}
                valueChangeEvent="focusout"
              />
            </div>
            <span
              style={{
                color: "red", fontSize: 13, paddingTop: 5, width: "100%",
              }}
            >
              {this.props.companyRutError}
            </span>
          </div>
        );
        break;

      default:
        body = <div></div>;
    }

    return (
      <div className="text-center content col-md-12 col-lg-12 col-xl-12 ">
        <Modal
          title={this.state.modalTitle}
          height={this.state.modalHeight}
          type={this.state.modalType}
          body={body}
          isLastPage={this.state.modalLastPage}
          open={this.state.showModal}
          handleSuccess={this.state.modalAcceptCallback}
          onClose={this.handleCloseModal}
          disableNext={this.state.modalDisableNext}
          showCancel
        />
        <div className="row">

          {this.props.UserInfo.TempBD && <UserInfo info={this.props.UserInfo} />}

          {this.props.solicitudes && this.props.solicitudes.length ? (
            <React.Fragment>
              <div
                style={{
                  width: "100%", display: "flex", justifyContent: "center", paddingTop: 20,
                }}
              >
                <div className="zero col-md-12 col-lg-12 col-xl-12" >
                  <div style={{ display: "grid" }}>
                    <h3 style={{ fontWeight: "bold", textAlign: "left", marginBottom: 10 }}>Solicitudes</h3>
                    {this.props.isLoading && <LoadingOverLay />}

                    <Button
                      text="Enviar nueva solicitud"
                      type="default"
                      style={{
                        padding: "0px 40px 0px 40px", position: "absolute", top: 0, right: 0,
                      }}
                      onClick={this.handleAddModal}
                    />
                  </div>

                  <DataGrid
                    showBorders={false}
                    showColumnLines={false}
                    showRowLines={false}
                    noDataText="Sin solicitudes"
                    rowAlternationEnabled
                    style={{ marginTop: 10 }}
                    loadPanel={{
                      enabled: false,
                    }}
                    paging={{ pageSize: 10 }}
                    pager={{
                      showPageSizeSelector: true,
                      allowedPageSizes: [5, 10, 20],
                      showInfo: true,
                    }}
                    dataSource={this.props.solicitudes}
                  >
                    <Column
                      dataField="CompanyRut"
                      caption="Rut empresa"
                    />
                    <Column
                      dataField="RequestDescription"
                      caption="Descripción"
                    />
                    <Column
                      dataField="RequestDate"
                      caption="Fecha solicitud"
                      dataType="date"
                    />
                    <Column
                      dataField="EndDate"
                      caption="Vencimiento solicitud"
                      dataType="date"
                    />
                    <Column
                      caption="Reenviar Solicitud"
                      cellComponent={(e) =>
                        (<ActionButton
                          text="Reenviar"
                          disabled={moment().diff(e.data.LastReminderDate, "days") === 0}
                          type="default"
                          style={{ ...actionButtonStyle, marginRight: 10, marginLeft: "25%" }}
                          onClick={() => this.handleResendModal(e.data.ID, e.data.CompanyRut)}
                        />)
                      }
                    />
                    <Column
                      caption="Eliminar"
                      cellComponent={(e) =>
                        (<ActionButton
                          text="Eliminar"
                          type="danger"
                          style={actionButtonStyle}
                          onClick={() => this.handleDeleteModal(e.data, e.data.CompanyRut)}
                        />)
                      }
                    />
                  </DataGrid>
                </div>
              </div>

              <span style={{ width: "100%", marginTop: 30 }}>
                Tu solicitud está a la espera de ser aprobada por la empresa. Si desea puede reenviar la solicitud o eliminarla.
              </span>
              <span style={{ width: "100%", marginBottom: 30 }}>
                Si trabajas en mas de una empresa adherida a la ACHS puede solicitar agregar una nueva solicitud.
              </span>
            </React.Fragment>
          )
            :
            (
                <div className="col-12 text-left list-with-button">
                  <div className="contenedor dx-form-group-with-caption dx-form-group dx-group-colcount-2">
                    <h4>Enviar solicitud a una empresa</h4>
                    <div className="col-12 zero">
                      <h5>
                      Puedes enviar una solicitud para administrar una empresa.
                      Luego de enviar la solicitud debes esperar a que la empresa acepte la solicitud
                      </h5>
                    </div>
                    <Button
                      className="list-button"
                      text="Enviar solicitud"
                      type="success"
                      onClick={this.handleAddModal}
                    />
                  </div>
                </div>
            )}

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.solicitudes.isLoading,
  UserInfo: state.global.userData,
  solicitudes: state.solicitudes.solicitudes,
  companyRutError: state.solicitudes.companyRutError,
  listaEmpresas: state.global.listaEmpresas,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SolicitudesPendientes);
