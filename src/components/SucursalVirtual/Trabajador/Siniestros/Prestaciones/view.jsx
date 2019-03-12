import React from 'react';
import { connect } from "react-redux";
import LoadingOverlay from "../../../../Shared/LoadingOverlay";


import LastPrestacionInfo from './lastPrestacionInfo';
import TablePrestaciones from './tablePrestaciones';
// import Details from './detalle/details';

class Prestaciones extends React.PureComponent {

  handleViewDetails = (newIndex) => {
    // this.setState({index: newIndex});
  }

  render () {
    return (
      <div>
        {this.props.isLoading && <LoadingOverlay />}
        <LastPrestacionInfo handleDetails={this.handleViewDetails} />
        <TablePrestaciones handleDetails={this.handleViewDetails} />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoading: state.prestaciones.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Prestaciones);
