import React from "react";
import { Popup, Button } from "devextreme-react";

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
    };
  }
  render() {
    const {
      open,
      onClose,
      title,
      height,
      width,
      body,
      handleSuccess,
      disableNext,
      isLastPage,
      type,
      showCancel,
      acceptText,
      showTitle,
      cancelText,
    } = this.props;

    let cancelButtonStyle = {
      paddingLeft: 25,
      paddingRight: 25,
      backgroundColor: "grey",
      color: "white",
    };

    let buttonStyle = {
      paddingLeft: 25,
      paddingRight: 25,
    };

    let titleStyle = {
      width: "100%",
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      color: "#007A33",
    };

    const bodyStyle = {
      width: "100%",
      textAlign: "center",
      fontSize: 15,
      padding: 0,
      paddingTop: 5,
      paddingBottom: 5,
    };

    let buttonType = "default";
    let cancelType = "normal";
    if (type === "del") {
      titleStyle = { ...titleStyle, color: "red" };
      buttonStyle = { ...buttonStyle, color: "white" };
      buttonType = "danger";
    } else if (type === "gestion") {
      cancelButtonStyle = { ...cancelButtonStyle, backgroundColor: "" };
      cancelType = "danger";
    }
    return (
      <Popup
        visible={open}
        maxHeight={height || "200px"}
        onHiding={onClose}
        maxWidth={width || "600px"}
        showTitle={showTitle}
        contentRender={() =>
          (<div className="row" style={{ margin: 0, padding: 0 }}>
            {showCancel &&
              <div
                role="button"
                style={{
                  position: "absolute", top: 0, right: 0, borderStyle: "none",
                }}
                onClick={() => onClose(false)}
                className="dx-closebutton dx-button dx-button-normal dx-widget dx-button-has-icon"
              >
                <div className="dx-button-content">
                  <i className="dx-icon dx-icon-close" onClick={() => onClose(false)}></i>
                </div>
              </div>
            }
            <div className="col-12" style={{ justifyContent: "center" }}>
              {<div className="row" style={{ paddingBottom: 10 }}>
                <span style={titleStyle} >
                  {title}
                </span>
              </div>}
              <div className="row" style={{ margin: 0, padding: 0 }}>
                <div className="col-12" style={bodyStyle}>
                  {body}
                </div>
              </div>
              <div className="row">
                <div
                  className="col-12"
                  style={{
                    width: "92%", textAlign: "center", position: "fixed", bottom: 5,
                  }}
                >
                  {isLastPage ?
                    <Button
                      disabled={disableNext}
                      text={acceptText || "Finalizar"}
                      type="default"
                      onClick={handleSuccess}
                      style={buttonStyle}
                    />
                    :
                    <React.Fragment>
                      <Button
                        disabled={disableNext && title !== "Nueva solicitud"}
                        text={cancelText || "Cancelar"}
                        type={cancelType}
                        onClick={() => onClose(true)}
                        style={{ ...cancelButtonStyle, marginRight: 20 }}
                      />
                      <Button
                        disabled={disableNext}
                        text={acceptText || (type === "del" ? "Eliminar" : "Enviar")}
                        type={buttonType}
                        style={buttonStyle}
                        onClick={handleSuccess}
                      />
                    </React.Fragment>}
                </div>
              </div>
            </div>

          </div>)
        }
      />
    );
  }
}

export default Modal;
