import React from "react";
import { connect } from "react-redux";
import styles from "../../../../styles/stylesgenerales";
import { Button, CheckBox } from "devextreme-react";

import { setUserInfo, userRegisterStep } from "../actions";
import LoadingOverlay from "../../../Shared/LoadingOverlay";
import Iframe from "react-iframe";

class PersonalData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      checkBox: false,
    };

    this.setConditions = this.setConditions.bind(this);
    this.onStepTwo = this.onStepTwo.bind(this);
  }


  setConditions(e) {
    this.setState({
      checkBox: e.value,
    });
  }
  onStepTwo() {
    const UserInfo = this.props.UserInfo;
    UserInfo.acceptCondition = true;
    const steps = {
      stepOne: false,
      stepTwo: true,
      stepThree: false,
      stepFour: false,
      stepFive: false,
      stepSuccess: false,
    };
    this.props.dispatch(setUserInfo(UserInfo));
    this.props.dispatch(userRegisterStep(steps));
  }


  renderConditions() {
    const typeBtn = (this.state.checkBox) ? "success" : "success";


    return (
      <center>
        <div className="terminos row">
          { this.props.isLoading && <LoadingOverlay /> }

          <div className="componenteLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
            <h4>Para hacer el registro debe leer y aceptar los términos y condiciones al final del texto a continuación</h4>
          </div>
          <div 
            style={{
              height: "calc(100vh - 470px)",
              minHeight: 162,
              width: "100%",
            }}
          >

            <Iframe
              url="https://desasucursalvirtualachs.blob.core.windows.net/archivoshtml/T%C3%A9rminos%20y%20condiciones%20SV.htm"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
              allowFullScreen
              width="100%"
              height="100%"

            />


          </div>
          <div className="checkBoxTerminos col-xl-12">
            <CheckBox id="checkConditions" text="He leído y acepto los términos y condiciones" onValueChanged={this.setConditions} />
          </div>
          <div className="botonTerminos col-xs-12 col-sm-12 col-md-12 col-lg-12" >
            <Button text="Siguiente" style={styles.fullWidth} type={typeBtn} disabled={!(this.state.checkBox)} onClick={this.onStepTwo} />
          </div>
        </div>
      </center>
    );
  }

  render() {
    return (

      <div className="zero container-fluid">
        {this.renderConditions()}
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  UserInfo: state.userRegister.UserInfo,
  isLoading: state.global.isLoading,
  skipValidation: state.userRegister.skipValidation,
  fileUrl: state.userRegister.fileUrl,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalData);

