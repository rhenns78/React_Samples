import React from "react";
import { connect } from "react-redux";
import { Button, Tabs } from "devextreme-react";
import SelectTipo from "../../../../Shared/SelectTipo";
import UserNotificationList from "./userNotificationList";
import { setNotificationsAsReadByFilter, changeParameterNotification } from "./actions";
import LoadingOverlay from "../../../../Shared/LoadingOverlay";

class HistorialNoficaciones extends React.PureComponent {
  onTabsSelectionChanged = (args) => {
    if (args.name === "selectedItems") {
      const params = {
        ...this.props.parameters,
        pageIndex: 0,
        read: args.value[0].id,
      };
      this.props.dispatch(changeParameterNotification(params));
    }
  }
  handleMarkAsRead = () => {
    this.props.dispatch(setNotificationsAsReadByFilter(this.props.parameters, this.props.companies, this.props.filters));
  }
  handleFiltros = (selectedITem) => {
    const params = {
      ...this.props.parameters,
      pageIndex: 0,
      type: selectedITem.id,
      companyRut: selectedITem.rut,
    };
    this.props.dispatch(changeParameterNotification(params));
  }

  render() {
    return (
      <div className="historial-notificaciones-wrapper">
        {this.props.isLoading && <LoadingOverlay />}
        <div className="content">
          <div className="head-notifications-history">
            <SelectTipo
              selected={{ id: "all", icon: "error", name: "Todas las notificaciones" }}
              items={this.props.filters}
              onClick={this.handleFiltros}
            />
            <div className="filter-options-wrapper">
              <div className="options">
                <Tabs
                  className="filter-tabs-options"
                  scrollByContent={false}
                  showNavButtons={false}
                  keyExpr="text"
                  defaultSelectedItemKeys={["Todas"]}
                  items={this.props.tabs}
                  onOptionChanged={this.onTabsSelectionChanged}
                />
              </div>
              <Button
                onClick={this.handleMarkAsRead}
                text="Marcar todas como leídas"
                className="text"
              />
            </div>
          </div>
          <UserNotificationList />
          <div className="foot-notifications-history">

            {`${this.props.listaNotificaciones.length} de ${this.props.totalRows}`}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.historialNotificaciones.isLoading,
  userData: state.global.userData,
  totalRows: state.historialNotificaciones.totalRows,
  filters: state.historialNotificaciones.filters,
  companies: state.global.listaEmpresas,
  listaNotificaciones: state.historialNotificaciones.listaNotificaciones,
  parameters: state.historialNotificaciones.parameters,
  tabs: state.historialNotificaciones.tabs,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(HistorialNoficaciones);
