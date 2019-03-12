import React from "react";
import { connect } from "react-redux";
import {
  Accordion, CheckBox, Button,
} from "devextreme-react";
import { setCompanyNotificaciones, setChangeChannelNotifications } from "./actions";
import LoadingOverlay from "../../../../Shared/LoadingOverlay";
import ListaNotifcacion from "./lista";


class MantenedorNotificaciones extends React.Component {
  OnChangedNotifications = (check, groupId) => {
    const NewGrupoNotification = this.props.listCompanyNotifications.filter((obj) => obj.NotificationGroupId !== groupId);
    this.props.listCompanyNotifications.filter((obj) => obj.NotificationGroupId === groupId).map((obj) => {
      obj.Notifications.forEach((element) => {
        element.Active = check.value;
        element.ValidChannels.Push = check.value;
        element.ValidChannels.Mail = check.value;
        element.ValidChannels.Sms = check.value;
      });
      NewGrupoNotification.push(obj);
      return NewGrupoNotification.sort((a, b) => a.NotificationGroupId - b.NotificationGroupId);
    });
    this.props.dispatch(setCompanyNotificaciones(NewGrupoNotification));
  }
  OnChangedChannels = (check, id, groupId) => {
    // console.log(check.value, id, "Group:>", groupId);
    const NewGrupoNotification = this.props.listCompanyNotifications.filter((obj) => obj.NotificationGroupId !== groupId);
    this.props.listCompanyNotifications.filter((obj) => obj.NotificationGroupId === groupId).map((obj) => {
      obj.Notifications.forEach((element) => {
        if (element.Active) {
          element.ChannelSelection[id] = check.value;
        }
        // if (element.ValidChannels.Push || element.ValidChannels.Mail || element.ValidChannels.Sms) {
        //   element.ChannelSelection[id] = check.value;
        // }
      });

      NewGrupoNotification.push(obj);
      return NewGrupoNotification.sort((a, b) => a.NotificationGroupId - b.NotificationGroupId);
    });


    this.props.dispatch(setCompanyNotificaciones(NewGrupoNotification));
  }
  OnDisabledChannels=(check, groupId) => {
    const NewGrupoNotification = this.props.listCompanyNotifications.filter((obj) => obj.NotificationGroupId !== groupId);
    this.props.listCompanyNotifications.filter((obj) => obj.NotificationGroupId === groupId).map((obj) => {
      obj.Notifications.forEach((element) => {
        if (element.NotificationId === parseInt(check.element.id, 10)) {
          element.ValidChannels.Push = check.value;
          element.ValidChannels.Mail = check.value;
          element.ValidChannels.Sms = check.value;
          element.Active = check.value;
        }
      });
      NewGrupoNotification.push(obj);
      return NewGrupoNotification.sort((a, b) => a.NotificationGroupId - b.NotificationGroupId);
    });
    this.props.dispatch(setCompanyNotificaciones(NewGrupoNotification));
  }
  OnChangedSingleChannel =(check, groupId, notificationId) => {
    const NewGrupoNotification = this.props.listCompanyNotifications.filter((obj) => obj.NotificationGroupId !== groupId);
    this.props.listCompanyNotifications.filter((obj) => obj.NotificationGroupId === groupId).map((obj) => {
      obj.Notifications.forEach((element) => {
        if (element.NotificationId === parseInt(notificationId, 10)) {
          element.ChannelSelection[check.element.id] = check.value;
        }
      });
      NewGrupoNotification.push(obj);

      return NewGrupoNotification.sort((a, b) => a.NotificationGroupId - b.NotificationGroupId);
    });

    this.props.dispatch(setCompanyNotificaciones(NewGrupoNotification));
  }

