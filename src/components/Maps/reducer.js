import defaultState from "./state";

const map = (state = defaultState, action) => {
  switch (action.type) {
    case "MARKER_CLICK_MAPS": {
      return Object.assign({}, state, {
        path: action.path,
        pathName: action.pathName,
      });
    }
    case "CLOSE_MAPS": {
      return Object.assign({}, state, {
        path: action.path,
        pathName: action.pathName,
      });
    }
    case "CHANGE_ADDRESS_AUTOCOMPLETE": {
      return Object.assign({}, state, {
        address: action.address,
        center: {
          lat: -33.4359041,
          lng: -70.6350728,
        },
        isGeocoding: action.geoCoding ? action.geoCoding : false,
        errorMessage: "",
      });
    }
    case "SET_LATITUDE_LONGITUDE": {
      return Object.assign({}, state, {
        center: {
          lat: action.lat,
          lng: action.lng,
        },
        isGeocoding: false,
      });
    }
    case "CHANGE_GEO_LOCATION": {
      return Object.assign({}, state, {
        isGeocoding: action.boolean,
      });
    }
    case "SET_ERROR_MESSAGES": {
      return Object.assign({}, state, {
        errorMessage: action.message,
      });
    }
    case "GET_DIRECTION_METADATA": {
      return Object.assign({}, state, {
        directionMetadata: action.metadata,
      });
    }
    default:
      return state;
  }
};
export default map;
