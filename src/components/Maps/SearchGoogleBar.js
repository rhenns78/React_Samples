import React from "react";
import { connect } from "react-redux";
// getLatLng
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete";
import { ChangeAddressAutocomplete, SetLatitudeLongitude, ChangeGeolocation,
  SetErrorMessages, GetDirectionsMetadata } from "./actions";

const searchOptions = {


  componentRestrictions: { country: "cl" },
};

class SearchBar extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   result: null,

  //   // };
  // }

  handleChange = (address) => {
    this.props.dispatch(ChangeAddressAutocomplete(address));
  };

  handleSelect = (selected) => {
    this.props.dispatch(ChangeAddressAutocomplete(selected, true));

    geocodeByAddress(selected)
      .then((res) => {
        this.handleResponse(res[0]);

        // return getLatLng(res[0]);
      })
      // .then(({ lat, lng }) => {
      //   this.props.dispatch(SetLatitudeLongitude(lat, lng));
      //
      // })
      .catch(() => {
        this.props.dispatch(ChangeGeolocation(false));
      });
  };

  handleResponse = (response) => {
    const result = {
      country: "",
      region: "",
      province: "",
      commune: "",
      street: "",
      number: "",

    };
    response.address_components.forEach((element) => {
      result.region = element.types.find(() => "administrative_area_level_1") === "administrative_area_level_1" ? element.long_name : result.region;
      result.province = element.types.find(() => "administrative_area_level_2") === "administrative_area_level_2" ? element.long_name : result.province;
      result.commune = element.types.find(() => "administrative_area_level_3") === "administrative_area_level_3" ? element.long_name : result.commune;
      result.country = element.types.find(() => "country") === "country" ? element.long_name : result.country;
      result.street = (element.types.find(() => "street_address") === "street_address" || element.types.find(() => "route") === "route") ? element.long_name : result.street;
      result.number = element.types.find(() => "street_number") === "street_number" ? element.long_name : result.number;
      result.typeStreet = "";
      result.town = "";
    });
    // console.log("geometry", "lat:>", response.geometry.location.lat(), "lng", response.geometry.location.lng());
    const lat = response.geometry.location.lat();
    const lng = response.geometry.location.lng();
    this.props.dispatch(SetLatitudeLongitude(lat, lng));
    this.props.dispatch(GetDirectionsMetadata(result));
    this.props.setAdressByMaps(result, lat, lng);
  }

  handleCloseClick = () => {
    this.props.dispatch(ChangeAddressAutocomplete(""));
  };

  handleError = (status, clearSuggestions) => {
    this.props.dispatch(SetErrorMessages(status), () => {
      clearSuggestions();
    });
  };

  render() {
    return (
      <div>
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={this.props.address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={this.props.address.length >= 3}
          searchOptions={searchOptions}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <React.Fragment>

              <div className="search-bar-google">
                <div id="Maps" className="dx-textbox dx-texteditor dx-editor-outlined dx-widget dx-texteditor-empty">
                  <div className="dx-texteditor-container">
                    <input
                      {...getInputProps({
                        placeholder: "Búsqueda por dirección...",
                        className: "dx-texteditor-input",
                      })}
                    />
                    {this.props.address.length > 0 && (
                      <button
                        className="google-clear-button"
                        onClick={this.handleCloseClick}
                      >
                          x
                      </button>
                    )}
                  </div>
                </div>


                {suggestions.length > 0 && (
                  <div className="google-autocomplete-container">
                    {suggestions.map((suggestion) =>
                      (
                        <div
                          {...getSuggestionItemProps(suggestion, "google-suggestion-item google-suggestion-item--active")}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{" "}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </React.Fragment>
          )}
        </PlacesAutocomplete>
        {this.props.errorMessage.length > 0 && (
          <div className="google-error-message">{this.props.errorMessage}</div>
        )}


      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  address: state.map.address,
  errorMessage: state.map.errorMessage,
  latitude: state.map.center.lat,
  longitude: state.map.center.lng,
  isGeocoding: state.map.isGeocoding,
  directionMetadata: state.map.directionMetadata,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

