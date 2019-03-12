import React from "react";
import TablePerfil from "./tablePerfil";
import { connect } from "react-redux";

class Perfiles extends React.PureComponent {
  render() {
    return (
      <div className="col-12 zero">
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div className="col-12 zero" >
            <TablePerfil
              handleModal={this.handleModal}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // perfiles: state.mantenedores.perfiles,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Perfiles);
