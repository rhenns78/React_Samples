import React from "react";
import { connect } from "react-redux";
import { Button } from "devextreme-react";
import NavBar from "devextreme-react/ui/nav-bar";
import { push } from "connected-react-router";
import { logout } from "../Acceso/Login/actions";
import { resetGlobalState } from "../Global/actions";
import { resetMisDatosState } from "../SucursalVirtual/Trabajador/Perfil/MisDatos/actions";
import { askToken, changeTabIndex } from "./actions";

import { paths } from "../../config/routes";
import ModalAlert from "../Shared/modalAlert";
import InfoUsuario from "./infoUsuario";
import Notificaciones from "./Notificaciones/view";
import AppStack from "./appStack";
import apiConfig from "../../config/api";

import { doGetTokenJwt, doSetNotification } from "./Notificaciones/actions";

const signalR = require("@aspnet/signalr");


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      redirect: null,
      typeRedirect: null,
    };

    this.checkItem = this.checkItem.bind(this);
    props.dispatch(doGetTokenJwt(props.userData.Email));
    this.props.dispatch(doSetNotification(this.props.userData.RUT));
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.title === this.props.title && prevProps.userAccessIds &&
      prevProps.tabs && prevProps.tabs.length === 0 && this.props.tabs && this.props.tabs.length === 0) {
      this.props.dispatch(push(paths.root));
    }
    if (this.props.tokenJwt !== prevProps.tokenJwt) {
      // conectar a singlr
      const url = apiConfig.notificationHUB;

      // "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(`${url}notifications`, { accessTokenFactory: () => this.props.tokenJwt })
        .configureLogging(signalR.LogLevel.Information)
        .build();

      connection.start()
        .then(() => console.log("Connection started!"))
        .catch((err) => console.log("Error while establishing connection :(", err));

      connection.on("GlobalMessageReceived", () => {
        this.props.dispatch(doSetNotification(this.props.userData.RUT));
      });
      connection.on("DirectMessageToUserReceived", () => {
        this.props.dispatch(doSetNotification(this.props.userData.RUT));
      });
    }
  }

  ingresarClick = () => {
    this.props.dispatch(askToken(this.props.userData.Email));
  }

  ingresarPortalSap = () => {
    const href = `${apiConfig.sapUri}${this.props.userData.AccessToken}`;
    window.open(href, "_blank");
  }

  handleLogout = () => {
    if (this.props.preventNavigation) {
      this.setState({ openModal: true, redirect: null, typeRedirect: "logout" });
    } else {
      // reset states
      this.props.dispatch(resetMisDatosState());
      this.props.dispatch(resetGlobalState());
      this.props.dispatch(logout());
    }
  }
  goMyAccount = () => {
    // this.props.dispatch(openCloseAcountMenu(true));
    this.props.dispatch(push(paths.perfil));
  }

  IconosToolBar() {
    let AchsGestion;
    if (!this.props.userData.TempBD) {
      AchsGestion = {
        icon: "overflow",
        location: "after",
        onClick: this.ingresarClick,
        locateInMenu: "auto",
      };
    }
    const itemsIcons = [
      {
        icon: "search",
        onClick: "",
        location: "after",
        locateInMenu: "auto",
      },
      {
        location: "after",
        icon: "message",
        onClick: "",
        locateInMenu: "auto",
      },
      AchsGestion,

      {
        location: "after",
        icon: "remove",
        onClick: this.handleLogout,
        locateInMenu: "auto",
      },
    ];

    return itemsIcons;
  }


  checkItem = (e) => {
    if (e.itemIndex !== this.props.tabPosition) {
      // verificar mantener pantalla
      if (this.props.preventNavigation) {
        this.setState({ openModal: true, redirect: { contentId: e.itemData.contentId, itemIndex: e.itemIndex }, typeRedirect: "tabs" });
      } else {
        this.props.dispatch(changeTabIndex(e.itemData.contentId, e.itemIndex));
      }
    }
  }

  closeModal = () => {
    this.setState({
      openModal: false,
      redirect: null,
      typeRedirect: null,

    });
  }
  renderModalAlert() {
    return (
      <React.Fragment >
        <ModalAlert
          open={this.state.openModal}
          title="Alerta"
          message="¿Ha modificado la información de sus datos, desea guardarlos?"

          redirect={this.state.redirect}
          typeRedirect={this.state.typeRedirect}
          closeModalCall={this.closeModal}
        />
      </React.Fragment >
    );
  }
  render() {
    return (
      <div
        className="col-12 menu-animation-padding"
        style={{
          height: this.props.height,
          paddingLeft: this.props.menuWidth,
        }}
      >
        {this.renderModalAlert()}
        {this.props.userData.TempBD &&
          <React.Fragment>
            <h1>ACHS Virtual</h1>
            <Button
              text="Cerrar sesión"
              onClick={this.handleLogout}
              className="button-temporal"
            />
          </React.Fragment>
        }

        {!this.props.userData.TempBD &&
          <React.Fragment>
            <div className="row header">
              <div className="col-8 title">
                <h2>{this.props.title || ""} </h2>
              </div>
              <div className="text-right header-icons" >
                <Button
                  stylingMode="text"
                  type="normal"
                  className="buttonIconTopBar"
                >
                  <i className="achs-icon"> n </i>
                </Button>
                <Notificaciones />


                <AppStack
                  apps={[
                    { name: "ACHS Gestión", onClick: this.ingresarClick, icon: "g" },
                    { name: "Portal Empresa", onClick: this.ingresarPortalSap, icon: "K" },
                    { name: "LGF", icon: "I" },
                  ]}
                />

                <InfoUsuario
                  logoutCallback={this.handleLogout}
                  myAccountCallback={this.goMyAccount}
                  userData={this.props.userData}
                />

              </div>


            </div>

            <div className="row border-bottom-tabs">
              <div className="col-10 tab-seccion">
                {this.props.tabs &&
                  <NavBar
                    dataSource={this.props.tabs}
                    selectionMode="single"
                    onItemClick={this.checkItem}
                    className="header-tabs"
                    noDataText="Sin acceso"
                    selectedIndex={this.props.tabPosition}
                  />}
              </div>
            </div>
          </React.Fragment>
        }
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  tabs: state.header.tabs,
  // showHideGriphics: state.graficos.showHideGriphics,
  tokenJwt: state.headerNotificaciones.tokenJwt,
  notificactionHeaderList: state.headerNotificaciones.notificactionHeaderList,
  tabPosition: state.header.tabPosition,
  title: state.header.title,
  userData: state.global.userData,
  listaEmpresas: state.global.listaEmpresas,
  botomBorderColor: state.global.botomBorderColor,
  userAccessIds: state.global.userAccessIds,
  preventNavigation: state.global.preventNavigation,
  location: state.router.location,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

