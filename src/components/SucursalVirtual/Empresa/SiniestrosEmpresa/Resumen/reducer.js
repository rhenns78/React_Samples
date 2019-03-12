import defaultState from "./state";

const resumenReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOADING_DASHBOARD": {
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    }



    default:
      return state;
  }
};

export default resumenReducer;
