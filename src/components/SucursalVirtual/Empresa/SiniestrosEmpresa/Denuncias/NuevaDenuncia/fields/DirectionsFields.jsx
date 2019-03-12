import React from "react";
import { connect } from "react-redux";
import { RadioGroup } from "devextreme-react";
import { Gmaps, Marker,
  // InfoWindow, Circle
// eslint-disable-next-line object-curly-newline
} from "react-gmaps";
import { setDataNewComplain } from "../../actions";
import SearchBar from "../../../../../../Maps/SearchGoogleBar";
import { SetLatitudeLongitude, GetDirectionsMetadata } from "../../../../../../Maps/actions";

import TextField from "../../../../../../Shared/fields/TextField";


class DirectionFields extends React.Component {
  componentDidMount = () => {
    switch (this.props.activeStep) {
      case 2: {
        if ((this.props.jsonData.formInfoTrabajador.lat && this.props.jsonData.formInfoTrabajador.lat !== null) && (this.props.jsonData.formInfoTrabajador.lng && this.props.jsonData.formInfoTrabajador.lng !== null)) {
          this.props.dispatch(SetLatitudeLongitude(this.props.jsonData.formInfoTrabajador.lat, this.props.jsonData.formInfoTrabajador.lng));
          this.setResultSearchMaps(this.props.jsonData.formInfoTrabajador);
        }
        break;
      }
      case 3: {
        if ((this.props.jsonData.formDatoSiniestro.lat && this.props.jsonData.formDatoSiniestro.lat !== null) && (this.props.jsonData.formDatoSiniestro.lng && this.props.jsonData.formDatoSiniestro.lng !== null)) {
          this.props.dispatch(SetLatitudeLongitude(this.props.jsonData.formDatoSiniestro.lat, this.props.jsonData.formDatoSiniestro.lng));
          this.setResultSearchMaps(this.props.jsonData.formDatoSiniestro);
        }

        break;
      }
      default:
        break;
    }
  }


  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true,
    });
  }
  setResultSearchMaps =(Data) => {
    const result = {};
    result.region = Data.Region;
    result.province = Data.Ciudad;
    result.commune = Data.Comuna;
    result.street = Data.Calle;
    result.number = Data.Numero;
    result.typeStreet = Data.TipoCalle;
    result.town = typeof Data.Poblacion === "undefined" ? "" : Data.Poblacion;

    this.props.dispatch(GetDirectionsMetadata(result));
  }
  setAdressByMaps = (result, lat, lng) => {
    const jsonData = { ...this.props.jsonData };

    switch (this.props.activeStep) {
      case 2: {
        jsonData.formInfoTrabajador.Region = result.region;
        jsonData.formInfoTrabajador.Comuna = result.commune;
        jsonData.formInfoTrabajador.Calle = result.street;
        jsonData.formInfoTrabajador.Numero = result.number;
        jsonData.formInfoTrabajador.Ciudad = result.province;
        jsonData.formDatoSiniestro.Poblacion = result.town;
        jsonData.formDatoSiniestro.TipoCalle = result.typeStreet;
        jsonData.formInfoTrabajador.lat = lat;
        jsonData.formInfoTrabajador.lng = lng;

        this.props.dispatch(setDataNewComplain(jsonData));
        break;
      }
      case 3: {
        jsonData.formDatoSiniestro.Region = result.region;
        jsonData.formDatoSiniestro.Comuna = result.commune;
        jsonData.formDatoSiniestro.Calle = result.street;
        jsonData.formDatoSiniestro.Numero = result.number;
        jsonData.formDatoSiniestro.Ciudad = result.province;
        jsonData.formDatoSiniestro.Poblacion = result.town;
        jsonData.formDatoSiniestro.TipoCalle = result.typeStreet;
        jsonData.formDatoSiniestro.lat = lat;
        jsonData.formDatoSiniestro.lng = lng;

        this.props.dispatch(setDataNewComplain(jsonData));
        break;
      }
      default:
        break;
    }
  }
  handleChange = (e) => {
    this.props.onChange(e);
  }
  render() {
    const form = { ...this.props.form };


    return (
      <React.Fragment>
        <RadioGroup
          defaultValue="Google Maps"
          value={form.TipoDireccion}
          id="TipoDireccion"
          items={["Google Maps", "Ingresar la dirección"]}
          layout="horizontal"
          onValueChanged={this.handleChange}
        />

        {form.TipoDireccion === "Google Maps" &&
          <React.Fragment>

            <div className="map-mock">
              <div style={{ height: "90%", width: "100%" }}>
                <div style={{ paddingBottom: "2%" }}>
                  <SearchBar setAdressByMaps={this.setAdressByMaps} />
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
                    // onDragEnd={this.onDragEnd}
                  />

                </Gmaps>
              </div>
            </div>
          </React.Fragment>
        }


        <TextField
          id="Region"
          label="Región"
          value={form.Region}
          disabled={form.TipoDireccion === "Google Maps" && this.props.directionMetadata.region !== ""}
          onValueChanged={this.handleChange}
        />
        <TextField
          id="Comuna"
          label="Comuna"
          value={form.Comuna}
          disabled={form.TipoDireccion === "Google Maps" && this.props.directionMetadata.commune !== ""}
          onValueChanged={this.handleChange}
        />
        <TextField
          id="TipoCalle"
          label="Tipo de calle"
          value={form.TipoCalle}
          disabled={form.TipoDireccion === "Google Maps" && this.props.directionMetadata.typeStreet !== ""}
          onValueChanged={this.handleChange}

        />
        <TextField
          id="Calle"
          label="Calle"
          value={form.Calle}
          disabled={form.TipoDireccion === "Google Maps" && this.props.directionMetadata.street !== ""}
          onValueChanged={this.handleChange}

        />
        <TextField
          id="Numero"
          label="Número"
          value={form.Numero}
          disabled={form.TipoDireccion === "Google Maps" && this.props.directionMetadata.number !== ""}
          onValueChanged={this.handleChange}

        />
        <TextField
          id="Poblacion"
          label="Población o villa"
          value={form.Poblacion}
          disabled={form.TipoDireccion === "Google Maps" && this.props.directionMetadata.town !== ""}
          onValueChanged={this.handleChange}

        />
        <TextField
          id="Ciudad"
          label="Ciudad o localidad"
          value={form.Ciudad}
          disabled={form.TipoDireccion === "Google Maps" && this.props.directionMetadata.province !== ""}
          onValueChanged={this.handleChange}

        />
      </React.Fragment>

    );
  }
}

const mapStateToProps = (state) => ({
  jsonData: state.denuncias.jsonData,
  activeStep: state.denuncias.activeStep,
  params: state.map.params,
  center: state.map.center,
  zoom: state.map.zoom,
  directionMetadata: state.map.directionMetadata,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(DirectionFields);

