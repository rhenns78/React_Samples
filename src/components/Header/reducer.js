import defaultState from "./state";

const headerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOAD_TABS": {
      return Object.assign({}, state, {
        tabs: action.tabs,
        contentId: action.contentId,
        tabPosition: 0,
        title: action.title,
      });
    }
    case "CHANGE_TABS_INDEX": {
      return Object.assign({}, state, {
        contentId: action.newContentId,
        tabPosition: action.tabPosition,
      });
    }
    case "OPEN_CLOSE_ACCOUNT_MENU": {
      return Object.assign({}, state, {
        isOpenAcountMenu: action.isOpenAcountMenu,
      });
    }

    default:
      return state;
  }
};

export default headerReducer;
