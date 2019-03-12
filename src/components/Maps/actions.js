
// Action Creators
export const changeRouteApp = (path, pathName) => ({
  type: "CHANGE_ROUTE_APP",
  path,
  pathName,

});
export const MarkerClickMaps = (props, marker, e) => ({
  type: "MARKER_CLICK_MAPS",
  props,
  marker,
});
export const CloseMaps = (param) => ({
  type: "CLOSE_MAPS",
  param,
});
export const ChangeAddressAutocomplete = (address, geoCoding) => ({
  type: "CHANGE_ADDRESS_AUTOCOMPLETE",
  address,
  geoCoding,
});
export const SetLatitudeLongitude = (lat, lng) => ({
  type: "SET_LATITUDE_LONGITUDE",
  lat,
  lng,
});
export const ChangeGeolocation = (boolean) => ({
  type: "CHANGE_GEO_LOCATION",
  boolean,
});
export const SetErrorMessages = (message) => ({
  type: "SET_ERROR_MESSAGES",
  message,
});
export const GetDirectionsMetadata = (metadata) => ({
  type: "GET_DIRECTION_METADATA",
  metadata,
});
