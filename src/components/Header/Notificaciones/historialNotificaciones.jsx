import React from "react";
import { connect } from "react-redux";
import { Button, Popover, List } from "devextreme-react";
import dateFormatInbox from "../../../helpers/dateFormatInbox";
import { setPopOverStatus } from "./actions";
import NoDataInfo from "../../Shared/noDataImage";

class HistorialNotificacion extends React.PureComponent {
  showHidePopover = (open) => {
    this.props.dispatch(setPopOverStatus(open));
  }

  handleLogout = () => {
    this.showHidePopover(false);
    this.props.logoutCallback();
  }

  goMyAccount = () => {
    this.showHidePopover(false);
    this.props.myAccountCallback();
  }

  render() {
    return (
      <div>
        <Button
          id="btnNotificacion"
          stylingMode="text"
          onClick={() => this.showHidePopover(!this.props.openPopOver)}
          className="buttonIconTopBar"
          type="normal"
          component={() => (
            <React.Fragment>
              <i className="achs-icon"> o </i>
            </React.Fragment>
          )}
        />
        {this.props.totalUnread > 0 ? <span className="notification dx-badge dx-navbar-item-badge">{this.props.totalUnread}</span> : null}
        <Popover
          target="#btnNotificacion"
          position="bottom"
          className="app-notification-popup"
          visible={this.props.openPopOver}
          closeOnOutsideClick
          onHiding={() => this.showHidePopover(false)}
        >
          <div className="row zero header-notification-flex">
            <div className="titulo">
              <span> Nuevas notificaciones </span>
            </div>
            <div>
              <Button
                onClick={this.props.doAsReaderMassiveCallback}
                text="Marcar todas como leídas"
                className="text"
              />
            </div>
          </div>
          <div className="user-notification-container">
            {
              this.props.listaNotifcaciones.length > 0 && (
                <List
                  className="user-notification-list"
                  scrollByContent
                  selectedIndex={2}
                  noDataText="Sin notificaciones pendientes de lectura"
                  items={this.props.listaNotifcaciones}
                  itemComponent={(item) => (
                    <div className={`notification-list-item-wrapper ${item.ReadDate === null ? "unread" : ""}`}>
                      <div className="icon">
                        <div className="card-circle-notification">
                          <div className="card-text-circle">
                            {item.CompanyName ? "EMP" : "PER"}
                          </div>
                        </div>
                      </div>
                      <div className="text">
                        <span className="title">{item.CompanyName}</span>
                        <span className="text">{item.Subject !== null ? item.Subject : ""}</span>
                      </div>
                      <div className="time">{dateFormatInbox(item.CreationDate)}
                      </div>
                      <div className="button">
                        <Button
                          visible={item.ReadDate === null}
                          className="text"
                          key={item.id}
                          onClick={() => this.props.doAsReaderCallback(item.id)}
                        >
                        </Button>
                      </div>
                    </div>
                  )}
                />

              )

            }
            {
              this.props.listaNotifcaciones.length === 0 && (
                <NoDataInfo message="No hay nuevas notificaciones" />
              )
            }

          </div>
          <div className="foot-header-notifications">
            <Button
              onClick={this.props.handleGoToHistory}
              text="Ver todas las notificaciones"
              className="text"
            />

          </div>
        </Popover>


      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  openPopOver: state.headerNotificaciones.openPopOver,
  listaNotifcaciones: state.headerNotificaciones.notificactionHeaderList,
  totalUnread: state.headerNotificaciones.totalUnread,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(HistorialNotificacion);
