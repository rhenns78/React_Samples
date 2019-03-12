import React from "react";
import { Button, Popover, List } from "devextreme-react";
import helper from "../../helpers/validaciones";

class InfoUsuario extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      openPopover: false,
    };
  }

  showHidePopover = (open) => {
    this.setState({ openPopover: open });
  }

  handleLogout = () => {
    this.showHidePopover(false);
    this.props.logoutCallback();
  }

  goMyAccount = () => {
    this.showHidePopover(false);
    this.props.myAccountCallback();
  }

  render() {
    const {
      userData,
    } = this.props;

    return (
      <div>
        <Button
          id="btnUserInfo"
          onClick={() => this.showHidePopover(!this.state.openPopover)}
          stylingMode="text"
          className="buttonIconTopBar"
          type="normal"
        >
          <i className="achs-icon"> H </i>

        </Button>

        <Popover
          target="#btnUserInfo"
          position="bottom"
          className="info-usuario-popup"
          visible={this.state.openPopover}
          closeOnOutsideClick
          onHiding={() => this.showHidePopover(false)}
        >
          <div className="row zero">
            <div className="col-12">
              <div className="cardCircle">
                <div className="cardTextCircle">
                  {`${helper.getFirstLetter(userData.FirstName)}${helper.getFirstLetter(userData.LastName)}`}
                </div>
              </div>
            </div>
            <div className="col-12 datosCuenta">
              <div className="col-12 textosCard" >
                <h5>
                  {`${userData.FirstName} ${userData.LastName !== "undefined" ? userData.LastName : ""}`}
                </h5>
              </div>
              <div className="col-12 textosCard">
                <h5>
                  {userData.Email}
                </h5>
              </div>
            </div>
            <div className="col-12 divider">
            </div>
            <List
              className="app-info-list"
              selectionMode="none"
              items={[
                // { name: "Mi Cuenta", icon: "H", onClick: this.goMyAccount },
                { name: "Cerrar Sesión", icon: "r", onClick: this.handleLogout },
              ]}
              itemComponent={(props) => (
                <div className="app-info-item">
                  <i className="achs-icon" > {props.icon}</i>
                  <span>{props.name}</span>
                </div>
              )}
            />
          </div>
        </Popover>
      </div>
    );
  }
}

export default InfoUsuario;
