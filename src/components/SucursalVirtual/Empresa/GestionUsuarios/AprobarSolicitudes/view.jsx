import React from "react";
import { connect } from "react-redux";
import { Button, RadioGroup, TagBox } from "devextreme-react";

import DataGrid, {
  Column,
} from "devextreme-react/ui/data-grid";
import Modal from "../../../Trabajador/Solicitudes/SolicitudesPendientes/modal";
import LoadingOverlay from "../../../../Shared/LoadingOverlay";
import {
  doGetSolicitudes,
  doAcceptSolicitud,
  doRejectSolicitud,
} from "./actions";

import constants from "../../../../../helpers/constants";

const headerStyle = {
  padding: "10px 0px 10px 0px",
  width: "25%",
  fontSize: 13,
};

const actionButtonStyle = {
  padding: "0px 0px 4px 0px",
  width: "70%",
  height: 30,
  marginTop: 5,
};

const ActionButton = (props) => (
  <Button
    type={props.type}
    text={props.text}
    onClick={props.onClick}
    style={props.style}
    render={(btn) => (<div
      style={{
        padding: "7px 0px 0px 0px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",

      }}
    >{btn.text}
    </div>)}
  />
);

const item = [
  {
    title: "Trabajador interno",
    text: `El trabajador interno es una persona que es parte de la nómina de los 
      trabajadores de su empresa el cual es parte del pago de cotizaciones.`,
    value: 1,
  },
  {
    title: "Trabajador externo",
    text: `El trabajador externo es un trabajador que presta servicios de manera externa 
    a su empresa. No se encuentra en su nómina de trabajadores.`,
    value: 2,
  },
];

