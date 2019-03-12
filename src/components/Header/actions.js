import apiConfig from "../../config/api";


export const askToken = (email) => async (dispatch) => {
  const params = {
    Id: "1",
    IdPerson: email,
    IdPersonType: "EMAIL",
    CallBackUri: apiConfig.callback,
  };

  const request = await fetch(
    `${apiConfig.apiUri}api/jwt`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      },
      credentials: "same-origin",
      body: JSON.stringify(params),
    }
  );

  if (request.status === 200) {
    const response = await request.json();
    const href = `${apiConfig.redUri}?token=${response.Token}`;
    window.open(href, "_blank");
  }
};

export const loadTabs = (title, tabs, contentId) => ({
  type: "LOAD_TABS",
  title,
  tabs,
  contentId,
});

export const changeTabIndex = (newContentId, tabPosition) => ({
  type: "CHANGE_TABS_INDEX",
  newContentId,
  tabPosition,
});

export const openCloseAcountMenu = (isOpenAcountMenu) => ({
  type: "OPEN_CLOSE_ACCOUNT_MENU",
  isOpenAcountMenu,
});