  doUpdateChannels = () => {
    const data = {};
    const CompanyNotificationList = [];
    const listChannels = this.props.listCompanyNotifications.map((n) => n.Notifications);
    listChannels.forEach((i) => {
      i.forEach((item) => {
        const items = {};
        items.NotificationId = item.NotificationId;
        items.Active = item.Active;
        items.ChannelSelection = item.ChannelSelection;
        items.ValidChannels = item.ValidChannels;
        CompanyNotificationList.push(items);
      });
    });
    data.CompanyNotificationList = CompanyNotificationList;
    // console.log("Result:>", data);
    this.props.dispatch(setChangeChannelNotifications(data));
  }
  renderCompanies() {
    const Notificaciones = this.props.listCompanyNotifications;
    return (
      <React.Fragment >

        <div className="headNotificaction-flex" >
          <div className="headNotificaction" >
            <span className="textHeaderMargin" > Web </span>
            <span className="textHeaderMargin" > Mail </span>
            <span className="textHeaderMargin" > Sms </span>

          </div>
        </div>
        <Accordion
          className="notificacion-mantenedor"
          collapsible
          itemTitleComponent={({ NotificationGroupId, NotificationGroupDescription, Notifications }) => {
            const NumNotifacionesActivas = Notifications.length > 0 ? Notifications.filter((obj) => obj.Active === true) : [];
            const allSelected = Notifications.length === NumNotifacionesActivas.length;

            const pushActivas = Notifications.filter((obj) => obj.ChannelSelection.Push === true).length;
            const pushTotales = Notifications.map((obj) => obj.ChannelSelection.Push).length;
            const allPushSelected = pushActivas === pushTotales;

            const mailActivas = Notifications.filter((obj) => obj.ChannelSelection.Mail === true).length;
            const mailTotales = Notifications.map((obj) => obj.ChannelSelection.Mail).length;
            const allMailSelected = mailActivas === mailTotales;

            const smsActivas = Notifications.filter((obj) => obj.ChannelSelection.Sms === true).length;
            const smsTotales = Notifications.map((obj) => obj.ChannelSelection.Sms).length;
            const allSmsSelected = smsActivas === smsTotales;


            return (
              <React.Fragment>
                <div className="headers-flex">
                  <div className="checkMain">
                    <CheckBox
                      id={NotificationGroupId}
                      onValueChanged={(check) => this.OnChangedNotifications(check, NotificationGroupId)}
                      defaultValue={allSelected || undefined}
                    />
                  </div>
                  <div className="header-description">
                    <span className="titleHeader">  <i className="material-icons">error_outline</i> {NotificationGroupDescription}</span>
                  </div>
                  <div className="checksChannels">
                    <CheckBox
                      id={`${NotificationGroupId}Push`}
                      onValueChanged={(check) => this.OnChangedChannels(check, "Push", NotificationGroupId)}
                      defaultValue={allPushSelected || undefined}
                      className="checkHeaderMargin"
                    />
                    <CheckBox
                      id={`${NotificationGroupId}Mail`}
                      onValueChanged={(check) => this.OnChangedChannels(check, "Mail", NotificationGroupId)}
                      defaultValue={allMailSelected || undefined}
                      className="checkHeaderMargin"
                    />
                    <CheckBox
                      id={`${NotificationGroupId}Sms`}
                      onValueChanged={(check) => this.OnChangedChannels(check, "Sms", NotificationGroupId)}
                      defaultValue={allSmsSelected || undefined}
                      className="checkHeaderMargin"
                    />
                  </div>
                </div>
              </React.Fragment>
            );
          }}
          itemComponent={(props) => (
            <React.Fragment>
              <ListaNotifcacion data={props} OnDisabledChannels={this.OnDisabledChannels} OnChangedSingleChannel={this.OnChangedSingleChannel} />
            </React.Fragment>
          )}
          dataSource={Notificaciones}
        />
        <Button
          text="Guardar Cambios"
          type="success"
          onClick={this.doUpdateChannels}
        />
      </React.Fragment>
    );
  }
  renderWorker() {
    return (
      <React.Fragment >

        <div style={{ position: "absolute", zIndex: 1, marginBottom: 20 }}>
          <h3 style={{ fontWeight: "bold" }}>Notificaciones Trabajador</h3>
        </div>


      </React.Fragment>
    );
  }
  render() {
    return (
      <div className="col-12 zero">
        {this.props.isLoading && <LoadingOverlay />}
        {this.props.type === "empresa" && this.renderCompanies()}
        {this.props.type === "trabajador" && this.renderWorker()}
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  listCompanyNotifications: state.mantenedorNotificaciones.listCompanyNotifications,
  isLoading: state.mantenedorNotificaciones.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(MantenedorNotificaciones);
