import React from "react";
import { connect } from "react-redux";
import { SelectBox } from "devextreme-react";
import validaciones from "../../../../../../helpers/validaciones";
import { doGetUserSuscriptions, setSelectedUserNotifications, doGetExternalUserSuscriptions } from "../actions";
import ModalAsignarNotificaciones from "./ModalAsignarNotificaciones";


class UserSearch extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      selectedUser: {},
    };
  }

  handleSelect = (e) => {
    if (!validaciones.isEmpty(e.selectedItem)) {
      this.props.dispatch(doGetUserSuscriptions(e.selectedItem, this.props.companyId));
      this.setState({ isOpen: true, selectedUser: e.selectedItem });
      e.component.option("value", null);
    }
  }

  handleSelectExternal = (e) => {
    if (!validaciones.isEmpty(e.selectedItem)) {
      this.props.dispatch(doGetExternalUserSuscriptions(e.selectedItem, this.props.companyId));
      this.setState({ isOpen: true, selectedUser: e.selectedItem });
      e.component.option("value", null);
    }
  }

  handleClose = () => {
    this.setState({ isOpen: false, selectedUser: {} });
    this.props.dispatch(setSelectedUserNotifications(null));
  }

  render() {
    return (
      <React.Fragment>


        <SelectBox
          items={this.props.usuarios}
          mode="search"
          placeholder={this.props.placeholder}
          onSelectionChanged={this.props.typeUserRelationFilter === "INT" ? this.handleSelect : this.handleSelectExternal}
          searchEnabled
          displayExpr="EmployeeName"
          searchMode="contains"
          searchExpr={this.props.typeUserRelationFilter === "INT" ? ["EmployeeName", "Rut"] : ["EmployeeName", "Email", "Cellphone"]}
          style={this.props.style}


          itemComponent={React.memo((props) => (
            <div style={{ display: "flex" }}>

              {this.props.typeUserRelationFilter === "INT" && (
                <React.Fragment>

                  <div className="group-Column">
                    <div className="dotIcon"> <span className="text bold-text" title={props.EmployeeName}>{`${props.EmployeeName}`.toLowerCase()}</span>
                      <div className="text space-text"> {props.Rut} </div>
                    </div>


                  </div>

                  <span style={{ flexGrow: 1, textAlign: "center" }}>{props.Roles && props.Roles.map((e) => e.Name).join(", ")}</span>
                </React.Fragment>
              )}
              {this.props.typeUserRelationFilter === "EXT" && (
                <React.Fragment>
                  <div className="group-Column">
                    <div className="dotIcon">
                      <span className="text bold-text" title={props.EmployeeName}>{`${props.EmployeeName}`.toLowerCase()}</span>
                      <span className="text space-text" title={props.Email}>{props.Email}</span>
                    </div>
                  </div>

                </React.Fragment>
              )}


            </div>
          ))}
        />


        <ModalAsignarNotificaciones
          isOpen={this.state.isOpen}
          selectedUser={this.state.selectedUser}
          // data={this.props.notificaciones}
          onClose={this.handleClose}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  // notificaciones: state.notificacionesEmpresa.notificaciones,
  usuarios: state.notificacionesEmpresa.usuarios,
  typeUserRelationFilter: state.notificacionesEmpresa.typeUserRelationFilter,
  companyId: state.global.companyId,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);
