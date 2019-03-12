import React from 'react';
import LoadingImg from '../../images/animacion2[18].gif';

const LoadingOverlay = (props) => 
            <div className="overlay" style={props.style}
                tabIndex={-1} role="dialog" aria-labelledby="loadingPagesTitle" data-backdrop="static">
              <div className="overlay-content">
                <img draggable={false} src={LoadingImg} alt="Cargando" />
              </div>
            </div>

export default LoadingOverlay