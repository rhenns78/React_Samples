import React from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import styles from "../../../styles/stylesgenerales";
import logo from "../../../images/logoachs.png";

import { paths } from "../../../config/routes";
import { userActivate, doCreatePass, passCreated } from "./actions";
import { logout } from "../Login/actions";
import LoadingOverlay from "../../Shared/LoadingOverlay";
import PasswordFields from "../../Shared/PasswordFields";
import { Button } from "devextreme-react";
// setMessageLogin
class ActivarCuenta extends React.Component {
  constructor(props) {
    super(props);
    /* eslint-disable-next-line */
    !props.match.params.token && props.dispatch(logout());
    /* eslint-disable-next-line */
    props.dispatch(userActivate(props.match.params.token));
  }

  redirect = () => {
    this.props.dispatch(push(paths.root));
    this.props.dispatch(logout());
    this.props.dispatch(passCreated(false));
  }

  handleCreatePass = (pass, passRepeat) => {
    this.props.dispatch(doCreatePass(this.props.match.params.token, pass, passRepeat));
  }

  render() {
    return (

      <div className="zero row" style={{ justifyContent: "center", overflowY: 'auto', maxHeight: '100%' }}>
        <div className="zero col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" >
          <div className="headerLogin col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center" >
            <img src={logo} alt="" style={styles.logoLogin} height="65px" />
          </div>
        </div>
        <div className="zero col-xs-12 col-sm-12 col-md-6 col-lg-5 col-xl-4" style={{ paddingTop: 70, textAlign: 'center' }} >
            <div className="acceso row zero" >
              {/* eslint-disable-next-line */}
              { this.props.isLoading && <LoadingOverlay /> }
              <div className="tituloLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                <h3 style={{color: 'green'}}>Cuenta activada</h3>
              </div>
             {this.props.passCreated ? 
              <React.Fragment>
                 <div className="tituloLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                    <p>Felicidades, ya puedes acceder a la ACHS Virtual con tu </p>
                    <p>rut o mail y tu rut o mail y tu contraseña.</p>
                  </div>
                  <div className='col-12' style={{marginTop: 40}}>
                    <Button style={styles.fullWidth} text="Ingresar" type="default" onClick={this.redirect} />
                  </div>
              </React.Fragment> 
              : <React.Fragment>
                  <div className="tituloLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                    <p>Tu cuenta ha sido activada.</p>
                    <h5>Para finalizar crea una contraseña para tu cuenta.</h5>
                  </div>
                  <div className='col-12'>
                    <PasswordFields callBack={this.handleCreatePass} />
                  </div>
                </React.Fragment>
              }
            </div>


        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.global.isLoading,
  passCreated: state.activeUser.passCreated,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivarCuenta);

