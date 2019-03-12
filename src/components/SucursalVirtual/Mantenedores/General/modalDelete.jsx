import React from "react";
import { Button, Popup } from "devextreme-react";

const cancelButtonStyle = {
  paddingLeft: 30,
  paddingRight: 30,
};

const buttonStyle = {
  paddingLeft: 30,
  paddingRight: 30,
};

class ModalEliminar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
    };
  }

  handleCancel = () => {
    this.props.cancelCallback();
    this.setState({ step: 0 });
  }

  handleDeleteNextstep = () => {
    if (this.state.step === 0) {
      this.setState({ step: 1 });
    } else {
      this.props.deleteCallback();
    }
  }

  render() {
    const {
      // deleteCallback,
      // cancelCallback
      open,
      title,
      step1Main,
      step1Sub,
      step2Main,
      step2Sub,
      step2ConfirmationText,
    } = this.props;

    const {
      step,
    } = this.state;

    let sub; let main; let confirmationText;

    if (step === 0) {
      sub = step1Sub;
      main = step1Main;
      confirmationText = "Eliminar";
    } else if (step === 1) {
      sub = step2Sub;
      main = step2Main;
      confirmationText = step2ConfirmationText;
    }


    return (
      <Popup
        visible={open}
        dragEnabled={false}
        maxHeight="200px"
        onHiding={this.handleCancel}
        maxWidth="500px"
        title={title}
        showTitle
        contentRender={() => (<div>
          <div className="col-12" style={{ justifyContent: "center" }}>
            <div style={{ width: "100%", textAlign: "center" }}>
              {main}
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "red", width: "100%" }}>
                {sub}
              </p>
            </div>

            <div
              style={{
                position: "fixed", bottom: 10, width: "87%", textAlign: "center",
              }}
            >
              <Button
                text="Cancelar"
                type="normal"
                onClick={this.handleCancel}
                style={{ ...cancelButtonStyle, marginRight: 15 }}
              />
              <Button
                text={confirmationText}
                type="danger"
                style={buttonStyle}
                onClick={this.handleDeleteNextstep}
              />
            </div>
          </div>
        </div>)}
      />
    );
  }
}

export default ModalEliminar;
