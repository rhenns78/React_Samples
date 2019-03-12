import React from "react";

const EmptyIcon = React.memo((props) =>
  (<div
    className={`siniestro-empresa-reposo ${props.full ? "active" : ""}`}
    style={{
      height: props.size,
      width: props.size,
      borderRadius: "50%",
    }}
  />));


const SiniestroInfoColumn = React.memo((props) => (
  <div className="group-Column">
    <div className="dotIcon">  <EmptyIcon size={10} full={props.active} />
      <div className="text space-text"> {props.title || "S/D"} </div>
    </div>
    <div className="text space-text"> {props.subtitle || "S/D"} </div>
  </div>
));

// const SiniestroInfoColumn = React.memo((props) => (
//   <div style={{ display: "grid", justifyContent: "center" }}>
//     <div style={{ display: "flex" }}>
//       <EmptyIcon size={10} full={props.active} />
//       <span style={{ marginLeft: 5 }} title={props.title}>{props.title || "S/D"}</span>
//     </div>
//     <span title={props.subtitle}>{props.subtitle || "S/D"}</span>
//   </div>
// ));

export default SiniestroInfoColumn;
