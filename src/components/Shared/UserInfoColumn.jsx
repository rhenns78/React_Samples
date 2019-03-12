import React from "react";

const UserInfoColumn = React.memo((props) => (
  <div className="group-Column">
    <span className="text bold-text" title={props.nombre}>{`${props.nombre}`.toLowerCase()}</span>
    <span className="text" title={props.rut}>{props.rut}</span>
  </div>
));

export default UserInfoColumn;
