import React from "react";
import { connect } from "react-redux";
import { Popup, Button, TextBox } from "devextreme-react";
import ListaUsuarios from "./listaUsuarios";
import { doMultipleUserSubscription, doExternalWorkSuscription, doExternaMassiveSuscrition } from "../actions";
//
import Stepper from "react-stepper-horizontal";
import ListaNotificaciones from "./listaNotificaciones";

import LoadingOverlay from "../../../../../Shared/LoadingOverlay";
import validacion from "../../../../../../helpers/validaciones";

class ModalSuscribirTrabajadores extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {

      disableNext: true,
      selectedUsers: null,
      avaliableUsers: [],
      step: 0,
      selectedNotifications: null,
      fromOneValid: false,
      personalData: {
        Name: null,
        LastName: null,
        Mail: null,
        Cellphone: null,
        isValidRut: false,
        isValidMail: false,
      },
    };
  }

  componentDidUpdate = (prevProps) => {
    if (!prevProps.isOpen && this.props.isOpen) {
      const {
        usuarios,
        selectedNotification,
        typeUserRelationFilter,
      } = this.props;


      let suscribedUsers = [];
      let users = usuarios;

      if (selectedNotification && selectedNotification.Subscriptors) {
        suscribedUsers = selectedNotification.Subscriptors;
        if (typeUserRelationFilter === "INT") {
          users = usuarios.filter((e) => suscribedUsers.filter((sub) => sub.EmployeeRut === e.Rut).length === 0);
          this.setState({ avaliableUsers: users });
        }
        // if (typeUserRelationFilter === "EXT") {
        //   users = usuarios.filter((e) => suscribedUsers.filter((sub) => sub.Id === e.Id).length === 0);
        //   this.setState({ avaliableUsers: users });
        // }
      }
    }
  }

  handleClose = () => {
    this.props.onClose();
    this.setState({ disableNext: true, selectedUsers: [] });
  }

  handleUserSelect = (e) => {
    const selectedItems = e.selectedRowsData;
    this.setState({ selectedUsers: selectedItems, disableNext: !selectedItems.length });
  }

  handleSuscribir = () => {
    if (this.props.typeUserRelationFilter === "INT") {
      const Data = {
        NotificationGroupId: this.props.selectedNotification.NotificationGroupId,
        CompanyRut: this.props.companyId,
        BranchId: this.props.sucursalId,
        EmployeesRut: this.state.selectedUsers.map((e) => e.Rut),
      };
      this.props.dispatch(doMultipleUserSubscription(this.props.selectedNotification.NotificationGroupCode, Data, this.handleClose));
    }
    if (this.props.typeUserRelationFilter === "EXT") {
      const Data = {};

      Data.NotificationGroupId = this.props.selectedNotification.NotificationGroupId;
      Data.CompanyRut = this.props.companyId;
      Data.Cellphone = this.state.personalData.Cellphone;
      Data.Email = this.state.personalData.Mail;
      Data.LastName = this.state.personalData.LastName;
      Data.Name = this.state.personalData.Name;
      Data.BranchId = this.props.sucursalId;

      this.props.dispatch(doExternalWorkSuscription(Data, this.handleClose));
    }
  }
  handleSelectNotification = (e) => {
    const selectedItems = e.component.option("selectedItems");
    this.setState({ selectedNotifications: selectedItems, disableNext: !selectedItems.length });
  }
  handleChange = (e) => {
    const ident = (typeof e === "object") ? e.element.id : "";
    let errorTxt = "";
    const personalData = Object.assign({}, this.state.personalData);
    switch (ident) {
      case "Name": {
        let valid = true;
        if (e.value === "") {
          errorTxt = "Dato Requerido";
          valid = false;
        }
        e.component.option({
          validationError: { message: errorTxt },
          isValid: valid,
        });
        personalData.Name = e.value;


        break;
      }
      case "LastName": {
        let valid = true;
        if (e.value === "") {
          errorTxt = "Dato Requerido";
          valid = false;
        }
        e.component.option({
          validationError: { message: errorTxt },
          isValid: valid,
        });
        personalData.LastName = e.value;


        break;
      }
      case "Mail": {
        if (!validacion.validarEmail(e.value)) {
          errorTxt = "Formato correo electrónico inválido";
          personalData.isValidMail = false;
        } else {
          personalData.isValidMail = true;
        }
        e.component.option({
          validationError: { message: errorTxt },
          isValid: personalData.isValidMail,
        });
        personalData.Mail = e.value;

        break;
      }
      case "Cellphone": {
        let valid = true;
        if (e.value.length > 0) {
          if (!validacion.validateCellPhone(e.value)) {
            errorTxt = "Formato télefono invalido";
            valid = false;
          } else {
            valid = true;
          }
        }
        e.component.option({
          validationError: { message: errorTxt },
          isValid: valid,
        });
        personalData.Cellphone = e.value;
        break;
      }

      default:
        break;
    }


    this.setState({
      personalData,
      fromOneValid: !!((personalData.isValidMail && personalData.Name && personalData.LastName && personalData.Cellphone)),
    });
  }

  handleNextStep = () => {
    this.setState({ step: 1, disableNext: true });
  }
  handleClose = () => {
    this.setState({
      selectedNotifications: null,
      disableNext: true,
      step: 0,
      fromOneValid: false,
      personalData: {
        Rut: null,
        Name: null,
        LastName: null,
        Mail: null,
        Phone: null,
        isValidRut: false,
        isValidMail: false,
      },
    });
    this.props.onClose();
  }
  handleSuscribe = () => {
    const Data = {
      NotificationGroupIds: this.state.selectedNotifications.map((e) => e.NotificationGroupId),
      BranchId: this.props.sucursalId,
      CompanyRut: this.props.companyId,
      Name: this.state.personalData.Name,
      LastName: this.state.personalData.LastName,
      Email: this.state.personalData.Mail,
      Cellphone: this.state.personalData.Cellphone,
    };

    this.props.dispatch(doExternaMassiveSuscrition(Data, this.handleClose));
  }


  render() {
    const {
      isOpen,
    } = this.props;

    return (


      <Popup
        visible={isOpen}
        title={this.props.typeUserRelationFilter !== "EXT" ? "Suscribir trabajadores" : "Suscribir trabajador externo"}
        showTitle
        maxWidth={600}
        maxHeight={600}
        onHiding={this.handleClose}
        dragEnabled={false}
      >
        <div>
          {this.props.isLoading && <LoadingOverlay />}
          {
            this.props.typeUserRelationFilter === "INT" && (
              <React.Fragment>
                <ListaUsuarios
                  onSelect={this.handleUserSelect}
                  usuarios={this.state.avaliableUsers}
                  selected={this.state.selectedUsers}
                  typeUserRelationFilter={this.props.typeUserRelationFilter}
                  height={390}
                  hideDate
                />
                <div className="button-row">
                  <Button
                    onClick={this.handleClose}
                    style={{ marginRight: 20 }}
                    text="Cancelar"
                  />
                  <Button
                    onClick={this.handleSuscribir}
                    type="success"
                    style={{ marginLeft: 20 }}
                    disabled={this.state.disableNext}
                    text="Suscribir"
                  />
                </div>
              </React.Fragment>

            )
          }
          {
            this.props.typeUserRelationFilter === "EXT" && (
              <React.Fragment>
                {this.props.availableListUser === true && (
                  <React.Fragment>
                    <div className="row">

                      <div className="col-12">

                        <div className="field-newDenuncia">
                          <h3><p>Nombre </p></h3>
                          <TextBox
                            id="Name"
                            value={this.state.personalData.Name}
                            valueChangeEvent="focusout"
                            onValueChanged={this.handleChange}
                          />

                        </div>
                        <div className="field-newDenuncia">
                          <h3><p>Apellido</p></h3>
                          <TextBox
                            id="LastName"
                            value={this.state.personalData.LastName}
                            valueChangeEvent="focusout"
                            onValueChanged={this.handleChange}
                          />

                        </div>
                        <div className="field-newDenuncia">
                          <h3><p>Mail</p></h3>
                          <TextBox
                            id="Mail"
                            value={this.state.personalData.Mail}
                            onValueChanged={this.handleChange}
                            valueChangeEvent="focusout"
                          />


                        </div>
                        <div className="field-newDenuncia">
                          <h3><p>Teléfono</p></h3>
                          <TextBox
                            id="Cellphone"
                            mask="+56\900000000"
                            useMaskedValue
                            valueChangeEvent="change"
                            value={this.state.personalData.Cellphone}
                            onValueChanged={this.handleChange}
                          />

                        </div>


                      </div>
                    </div>
                    <div className="button-row">
                      <Button
                        onClick={this.handleClose}
                        style={{ marginRight: 20 }}
                        text="Cancelar"
                      />
                      <Button
                        onClick={this.handleSuscribir}
                        type="success"
                        style={{ marginLeft: 20 }}
                        disabled={!(this.state.fromOneValid)}
                        text="Suscribir"
                      />
                    </div>


                  </React.Fragment>
                )}
                {this.props.availableListUser === false && (
                  <React.Fragment>
                    <Stepper
                      className="stepper-registro"
                      activeStep={this.state.step}
                      circleTop={15}
                      activeColor="#00963a"
                      completeColor="#0C652F"
                      steps={[
                        { title: "Datos del trabajador" },
                        { title: "Seleccionar notificaciones" },
                      ]}
                    />
                    {this.state.step === 0 && (
                      <div className="row">

                        <div className="col-12">

                          <div className="field-newDenuncia">
                            <h3><p>Nombre </p></h3>
                            <TextBox
                              id="Name"
                              value={this.state.personalData.Name}
                              valueChangeEvent="focusout"
                              onValueChanged={this.handleChange}
                            />

                          </div>
                          <div className="field-newDenuncia">
                            <h3><p>Apellido</p></h3>
                            <TextBox
                              id="LastName"
                              value={this.state.personalData.LastName}
                              valueChangeEvent="focusout"
                              onValueChanged={this.handleChange}
                            />

                          </div>
                          <div className="field-newDenuncia">
                            <h3><p>Mail</p></h3>
                            <TextBox
                              id="Mail"
                              value={this.state.personalData.Mail}
                              onValueChanged={this.handleChange}
                              valueChangeEvent="focusout"
                            />


                          </div>
                          <div className="field-newDenuncia">
                            <h3><p>Teléfono</p></h3>
                            <TextBox
                              id="Cellphone"
                              mask="+56\900000000"
                              useMaskedValue
                              valueChangeEvent="change"
                              value={this.state.personalData.Cellphone}
                              onValueChanged={this.handleChange}
                            />

                          </div>


                        </div>
                      </div>
                    )}
                    {this.state.step === 1 && (
                      <React.Fragment>
                        <div className="modalSuscripcionWrapper">
                          <ListaNotificaciones
                            data={this.props.notificaciones}
                            selected={this.state.selectedNotifications}
                            onSelection={this.handleSelectNotification}
                            selectionMode="multiple"
                            showCheck
                            hideNumbers
                            hideDetails
                          />
                        </div>

                      </React.Fragment>
                    )}
                    <div className="button-row">
                      <Button
                        onClick={this.handleClose}
                        style={{ marginRight: 20 }}
                        text="Cancelar"
                      />
                      {this.state.step === 0 && (
                        <Button
                          onClick={this.handleNextStep}
                          type="success"
                          style={{ marginLeft: 20 }}
                          disabled={!(this.state.fromOneValid)}
                          text="Siguiente"
                        />
                      )}
                      {this.state.step === 1 && (
                        <Button
                          onClick={this.handleSuscribe}
                          type="success"
                          style={{ marginLeft: 20 }}
                          disabled={this.state.disableNext}
                          text="Suscribir trabajador"
                        />
                      )}
                    </div>

                  </React.Fragment>
                )}


              </React.Fragment>
            )
          }


        </div>
      </Popup>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.notificacionesEmpresa.isLoading,
  notificaciones: state.notificacionesEmpresa.notificaciones,
  usuarios: state.notificacionesEmpresa.usuarios,
  selectedNotification: state.notificacionesEmpresa.selectedNotification,
  companyId: state.global.companyId,
  sucursalId: state.global.sucursalId,
  typeUserRelationFilter: state.notificacionesEmpresa.typeUserRelationFilter,
  availableListUser: state.notificacionesEmpresa.availableListUser,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalSuscribirTrabajadores);
