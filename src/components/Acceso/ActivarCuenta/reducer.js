import defaultState from "./state";

const activarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_VALID_ACCESS": {
      return Object.assign({}, state, {
        accessValid: action.accessValid,
      });
    }
    case "PASS_CREATED": {
      return Object.assign({}, state, {
        passCreated: action.created,
      })
    }

    default:
      return state;
  }
};
export default activarReducer;
