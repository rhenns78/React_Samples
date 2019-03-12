import React from "react";
import { connect } from "react-redux";

import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import { Toast } from "devextreme-react";
import { loginRoutes } from "../../config/routes";

import { validateToken } from "../Acceso/Login/actions";
import { openCloseToast } from "../Global/actions";
import SolicitudesPendientes from "../SucursalVirtual/Trabajador/Solicitudes/SolicitudesPendientes/view";
import Header from "../Header/view";
import SucursalVirtual from "../SucursalVirtual";

class Main extends React.Component {
  constructor(props) {
    super(props);

    if (props.currentPath.indexOf("activarCuenta") === -1) { props.dispatch(validateToken()); }
  }

  closeToast = () => {
    const toast = {};
    toast.isToastOpen = false;

    this.props.dispatch(openCloseToast(toast));
  }

  render() {
    const LoginRoutes = (
      <ConnectedRouter history={this.props.history}>
        <Switch>
          {loginRoutes.map((route) =>
            <Route key={route.path} exact path={route.path} component={route.component} />)}
        </Switch>
      </ConnectedRouter>
    );

    let body = <SucursalVirtual history={this.props.history} />;
    if (this.props.global.TempBD) {
      body = (
        <div style={{ overflowY: "auto", height: "100%" }}>
          <Header height={60} menuWidth={0} />
          <div className="row zero justify-content-center" style={{ marginTop: 10 }}>
            <div className="col-10">
              <SolicitudesPendientes />
            </div>
          </div>
        </div>
      );
    }

    return (
      // style={{ height: "100vh", backgroundColor: "#ffffff" }}
      <div className="zero container-fluid main-size">
        {this.props.global.LoginSuccess ? body : LoginRoutes}
        <Toast
          visible={!!this.props.toast.isToastOpen}
          message={this.props.toast.msgToast ? this.props.toast.msgToast : ""}
          type={this.props.toast.typeStyle}
          displayTime={4000}
          onOptionChanged={this.closeToast}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPath: state.router.location.pathname,
  data: state.login.data,
  global: state.global.userData,
  toast: state.global.toast,

});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

