import areIntlLocalesSupported from "intl-locales-supported";
import Moment from "moment";


const IntlPolyfill = require("intl");
require("intl/locale-data/jsonp/es");
require("intl/locale-data/jsonp/es-CL");

export const formatDateForFilter = (dateString) => Moment(dateString).format("YYYYMMDD");

const customDateTimeFormat = {
  cl: () => {
    if (areIntlLocalesSupported(["es", "es-CL"])) {
      return global.Intl.DateTimeFormat;
    }
    return IntlPolyfill.DateTimeFormat;
  },
};

export default customDateTimeFormat;
