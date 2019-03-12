import React from "react";
import { CheckBox } from "devextreme-react";

export default React.memo((props) => {
  let subNumbers = 0;
  if (props.Subscriptors && props.Subscriptors.length) {
    subNumbers = props.Subscriptors.length;
  }
  return (
    <div className="notification-empresa-item">
      {props.showCheck &&
        <CheckBox readOnly defaultValue={props.selected} style={{ marginRight: 20 }} />
      }
      <i className="achs-icon">{props.icon || "o"}</i>
      <div className="notification-text">
        <span className="name">{props.NotificationGroupCode}</span>
        <span className="details">{props.NotificationGroupDesc}</span>
      </div>
      {!props.hideNumbers && <span className="notification-subs"><span>{subNumbers}</span> {`${subNumbers === 1 ? "suscripción" : "suscripciones"}`}</span>}
      {!props.hideDetails && <i className="achs-icon icon">j</i>}
    </div>
  );
});
