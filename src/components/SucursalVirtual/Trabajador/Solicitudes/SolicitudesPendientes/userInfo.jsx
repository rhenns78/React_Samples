import React from "react";

const userInfoStyle = {
  minHeight: 100,
  backgroundColor: "#F2F2F2",
  marginTop: "10vh",
  marginBottom: "5vh",
  padding: 20,
};

class UserInfo extends React.PureComponent {
  render() {
    const {
      FirstName,
      LastName,
      RUT,
      Email,
      CellPhoneNumber,
    } = this.props.info;
    return (
      <div className="col-md-10 col-lg-9 col-xl-8" style={userInfoStyle}>
        <div className="row" style={{ paddingBottom: 10, alignItems: "center" }}>
          <div className="col-md-1" style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                backgroundColor: "#CCCCCC",
                borderRadius: "50%",
                minHeight: 60,
                minWidth: 60,
              }}
            >
            </div>
          </div>
          <div className="col-md-5" style={{ textAlign: "left" }}>
            <div className="row" style={{ padding: 0 }}>
              <div className="col-3" style={{ color: "black" }}>Nombre</div>
              <div className="col-9" style={{ color: "black" }}>{`${FirstName || ""} ${LastName || ""}`}</div>
            </div>
            <div className="row" style={{ padding: 0 }}>
              <div className="col-3" style={{ color: "black" }}>Rut</div>
              <div className="col-9" style={{ color: "black" }}>{RUT}</div>
            </div>
          </div>
          <div className="col-md-5" style={{ textAlign: "left" }}>
            <div className="row" style={{ padding: 0 }}>
              <div className="col-3" style={{ color: "black" }}>Email</div>
              <div className="col-9" style={{ color: "black" }}>{Email}</div>
            </div>
            <div className="row" style={{ padding: 0 }}>
              <div className="col-3" style={{ color: "black" }}>Teléfono</div>
              <div className="col-9" style={{ color: "black" }}>{`${CellPhoneNumber ? "S/D" : CellPhoneNumber}`}</div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default UserInfo;
