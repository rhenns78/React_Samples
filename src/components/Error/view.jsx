import React from "react";
import { connect } from "react-redux";


class ErrorCustom extends React.Component {
  render() {
    return (
      <div>
        <h1>Error !!</h1>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});


export default connect(mapStateToProps, mapDispatchToProps)(ErrorCustom);
