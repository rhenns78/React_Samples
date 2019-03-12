import React from "react";


export default React.memo((props) =>
  // const Data = props.sources;
  (


    <div className="indicadoresCard">
      <div className="indicadoresCard-item">
        {/* esto se repite */}
        <div className="elemento-text">
          <span className="trabajo">Trabajo</span>
          <span className="value">15</span>
        </div>

        <div className="elemento-text border-div">
          <span className="trayecto">Trayecto</span>
          <span className="value">22</span>
        </div>

        <div className="elemento-text">
          <span className="enfermedad">Enfermedad</span>
          <span className="value">0</span>
        </div>

      </div>


    </div>


  ));
