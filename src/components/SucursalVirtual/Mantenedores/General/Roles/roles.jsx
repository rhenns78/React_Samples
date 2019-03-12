import React from "react";
import { connect } from "react-redux";
import TablaRoles from "./rolesTable";
import Modal from "./modalFuncionalidades";
import { doGetAllFunctionalities } from "./actions";
import listaFuncionalidades from "../../../../../helpers/rolAccess";


class Roles extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      selectedRowId: null,
      funcionalidades: [],
      isNewRow: false,
    };

    this.props.dispatch(doGetAllFunctionalities());
  }

  handleModal = (isNewRow, selectedRowId) => {
    this.setState((prevState) => ({ showModal: !prevState.showModal, isNewRow, selectedRowId }));
  }

  getListaFunctionalities = () => {
    const listaConIds = [];
    this.props.functionalities.length && listaFuncionalidades.forEach((func) => {
      const dbFunc = this.props.functionalities.find((f) => f.Code.trim() === func.Code);
      let parent;
      if (func.parentCode) {
        parent = this.props.functionalities.find((f) => f.Code.trim() === func.parentCode);
      }
      if (dbFunc) {
        if (parent) {
          listaConIds.push({ ...func, Id: dbFunc.Id, parentId: parent.Id });
        } else {
          listaConIds.push({ ...func, Id: dbFunc.Id });
        }
      }
    });

    return listaConIds;
  }

  render() {
    return (
      <div className="col-12 zero">
        <Modal
          open={this.state.showModal}
          isNewRow={this.state.isNewRow}
          selectedRowId={this.state.selectedRowId}
          onClose={this.handleModal}
          listaFuncionalidades={this.getListaFunctionalities()}
        />

        <div
          style={{
            width: "100%", display: "flex", justifyContent: "center",
          }}
        >
          <div className="col-12 zero" >

            <TablaRoles
              openModal={this.handleModal}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  roles: state.mantenedores.roles,
  perfiles: state.mantenedores.perfiles,
  functionalities: state.mantenedores.functionalities,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