class AprobarSolicitudes extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      disableButton: false,
      step: 0,
      body: null,
      selectedItem: null,
      selectedType: undefined,
      selectedRol: undefined,
    };

    props.dispatch(doGetSolicitudes(this.props.companyId));
  }
  handleGestion = (item) => {
    const body = (<div className="zero row" style={{ padding: 0, justifyContent: "center" }}>
      <span>{`¿Es ${item.FirstName} ${item.LastName} un trabajador de su empresa?`}</span>
      <div className="col-12" style={{ marginTop: 10 }}>
        <div style={{ backgroundColor: "#DFDFDF", height: 40, display: "flex" }}>
          <div style={{ ...headerStyle }}>Nombre</div>
          <div style={headerStyle}>Rut</div>
          <div style={headerStyle}>Mail</div>
          <div style={headerStyle}>Teléfono</div>
        </div>
        <div style={{ display: "flex", backgroundColor: "#F2F2F2" }}>
          <div style={{ ...headerStyle, fontWeight: "bold" }}>{item.FirstName}</div>
          <div style={{ ...headerStyle, wordWrap: "break-word" }}>{item.RUT && item.RUT}</div>
          <div style={{ ...headerStyle, wordWrap: "break-word" }}>{item.Email && item.Email}</div>
          <div style={{ ...headerStyle, wordWrap: "break-word" }}>{item.CellPhoneNumber && item.CellPhoneNumber}</div>
        </div>
        <div style={{ backgroundColor: "#F2F2F2", padding: 10 }}>
          <div style={{ wordWrap: "break-word" }}>{item.RequestDescription}</div>
        </div>
      </div>
                  </div>);
    this.setState({
      modalOpen: true,
      body,
      selectedItem: item,
    });
  }

  handleCloseModal = () => {
    this.setState({ modalOpen: false });
    // timeout to let the close animation play
    setTimeout(() => {
      this.setState({
        modalOpen: false,
        body: null,
        disableButton: false,
        step: 0,
        selectedItem: null,
        selectedRol: undefined,
        selectedType: undefined,
      });
    }, 500);
  }

  handleRechazo = (isRechazo) => {
    if (isRechazo) {
      const user = this.state.selectedItem;
      this.props.dispatch(doRejectSolicitud({
        Rut: user.RUT,
        Id: user.IdRequest,
        Email: user.Email,
        FirstName: user.FirstName,
        LastName: user.LastName,
        CompanyRut: user.CompanyRut,
      }, user.FromUser));
      this.handleCloseModal();
    } else {
      this.handleCloseModal();
    }
  }

  handleChange = (event) => {
    this.setState({
      selectedType: event.value,
      disableButton: false,
    });
  }

  handleAccept = () => {
    const body = (<div className="row" style={{ padding: 0, justifyContent: "center" }}>
      <span>{`¿Qué tipo de trabajador es ${this.state.selectedItem.FirstName} ${this.state.selectedItem.LastName} en su empresa?`}</span>
      <div className="col-12" style={{ marginTop: 10 }}>
        <RadioGroup
          items={item}
          id="rut"
          itemRender={(item) =>
            (<div
              style={{
                textAlign: "center",
                marginBottom: 10,
                width: "100%",
                backgroundColor: "#F2F2F2",
                padding: "10px 10px 10px 0px",
              }}
            >
              <p>{item.title}</p>
              <span style={{ display: "flex", justifyContent: "center", padding: "0px 20px 0px 20px" }}>{item.text}</span>
            </div>)
          }
          style={{ textAlign: "start" }}
          onValueChanged={this.handleChange}
          displayExpr="text"
          valueExpr="value"
        />
      </div>
    </div>);

    this.setState({
      body,
      step: 1,
      disableButton: true,
    });
  }

  handleRolChange = (event) => {
    this.setState({
      selectedRol: event.component._selectedItems,
      disableButton: event.component._selectedItems.length === 0,
    });
  }

  handleAssignar = () => {
    let body;
    // Trabajador externo debe seleccionar el rol a asignar
    if (this.state.selectedType === 2) {
      body = (<div className="row" style={{ padding: 0, justifyContent: "center" }}>
        <span>{`¿Qué rol o roles desea asignarle al trabajador externo ${this.state.selectedItem.FirstName}  ${this.state.selectedItem.LastName} en su empresa?`}</span>
        <div className="col-12" style={{ marginTop: 10 }}>
          <p style={{ textAlign: "left" }}>Roles</p>
          <TagBox
            displayExpr="Name"
            valueExpr="Id"
            showDropDownButton
            activeStateEnabled
            onSelectionChanged={this.handleRolChange}
            hideSelectedItems
            multiline
            noDataText="No hay mas roles"
            placeholder="Seleccione un rol o roles para asignar"
            dataSource={this.props.roles}
            itemComponent={(props) => (<div style={{ display: "flex" }}>
              <span style={{ minWidth: 120, fontWeight: "bold" }}>{props.Name}</span>
              <div
                style={{
                  marginLeft: 10,
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  overflow: "auto",
                }}
              >{props.Description}
              </div>
                                       </div>)}
          />
        </div>
      </div>);

      this.setState({
        body,
        step: 2,
        disableButton: true,
      });
    } else {
      // trabajador interno se le asigna el rol dependiente

      const user = this.state.selectedItem;
      this.props.dispatch(doAcceptSolicitud({
        Id: user.IdRequest,
        Email: user.Email,
        Password: user.RUT,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Rut: user.RUT,
        IdRol: null,
        codeRol: constants.codeRolDependiente,
        Phone: user.CellPhoneNumber,
        CompanyRut: user.CompanyRut,
        RelationType: "INT",
      }));

      this.handleCloseModal();
    }
  }

  handleAssignarRol = () => {
    // TODO: use endpoint multiple roles
    const user = this.state.selectedItem;
    this.props.dispatch(doAcceptSolicitud({
      Id: user.IdRequest,
      Email: user.Email,
      Password: user.RUT,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Rut: user.RUT,
      IdRol: this.state.selectedRol,
      Phone: user.CellPhoneNumber,
      CompanyRut: user.CompanyRut,
      RelationType: "EXT",
    }));

    this.handleCloseModal();
  }

  renderModal = () => {
    const {
      step,
      modalOpen,
      body,
    } = this.state;

    let onClose;
    let onAccept;
    let title;
    let acceptText;
    let isLastPage;
    let showCancel;
    let height;

    switch (step) {
      case 0:
        onClose = this.handleRechazo;
        onAccept = this.handleAccept;
        title = "Alta trabajador";
        height = 300;
        acceptText = "Aceptar";
        isLastPage = false;
        showCancel = true;
        break;
      case 1:
        title = "Trabajador";
        onAccept = this.handleAssignar;
        onClose = this.handleCloseModal;
        height = 370;
        showCancel = true;
        isLastPage = true;
        acceptText = "Asignar";
        break;
      case 2:
        title = "Asignar rol al trabajador";
        onAccept = this.handleAssignarRol;
        onClose = this.handleCloseModal;
        height = 300;
        showCancel = true;
        isLastPage = true;
        acceptText = "Asignar";
        break;
      default:
        break;
    }


    return (<Modal
      title={title}
      disableNext={this.state.disableButton}
      isLastPage={isLastPage}
      handleSuccess={onAccept}
      showCancel={showCancel}
      type="gestion"
      cancelText="Rechazar"
      height={height}
      acceptText={acceptText}
      body={body}
      onClose={onClose}
      open={modalOpen}
    />);
  }


  render() {
    return (
      <div className="col-12 zero">
        {this.renderModal()}
        <div
          style={{
            width: "100%", display: "flex", justifyContent: "left", marginTop: 30,
          }}
        >
          <div style={{ position: "absolute", zIndex: 1, marginBottom: 20 }}>
            <h3 style={{ fontWeight: "bold" }}>Aprobar solicitudes</h3>
          </div>
          <div
            style={{
              width: "100%", display: "flex", justifyContent: "center", marginTop: 30,
            }}
          >
            <div className="col-12 zero" >
              {this.props.isLoading && <LoadingOverlay />}

              <DataGrid
                showBorders={false}
                noDataText="Sin solicitudes"
                showColumnLines={false}
                showRowLines={false}
                rowAlternationEnabled
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
                  dataField="FirstName"
                  calculateDisplayValue={(rowData) => `${rowData.FirstName} ${rowData.LastName}`}
                  caption="Nombre"
                />
                <Column
                  dataField="RUT"
                  caption="Rut"
                />
                <Column
                  dataField="Email"
                  caption="Mail"
                />
                <Column
                  dataField="CellPhoneNumber"
                  caption="Teléfono"
                  calculateDisplayValue={(props) => props.CellPhoneNumber || ""}
                />
                <Column
                  dataField="RequestDescription"
                  caption="Descripción"
                />
                <Column
                  caption="Fecha solicitud"
                  dataField="LastReminderDate"
                  dataType="date"
                />
                <Column
                  dataField="EndDate"
                  caption="Vencimiento solicitud"
                  dataType="date"
                />
                <Column
                  caption="Acciones"
                  cellComponent={(e) =>
                    (<ActionButton
                      text="Gestionar"
                      type="default"
                      style={{ ...actionButtonStyle, marginRight: 10, marginLeft: "25%" }}
                      onClick={() => this.handleGestion(e.data)}
                    />)
                  }
                />
              </DataGrid>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  companyId: state.global.companyId,
  solicitudes: state.aprobarSolicitudes.solicitudes,
  isLoading: state.aprobarSolicitudes.isLoading,
  roles: state.asignacionRoles.roles,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(AprobarSolicitudes);
