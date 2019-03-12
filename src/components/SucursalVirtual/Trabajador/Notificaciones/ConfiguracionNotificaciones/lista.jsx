import React from "react";
import { CheckBox, List } from "devextreme-react";

export default React.memo((props) => (
  <List
    className="notificacion-mantenedor-list-item"
    items={props.data.Notifications}
    itemComponent={(item) => (

      <React.Fragment>

        <div className="notification-list-item-flex">
          <div className="notification-check">
            <CheckBox
              id={item.NotificationId}
              onValueChanged={(check) => props.OnDisabledChannels(check, props.data.NotificationGroupId)}
              defaultValue={item.Active}
            />

          </div>
          <div className="notification-text">

            <span className="name">
              {item.NotificationDescription}
            </span>
          </div>
          <div className="notificaction-checks">
            {/* <CheckBox
              id="Push"
              className="checkMargin"
              disabled={item.Active === false}
              defaultValue={item.ChannelSelection.Push}
              onValueChanged={(check) => props.OnChangedSingleChannel(check, props.data.NotificationGroupId, item.NotificationId)}
            /> */}
            <CheckBox
              id="Mail"
              className="checkMargin"
              disabled={item.Active === false}
              defaultValue={item.ChannelSelection.Mail}
              onValueChanged={(check) => props.OnChangedSingleChannel(check, props.data.NotificationGroupId, item.NotificationId)}
            />
            <CheckBox
              id="Sms"
              className="checkMargin"
              disabled={item.Active === false}
              defaultValue={item.ChannelSelection.Sms}
              onValueChanged={(check) => props.OnChangedSingleChannel(check, props.data.NotificationGroupId, item.NotificationId)}
            />
          </div>
        </div>
      </React.Fragment>
    )}
  />

));
