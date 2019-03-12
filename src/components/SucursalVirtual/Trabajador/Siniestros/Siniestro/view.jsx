import React from "react";
import { connect } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import LoadingOverlay from "../../../../Shared/LoadingOverlay";
import LastSiniestroInfo from "./lastSiniestroInfo";
import TableSiniestros from "./tableSiniestros";
import Details from "./detalle/details";
import { setSelectedSiniestro, doGetLastSiniestro } from "./actions";

class Siniestro extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };

    this.props.dispatch(doGetLastSiniestro(props.userData.RUT));
  }

  handleViewDetails = (newIndex, data) => {
    if (this.props.viewDocumentos) return;
    this.setState({ index: newIndex });
    this.props.dispatch(setSelectedSiniestro(data));
  }

  render() {
    return (
      <div>
        {this.props.isLoading && <LoadingOverlay />}
        <SwipeableViews
          index={this.state.index}
          disabled
          async
        >
          <div>
            <LastSiniestroInfo handleDetails={this.handleViewDetails} />
            <TableSiniestros handleDetails={this.handleViewDetails} />
          </div>
          <div>
            <LastSiniestroInfo showingDetails handleDetails={this.handleViewDetails} />
            <Details handleDetails={this.handleViewDetails} />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.siniestro.isLoading,
  viewDocumentos: state.siniestro.viewDocumentos,
  userData: state.global.userData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Siniestro);
