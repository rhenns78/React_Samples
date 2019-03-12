import React, { Component } from "react";
import { connect } from "react-redux";
import { Gmaps, Marker,
  // InfoWindow, Circle
// eslint-disable-next-line object-curly-newline
} from "react-gmaps";
import SearchBar from "./SearchGoogleBar";

class Map extends Component {
  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true,
    });
  }

  onDragEnd(e) {
    console.log("onDragEnd", e);
  }

  onCloseClick() {
    console.log("onCloseClick");
  }

  onClick(e) {
    console.log("onClick", e);
  }

  render() {
    return (
      <div style={{ height: "85%", width: "97%" }}>
        <div style={{ paddingBottom: "2%" }}>
          <SearchBar />
        </div>
        <Gmaps
          width="100%"
          height="100%"
          lat={this.props.center.lat}
          lng={this.props.center.lng}
          zoom={this.props.zoom}
          loadingMessage="Cargando Mapa ..."
          params={this.props.params}
          onMapCreated={this.onMapCreated}
        >
          <Marker
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            draggable
            onDragEnd={this.onDragEnd}
          />
          {/*
            ESTO ES PARA PONER UN TEXTO INFORMATIVO

            <InfoWindow
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            content="Información extra"
            onCloseClick={this.onCloseClick}
          />

           ESTO ES PARA DELIMITAR UN AREA EN FORMA DE CIRCULO
          <Circle
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            radius={1000}
            onClick={this.onClick}
          /> */}
        </Gmaps>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  params: state.map.params,
  center: state.map.center,
  zoom: state.map.zoom,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
