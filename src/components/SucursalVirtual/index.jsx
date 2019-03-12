import React from "react";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import IdleTimer from "react-idle-timer";
import { Switch, Route } from "react-router-dom";
import ReactAI from "react-appinsights";
import routes from "../../config/routes";

import MenuLateral from "../MenuLateral/view";
import Header from "../Header/view";
import { logout, doRefreshToken } from "../Acceso/Login/actions";
import { getTokenPowerBi } from "./Graficos/actions";
import PdfTemplates from "../Pdf/pdfTemplates";
import { openCloseAcountMenu } from "../Header/actions";
import { setExpanded } from "../Global/actions";

const expandedMenuWidth = 290;
const collapsedMenuWidth = 70;
const menuBodySpace = 30;

const fourteenMinutes = 840000;
const fifteenMinutes = 900000;
const thirtySeconds = 30000;

class SucrursalVirtual extends React.Component {
  constructor(props) {
    super(props);

    this.timerRef = React.createRef();

    this.state = {
      expanded: localStorage.getItem("expandedMenu") === "true",
      allowExpand: true,
      menuWidth: localStorage.getItem("expandedMenu") === "true" ? expandedMenuWidth : collapsedMenuWidth,
      headerHeight: 109,
    };
    const groupId = "c4a892ec-8d1b-4247-b155-0bbb223555e6";
    const reportId = "ed6149b4-1519-47aa-8824-d6e406535ac4";
    props.dispatch(getTokenPowerBi(groupId, reportId));
  }

  componentDidMount = () => {
    this.updateMenu();
    window.addEventListener("resize", this.updateMenu);
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.isOpenAcountMenu !== this.props.isOpenAcountMenu) {
      if (this.props.isOpenAcountMenu === true) {
        this.expandMenu();
      } else {
        this.handleCollapseMenu();
      }
    }
  }


  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateMenu);
  }

  updateMenu = () => {
    const size = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    const minWidth = 1360;
    if (size <= minWidth && this.state.allowExpand) {
      this.setState({ allowExpand: false, expanded: false, menuWidth: collapsedMenuWidth });
      localStorage.setItem("expandedMenu", false);
      this.props.dispatch(setExpanded(false));
    } else if (size > minWidth && !this.state.allowExpand) {
      localStorage.setItem("expandedMenu", true);
      this.setState({ allowExpand: true });
      this.props.dispatch(setExpanded(true));
    }
  }

  expandMenu = () => {
    this.setState({ expanded: true, menuWidth: expandedMenuWidth });
    localStorage.setItem("expandedMenu", true);
  }

  handleCollapseMenu = () => {
    this.props.dispatch(openCloseAcountMenu(false));
    this.setState({ expanded: false, menuWidth: collapsedMenuWidth });
    localStorage.setItem("expandedMenu", false);
  }

  handleUserIdle = () => {
    this.props.dispatch(logout());
  }

  handleResetTimer = () => {
    this.timerRef.reset();
  }

  handleUserAction = () => {
    if (this.timerRef.getElapsedTime() > fourteenMinutes) {
      this.props.dispatch(doRefreshToken(
        this.props.global,
        this.props.global.RefreshToken,
        this.handleResetTimer,
      ));
    }
  }

  render() {
    return (
      <React.Fragment>
        <IdleTimer
          ref={(ref) => { this.timerRef = ref; }}
          onIdle={this.handleUserIdle}
          onAction={this.handleUserAction}
          throttle={thirtySeconds}
          timeout={fifteenMinutes}
        />
        <MenuLateral
          allowExpand={this.state.allowExpand}
          collapseMenu={this.handleCollapseMenu}
          expandMenu={this.expandMenu}
          isExpanded={this.state.expanded}
          width={this.state.menuWidth}
        />

        <Header height={this.state.headerHeight} menuWidth={this.state.menuWidth + menuBodySpace + 17} />
        <div id="content" className="content-display">
          <div
            id="mainContent"
            className="zero row menu-animation-margin"
            style={{
              zIndex: this.props.showHideForm ? 300 : 10,
              marginLeft: this.state.menuWidth + menuBodySpace,
            }}
          >
            <ConnectedRouter history={this.props.history}>
              <Switch>
                {routes.map((route) =>
                  <Route key={route.path} exact path={route.path} component={route.component} />)}
              </Switch>
            </ConnectedRouter>

            <PdfTemplates />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  path: state.main.path,
  data: state.login.data,
  global: state.global.userData,
  toast: state.global.toast,
  isOpenAcountMenu: state.header.isOpenAcountMenu,
  showHideForm: state.denuncias.showHideForm,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SucrursalVirtual); ReactAI.withTracking(SucrursalVirtual);

