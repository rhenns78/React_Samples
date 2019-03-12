import React from "react";
import { connect } from "react-redux";
import { Button, Popup } from "devextreme-react";
import { setPreventNavigation } from "../Global/actions";
import { updateMyData } from "../SucursalVirtual/Trabajador/Perfil/MisDatos/actions";
import { changeTabIndex } from "../Header/actions";
import { push } from "connected-react-router";
import { logout } from "../Acceso/Login/actions";

const cancelButtonStyle = {
  paddingLeft: 30,
  paddingRight: 30,
};

const buttonStyle = {
  paddingLeft: 30,
  paddingRight: 30,
};

class ModalAlert extends React.PureComponent {
  handleCerrar = () => {
    this.props.dispatch(setPreventNavigation(false));

    switch (this.props.typeRedirect) {
      case "routes": {
        this.props.dispatch(push(this.props.redirect));
        break;
      }
      case "tabs": {
        this.props.dispatch(changeTabIndex(this.props.redirect.contentId, this.props.redirect.itemIndex));
        break;
      }
      case "logout": {
        this.props.dispatch(logout());
        break;
      }
      default:
        break;
    }

    this.props.closeModalCall();
  }
  handleMantener = async () => {
    // guardar la data
    await this.props.dispatch(updateMyData(this.props.profile, this.props.mailChanged, this.props.NewEmail));
    this.props.dispatch(setPreventNavigation(false));

    switch (this.props.typeRedirect) {
      case "routes": {
        this.props.dispatch(push(this.props.redirect));
        break;
      }
      case "tabs": {
        this.props.dispatch(changeTabIndex(this.props.redirect.contentId, this.props.redirect.itemIndex));
        break;
      }
      case "logout": {
        this.props.dispatch(logout());
        break;
      }
      default:
        break;
    }


    this.props.closeModalCall();
  }


  render() {
    const {
      open,
      title,
      message,
      //   redirect,
      //   tabs,

    } = this.props;


    return (
      <Popup
        showCloseButton={false}
        visible={open}
        dragEnabled={false}
        maxHeight="200px"
        onHiding={this.handleCerrar}
        maxWidth="500px"
        title={title}
        showTitle
        contentRender={() => (<div>
          <div className="col-12" style={{ justifyContent: "center" }}>
            <div style={{ width: "100%", textAlign: "center" }}>
              <strong> {message } </strong>
            </div>
          </div>

          <div
            style={{
              position: "fixed", bottom: 10, width: "87%", textAlign: "center",
            }}
          >
            <Button
              text="No"
              type="normal"
              onClick={this.handleCerrar}
              style={{ ...cancelButtonStyle, marginRight: 15 }}
            />

            <Button
              text="Si"
              type="success"
              style={buttonStyle}
              onClick={this.handleMantener}

            />
          </div>
        </div>)}
      />
    );
  }
}


const mapStateToProps = (state) => ({
  UserInfo: state.global.userData,
  profile: state.misDatos.profile,
  mailChanged: state.misDatos.mailChanged,
  NewEmail: state.misDatos.NewEmail,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalAlert);
