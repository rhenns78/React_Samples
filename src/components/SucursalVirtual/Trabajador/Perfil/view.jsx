import React from "react";
import { connect } from "react-redux";
import { loadTabs } from "../../../Header/actions";
// import SolicitudesPendientes from "./SolicitudesPendientes/view";
import MisDatos from "./MisDatos/view";
import CorreoPassword from "./CorreoPassword/view";
import Usuario from "./Resumen/view";
import { checkAccess, ids } from "../../../../helpers/rolAccess";
import { callListMyData } from "./MisDatos/actions";

// import HistorialNoficaciones from "./HistorialNotificaciones/view";
// import ConfiguracionNotificacion from "./ConfiguracionNotificaciones/view";
class Perfil extends React.PureComponent {
  constructor(props) {
    super(props);

    if (this.props.listaAfp.length === 0 || this.props.listaRegion.length === 0 || this.props.listaComuna.length === 0 || this.props.listaParentesco.length === 0) {
      const lista = {
        listaAfp: this.props.listaAfp.length === 0,
        listaRegion: this.props.listaRegion.length === 0,
        listaEstadoCivil: this.props.listaEstadoCivil.length === 0,
        listaBancos: this.props.listaBancos.length === 0,
        listaTipoJornada: this.props.listaTipoJornada.length === 0,
        listaRubros: this.props.listaRubro.length === 0,
        listaComuna: this.props.listaComuna.length === 0,
        listaParentesco: this.props.listaParentesco.length === 0,

      };
      this.props.dispatch(callListMyData(this.props.UserInfo.RUT, lista));
    }
  }

  componentDidUpdate = (prevProps) => {
    if ((prevProps.userAccessIds === null && Array.isArray(this.props.userAccessIds)) || this.props.currentHeader !== "Usuario") {
      this.loadTabs();
    }
  }

  loadTabs = () => {
    const tabs = [];
    if (checkAccess(ids.usuario, this.props.userAccessIds)) tabs.push({ text: "Usuario", contentId: 0 });
    if (checkAccess(ids.misDatos, this.props.userAccessIds)) tabs.push({ text: "Datos", contentId: 1 });
    if (checkAccess(ids.correoPassword, this.props.userAccessIds)) tabs.push({ text: "Correo y contraseña", contentId: 2 });

    this.props.dispatch(loadTabs("Usuario", tabs, tabs.length ? tabs[0].contentId : null));
  }

  renderBody = () => {
    switch (this.props.selectedTab) {
      case 0: {
        return (<Usuario />);
      }
      case 1: {
        return (<MisDatos />);
      }
      case 2: {
        return (<CorreoPassword />);
      }

      default:
        return <div />;
    }
  }
  render() {
    return (
      <div style={{ paddingBottom: 60 }}>
        {this.renderBody()}

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  UserInfo: state.global.userData,
  selectedTab: state.header.contentId,
  currentHeader: state.header.title,
  userAccessIds: state.global.userAccessIds,

  listaAfp: state.global.listaAfp,
  listaRegion: state.global.listaRegion,
  listaEstadoCivil: state.global.listaEstadoCivil,
  listaBancos: state.global.listaBancos,
  listaTipoJornada: state.global.listaTipoJornada,
  listaRubro: state.global.listaRubro,
  listaComuna: state.global.listaComuna,
  listaParentesco: state.global.listaParentesco,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
