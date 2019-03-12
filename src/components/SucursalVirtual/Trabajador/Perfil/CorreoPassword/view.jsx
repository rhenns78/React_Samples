import React from "react";
import { connect } from "react-redux";

import { getMyData } from "../MisDatos/actions";

import { Button } from "devextreme-react";
import Modal from "./modalChange";
import LoadingOverlay from "../../../../Shared/LoadingOverlay";

class MisDatos extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      messegeModal: null,
      title: null,
      renderForm: null,
    };

    !this.props.UserInfo.RUT && this.props.dispatch(getMyData(this.props.UserInfo.RUT));
  }
  closeModal = () => {
    this.setState({
      openModal: false,
      title: null,
      renderForm: null,

    });
  }
  handleUpdateEmail = () => {
    this.setState({
      openModal: true,
      title: "Cambio de Correo",
      renderForm: "changeEmail",
    });
  }

  handleOtherEmail = () => {
    this.setState({
      openModal: true,
      title: "Agregar correo Alternativo",
      renderForm: "alternativeEmail",
    });
  }

  handleChangePassword = () => {
    this.setState({
      openModal: true,
      title: "Cambio de contraseña",
      renderForm: "changePassword",
    });
  }
  render() {
    return (
      <div className="zero row">
        <Modal
          open={this.state.openModal}
          title={this.state.title}
          closeModalCall={this.closeModal}
          renderForm={this.state.renderForm}
        />
        <div className="col-12 list-with-button zero-left">
          {this.props.isLoading && <LoadingOverlay />}
          {this.props.profile.Rut != null ?
            <div className="contenedor dx-form-group-with-caption dx-form-group dx-group-colcount-2">
              <h4>Correo</h4>
              <div className="col-12 zero">
                <h5>
                  Tu correo actual es <strong>{this.props.profile.Email}</strong>, si lo deseas cambiar recuerda que también
                  va a cambiar tu credencial para iniciar sesión la próxima vez.
                </h5>
                <Button
                  className="list-button"
                  text="Cambiar Correo"
                  onClick={this.handleUpdateEmail}
                  type="success"
                />
              </div>
            </div>
            : null
          }
          {this.props.profile.Rut != null ?

            <div className="contenedor-dos dx-form-group-with-caption dx-form-group dx-group-colcount-2">
              <h4>Correo Alternativo</h4>
              <div className="col-12 zero">
                <h5>
                  Agregar un correo alternativo te permite recuperar tu cuenta a través de un medio alternativo,
                  como también recibir notificaciones en otra dirección.
                </h5>
                <Button
                  className="list-button"
                  text="Agregar Correo"
                  type="success"
                  onClick={this.handleOtherEmail}
                />
              </div>
            </div>
            :
            null
          }
          {this.props.profile.Rut != null ?

            <div className="contenedor-dos dx-form-group-with-caption dx-form-group dx-group-colcount-2">
              <h4>Contraseña</h4>
              <div className="col-12 zero">
                <h5>
                  Puedes cambiar tu contraseña de acceso a ACHS Virtual
                </h5>
                <Button
                  className="list-button"
                  text="Cambiar contraseña"
                  type="success"
                  onClick={this.handleChangePassword}
                />
              </div>
            </div>
            :
            null
          }
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({

  isLoading: state.misDatos.isLoading,
  UserInfo: state.global.userData,
  profile: state.misDatos.profile,
  preventNavigation: state.global.preventNavigation,
  listadoSucursales: state.global.listadoSucursales,

});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(MisDatos);
