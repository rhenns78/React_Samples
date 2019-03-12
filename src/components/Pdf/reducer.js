import defaultState from "./state";

const pdf = (state = defaultState, action) => {
  switch (action.type) {
    case "LOAD_DATA_PDF": {
      return Object.assign({}, state, {
        data: action.data,
      });
    }

    default:
      return state;
  }
};
export default pdf;
