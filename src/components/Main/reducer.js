import defaultState from "./state";

const main = (state = defaultState, action) => {
  switch (action.type) {
    case "CHANGE_ROUTE_APP": {
      return Object.assign({}, state, {
        path: action.path,
        pathName: action.pathName,
      });
    }

    default:
      return state;
  }
};
export default main;
