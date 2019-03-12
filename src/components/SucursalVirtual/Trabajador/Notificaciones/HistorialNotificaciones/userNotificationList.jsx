import React from "react";
import { connect } from "react-redux";
import { List } from "devextreme-react";
import DataSource from "devextreme/data/data_source";
import dateFormatInbox from "../../../../../helpers/dateFormatInbox";
import { setNotificationAsReadById, buildFilterNotification, buildQueryStringNotifications, changeParameterNotification, setListaNotificacionesAndFilters, setListaNotificaciones, loading, resetHistory } from "./actions";
import { getHistoricNotificationsInbox } from "../../../../../services/NotificacionesApi";


class UserNotificationList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.listRef = React.createRef();

    this.dataSource = new DataSource({
      paginate: true,
      load: async () => {
        this.props.dispatch(loading(true));
        try {
          let notifications = [];
          let { totalCount } = this.props;
          const params = {
            ...this.props.parameters,
            pageIndex: this.props.parameters.pageIndex,
            pageSize: 20,
          };
          console.log("parameterss", params);
          const newFilters = buildFilterNotification(this.props.companies, this.props.filters);
          const url = buildQueryStringNotifications(params);
          const historial = await getHistoricNotificationsInbox(url);
          const result = await historial.json();
          if (result.Success) {
            notifications = result.Notifications;
            totalCount = result.TotalRows;
            this.props.dispatch(changeParameterNotification({ ...params, pageIndex: params.pageIndex + 1 }));
            this.props.dispatch(setListaNotificacionesAndFilters(this.props.listaNotificaciones.concat(result.Notifications), totalCount, newFilters));
          }
          this.props.dispatch(loading(false));

          return {
            totalCount,
            data: notifications,
          };
        } catch (e) {
          console.error(e);
          this.props.dispatch(loading(false));
          return {
            totalCount: 0,
            data: [],
          };
        }
      },
    });
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.parameters.type !== this.props.parameters.type || prevProps.parameters.read !== this.props.parameters.read) {
      this.props.dispatch(setListaNotificaciones([]));
      this.listRef.reload();
    }
  }

  componentWillUnmount = () => {
    this.props.dispatch(resetHistory());
  }

  handleClick = (args) => {
    this.props.dispatch(setNotificationAsReadById(args.itemData.id));

    // Acá hay que realizar la navegación a la sección correspondiente.
  }
  render() {
    return (
      <div className="notification-list-container">
        <List
          className="user-notification-list"
          onItemClick={this.handleClick}
          selectedIndex={2}
          pageLoadMode="scrollBottom"
          indicateLoading={false}
          ref={(ref) => { if (ref !== null) this.listRef = ref.instance; }}
          noDataText="Sin resultados"
          dataSource={this.dataSource}
          itemComponent={(props) => (
            <div className={`notification-list-item-wrapper ${!props.ReadDate ? "unread" : ""}`} >
              <div className="icon">
                <div className="circle-type-notification">
                  <div className="circle-text-notification">
                    {props.CompanyName ? "EMP" : "PER"}
                  </div>
                </div>
              </div>
              <div className="text">
                <span className="title">{props.Subject}</span>
                <span className="text">{props.Content}</span>
              </div>
              <div className="time">{dateFormatInbox(props.CreationDate)}</div>
            </div>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  totalRows: state.historialNotificaciones.totalRows,
  listaNotificaciones: state.historialNotificaciones.listaNotificaciones,
  parameters: state.historialNotificaciones.parameters,
  filters: state.historialNotificaciones.filters,
  companies: state.global.listaEmpresas,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserNotificationList);
