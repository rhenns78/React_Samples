const hostname = window && window.location && window.location.hostname;
let apiUri = "https://api.achs.cl/";
let callback = "https://api.achs.cl/";
let redUri = "https://www.achsgestion.cl/sso";
let uriMail = "https://api.achs.cl";
let applicationid = "c406b2c5-0758-4571-8f11-bdc62c04c975";
let OcpApimSubscriptionKey = "8b84a1d721a6454aab5daa4b508fea2c";
let sapUri = "https://vhaczpctcs.hec.achs.cl:50001/irj/portal/2016?opcion=1&token=";
let notificationHUB = "https://achsvirtual.achs.cl/achs/";

switch (true) {
  case hostname.includes("dev-"): {
    apiUri = "https://achsdev.azure-api.net/";
    OcpApimSubscriptionKey = "01186224364148a5bf4531603c0d1ef7";
    callback = "https://achsdev.azure-api.net/";
    redUri = "http://qa.achs.sabentis.com/sso";
    uriMail = "https://achsdev.azure-api.net";
    applicationid = "7fd168e3-509b-428e-aebd-2c25ddf337a7";
    sapUri = "https://vhaczpctcs.hec.achs.cl:50001/irj/portal/2016?opcion=1&token=";
    notificationHUB = "https://dev-achsvirtual.achs.cl/achs/";
    break;
  }

  case hostname.includes("qa-"): {
    apiUri = "https://achsqa.azure-api.net/";
    OcpApimSubscriptionKey = "16a09e78fb424ba986307863cc356e3b";
    callback = "https://achsqa.azure-api.net/";
    redUri = "https://qa.achs.sabentis.com/sso";
    uriMail = "https://achsqa.azure-api.net/";
    applicationid = "73a17945-f890-44f1-8eec-4008d21c35ea";
    sapUri = "https://vhaczpctcs.hec.achs.cl:50001/irj/portal/2016?opcion=1&token=";
    notificationHUB = "https://qa-achsvirtual.achs.cl/achs/";
    break;
  }
  case hostname.includes("localhost"): {
    apiUri = "https://achsdev.azure-api.net/";
    OcpApimSubscriptionKey = "01186224364148a5bf4531603c0d1ef7";
    callback = "https://achsdev.azure-api.net/";
    redUri = "http://qa.achs.sabentis.com/sso";
    uriMail = "https://achsdev.azure-api.net";
    applicationid = "7fd168e3-509b-428e-aebd-2c25ddf337a7";
    sapUri = "https://vhaczpctcs.hec.achs.cl:50001/irj/portal/2016?opcion=1&token=";
    notificationHUB = "https://dev-achsvirtual.achs.cl/achs/";
    break;
  }
  default: {
    break;
  }
}

const config = {
  apiUri,
  callback,
  redUri,
  uriMail,
  applicationid,
  OcpApimSubscriptionKey,
  sapUri,
  notificationHUB,
};

export default config;

