import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { doFindCompanies, setSucursalId, setCompanyId } from "../Global/actions";

import Logo from "../../images/logoachs.png";
import { paths } from "../../config/routes";
import MenuItem from "./menuItem";
import { checkAccess } from "../../helpers/rolAccess";
import MainItem from "./mainItem";
import SelectEmpresas from "./selectEmpresas";
import mainMenu from "./menuStructure";
import SelectSucursales from "./selectSucursales";
import ModalAlert from "../Shared/modalAlert";
import { changeTabIndex } from "../Header/actions";
import { resetStateSolicitudes } from "../SucursalVirtual/Empresa/GestionUsuarios/AprobarSolicitudes/actions";
import { setTypeRelationFilter } from "../SucursalVirtual/Empresa/GestionUsuarios/Notificaciones/actions";

const activeColor = "#fff";
const color = "#007A33";

class MenuLateral extends React.PureComponent {
  constructor(props) {
    super(props);

    if (!props.listaEmpresas) props.dispatch(doFindCompanies(props.userData.RUT));

    this.node = React.createRef();

    this.state = {
      activeMenu: this.getCurrentActiveIndex(),
      isHovering: false,
      hoverIndex: this.getCurrentActiveIndex(),
      selectCompanyOpen: false,
      selectSucursalOpen: false,
      openModal: false,
      redirect: null,
      typeRedirect: null,
      isTouch: false,
    };
  }

  componentDidMount = () => {
    document.addEventListener("click", this.handleOutsideClick, false);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentPath !== prevProps.currentPath && this.props.currentPath === paths.root) {
      this.setState({
        activeMenu: 0,
        hoverIndex: 0,
        isHovering: false,
      });
    }

    if (this.props.listaEmpresas !== prevProps.listaEmpresas) {
      if (this.props.listaEmpresas.length > 0) {
        const companyId = this.props.listaEmpresas[0].RutEmpresa;
        const companyName = this.props.listaEmpresas[0].Nombre;
        if (companyId) {
          this.props.dispatch(setCompanyId(companyId, companyName, this.handleSucursalSelect));
        }
      }
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener("click", this.handleOutsideClick, false);
  }

  getCompany = (e, value) => {
    this.props.dispatch(resetStateSolicitudes());

    this.props.dispatch(setTypeRelationFilter("INT"));
    this.props.dispatch(push(paths.miEmpresa));
    this.props.dispatch(setCompanyId(value.RutEmpresa, value.Nombre, this.handleSucursalSelect));
    this.handleResetMenuIndex();
    this.props.dispatch(changeTabIndex(0, 0));
  }

  getSucursal = (e, value) => {
    this.props.dispatch(setSucursalId(value.IdSucursal, value.Direccion));
  }

  getCurrentActiveIndex = () => {
    let mainIndex = 0;
    mainMenu.forEach((menu, index) => {
      const subMenuActive = menu.subMenu.find((item) => item.route === this.props.currentPath);
      if (subMenuActive != null) {
        mainIndex = index;
      }
    });

    return mainIndex;
  }

  handleSucursalSelect = (open) => {
    if (this.state.selectSucursalOpen && open) {
      open = false;
    }
    this.setState({ selectSucursalOpen: open });
  }

  handleResetMenuIndex = () => {
    this.setState({
      activeMenu: this.getCurrentActiveIndex(),
      hoverIndex: this.getCurrentActiveIndex(),
      isHovering: false,
    });
  }

  goTo = (route) => {
    if (this.props.preventNavigation) {
      this.setState({ openModal: true, redirect: route, typeRedirect: "routes" });
    } else {
      this.props.dispatch(push(route));
    }
  }

  handleCompanySelect = (open) => {
    let isOpen = open;
    if (this.state.selectCompanyOpen && open) {
      isOpen = false;
    }
    this.setState({ selectCompanyOpen: isOpen });
  }

  handleHover = (index, isHover) => {
    if (!isHover && (this.state.selectCompanyOpen || this.state.selectSucursalOpen)) {
      this.setState({ isHovering: true, hoverIndex: this.state.hoverIndex });
      return;
    }
    this.setState({ isHovering: isHover, hoverIndex: index });
  }


