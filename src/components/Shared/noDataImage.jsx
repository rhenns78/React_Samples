import React from "react";
import Logo from "../../images/nodata.png";


const noDataImage = (props) => (

  <div className={`no-data-image ${props.config && props.config.addClass}`} >
    <img src={Logo} alt="No data" className="image-info" />
    <span className="text" title={props.message}>{props.message}</span>
  </div>
);

export default noDataImage;