  handleOutsideClick = (e) => {
    if (!(this.state.selectCompanyOpen || this.state.selectSucursalOpen)) {
      if (!this.node.contains(e.target)) {
        this.handleResetMenuIndex();
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

  renderSubMenuMyAccount = () => mainMenu.filter((x) => x.route === paths.perfil).subMenu.map((item) => (
    <MenuItem
      key={item.name}
      name={item.name}
      icon={item.icon}
      route={item.route}
      navigate={(route) => {
        this.goTo(route);
        this.setState({ isHovering: false, activeMenu: this.state.hoverIndex });
      }}
      selected={item.route === this.props.currentPath}
    />
  ));

  renderSubmenuItems = (index) => mainMenu[index] && mainMenu[index].subMenu.map((item) =>
    (checkAccess(item.accessId, this.props.userAccessIds) && <MenuItem
      key={item.name}
      name={item.name}
      icon={item.icon}
      route={item.route}
      navigate={(route) => {
        this.goTo(route);
        this.setState({ isHovering: false, activeMenu: this.state.hoverIndex });
      }}
      selected={item.route === this.props.currentPath}
    />))

  renderSpacer = () => (
    <div className="menu-spacer" style={{ backgroundColor: activeColor, flex: 1 }}>
      <div style={{ backgroundColor: color, height: "100%" }}></div>
    </div>
  );

  renderModalAlert() {
    return (
      <React.Fragment >
        <ModalAlert
          open={this.state.openModal}
          title="Alerta"
          message="¿Ha modificado la información de sus datos, desea guardarlos?"
          closeModalCall={this.closeModal}
          redirect={this.state.redirect}
          typeRedirect={this.state.typeRedirect}
        />
      </React.Fragment >
    );
  }

  render() {
    let {
      companyId,
      userAccessIds,
      isExpanded,
      width,
    } = this.props;

    const actualIndex = this.state.isHovering ? this.state.hoverIndex : this.state.activeMenu;
    if (!isExpanded && this.state.isHovering) {
      width = 290;
    }

    return (
      <div
        ref={(ref) => { this.node = ref; }}
        onClickCapture={this.handleOutsideClick}
        className="menu-animation-width"
        style={{
          width,
        }}
      >
        {this.renderModalAlert()}
        <div className="menu-area">

          <div className="main-menu">
            <img src={Logo} alt="logo" className="menu-logo" />
            {this.props.allowExpand && !this.props.isExpanded && !this.state.isHovering && (
              <div className="expand-button" onClick={this.props.expandMenu}>
                <i
                  className="achs-icon"
                  style={{
                    transform: "rotate(180deg)", marginTop: 11, fontSize: 30, color: "white",
                  }}
                >j
                </i>
              </div>
            )

            }
            {mainMenu.map((menu, index) =>
              ((checkAccess(menu.accessId, userAccessIds) && !menu.hidden) &&
                <React.Fragment key={menu.icon}>
                  {menu.stackBottom && this.renderSpacer()}
                  <MainItem
                    text={menu.name}
                    icon={menu.icon}
                    isTouch={this.state.isTouch}
                    isHovering={this.state.hoverIndex === index}
                    active={this.state.activeMenu === index}
                    onMouseEnter={() => this.handleHover(index, true)}
                    onClick={() => {
                      this.setState({ activeMenu: index, hoverIndex: index, isHovering: false });
                      this.goTo(menu.route);
                    }}
                    onTouch={() => {
                      this.setState((prevState) => ({
                        isTouch: true,
                        activeMenu: index,
                        hoverIndex: index,
                        isHovering: !(prevState.isHovering && prevState.activeMenu === index),
                      }));
                    }}
                  />
                </React.Fragment>
              ))}
          </div>

          {(
            // `submenu ${this.state.isHover ? '': 'hide' }`  className="submenu"  className={`submenu ${width > 70 ? "" : "hide"}`
            <div className={`submenu ${width > 70 ? "show-sub-menu" : ""}`} onMouseLeave={() => this.handleHover(actualIndex, false)}>
              <div className="submenu-name">
                {mainMenu[actualIndex] && mainMenu[actualIndex].name}
              </div>
              <SelectEmpresas
                show={mainMenu[actualIndex].showSelects}
                dataSource={this.props.listaEmpresas}
                value={companyId}
                handleChange={this.getCompany}
                isHovering={this.state.isHovering}
                open={this.state.selectCompanyOpen}
                handleOpenClose={this.handleCompanySelect}
                onMouseEnter={() => this.handleHover(actualIndex, true)}
              />
              <SelectSucursales
                show={mainMenu[actualIndex].showSelects}
                dataSource={this.props.companySucursales}
                value={this.props.sucursalId}
                handleChange={this.getSucursal}
                isHovering={this.state.isHovering}
                open={this.state.selectSucursalOpen}
                handleOpenClose={this.handleSucursalSelect}
                onMouseEnter={() => this.handleHover(actualIndex, true)}
              />
              <div style={mainMenu[actualIndex].showSelects ? { marginTop: 20, paddingTop: 20, borderTop: "1px solid white" } : {}}>

                {this.renderSubmenuItems(actualIndex)}
              </div>

            </div>

          )}

          {this.props.isExpanded && !this.props.isOpenAcountMenu && (
            <div className="collapse-button">
              <MainItem
                key="chevron_left"
                text="Colapsar"
                icon="j"
                onClick={() => {
                  this.props.collapseMenu();
                  this.setState({ isHovering: false });
                }}
              />
            </div>
          )}

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPath: state.router.location.pathname,
  userAccessIds: state.global.userAccessIds,
  companyId: state.global.companyId,
  sucursalId: state.global.sucursalId,
  userData: state.global.userData,
  listaEmpresas: state.global.listaEmpresas,
  companySucursales: state.global.companySucursales,
  preventNavigation: state.global.preventNavigation,
  isOpenAcountMenu: state.header.isOpenAcountMenu,

});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuLateral);
