
const rutRegex = require("rut-regex");
const Moment = require("moment");


const validaciones = {

  urlValidacion: (uri) => {
    const re = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/;
    return re.test(uri);
  },
  emptyText: (textfield) => {
    if (!textfield || textfield.trim() === "") {
      return false;
    }
    return true;
  },
  validarEmail(valor) {
    if (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(valor)) {
      return true;
    }
    return false;
  },
  cleanRut(rut) {
    return typeof rut === "string"
      ? rut.replace(/^0+|[^0-9kK]+/g, "").toUpperCase()
      : "";
  },
  formatRut(rut, { showDots, showHyphen }) {
    rut = this.cleanRut(rut);
    if (showHyphen) {
      var result = `${rut.slice(-4, -1)}-${rut.substr(rut.length - 1)}`;
    }
    for (let i = 4; i < rut.length; i += 3) {
      result = rut.slice(-3 - i, -i) + (showDots ? "." : "") + result;
    }

    return result;
  },
  validateRut(rut) {
    //  from rut.js
    if (typeof rut !== "string") {
      return false;
    }
    if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut)) {
      return false;
    }

    rut = this.cleanRut(rut);

    let t = parseInt(rut.slice(0, -1), 10);
    let m = 0;
    let s = 1;

    while (t > 0) {
      s = (s + (t % 10) * (9 - m++ % 6)) % 11;
      t = Math.floor(t / 10);
    }

    const v = s > 0 ? `${s - 1}` : "K";
    return v === rut.slice(-1);
  },
  verifcarRut(data) {
    const rexp = new RegExp(/^([0-9])+-([kK0-9])+$/);
    if (rexp.test(data)) {
      return rutRegex({ exact: true, dot: false }).test(data);
    }
    return false;
  },
  validateSeieCI: (data) => {
    const strongRegex = new RegExp("^([aA-zZ0-9]){9,10}$");
    if (strongRegex.test(data)) {
      return true;
    }
    return false;
  },
  validateCellPhone: (data) => {
    const rexp = new RegExp(/^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/);
    if (rexp.test(data)) {
      return true;
    }
    return false;
  },

  getDateFormat: (date) => {
    try {
      return date ? new Date(date) : new Date();
    } catch (error) {
      throw error;
    }
  },
  sendDateFormatApis: (date) => {
    try {
      const HoraMinutosInicio = "00:00:00";
      const soloFechaInicio = Moment(date).format("YYYY-MM-DD");
      const fechaInicio = Moment(`${soloFechaInicio} ${HoraMinutosInicio}`, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss");
      const fechasApi = fechaInicio;
      return fechasApi;
    } catch (error) {
      throw error;
    }
  },
  storngPasswordPattern: (password) => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    if (strongRegex.test(password)) {
      return true;
    }
    return false;
  },

  isEmpty: (obj) => {
    // null and undefined are "empty"
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    if (obj == null) return true;
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;
    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (const key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  },

  getFirstLetter: (text) => {
    if (text) {
      const letter = text.charAt(0);
      return letter.toUpperCase();
    }
    return "";
  },
  removeCharacters: (text, number) => {
    if (text) {
      const letter = text.substr(number);
      return letter.toUpperCase();
    }
    return "";
  },

  capitalizeFirstLetter: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
 },
  calculoMeses: (fechaContrato, fechaSiniestrio) => {
    const result = {};
  
    Moment.locale("es");


    const fc = Moment(fechaContrato);

    const fs = Moment(new Date()).subtract(1, "day");

    let fechaIni;
    const fechaFin = Moment(Moment(fs.format()).subtract(1, "months"));
    const duration = fs.diff(fc, "months");

    if (duration > 0) {
      result.middleStepsEnabled = true;
      if (duration >= 3) {
        result.numeroMeses = 3;
        // Busco los ultimos tres meses desde el siniestro hacia atras
        fechaIni = Moment(Moment(fs.format()).subtract(3, "months"));
      } else {
        // Busco los ultimos "durations" meses del siniestro hacia atras
        result.numeroMeses = duration;
        fechaIni = Moment(Moment(fs.format()).subtract(duration, "months"));
      }
    } else {
      // Busco el mes anterior
      result.numeroMeses = 0;
      result.middleStepsEnabled = false;
      fechaIni = Moment(Moment(fs.format()).subtract(1, "months"));
    }
 
    const timeValues = []
    while (fechaFin > fechaIni || fechaIni.format('M') === fechaFin.format('M')) {
      timeValues.push(fechaIni.format('MMMM').charAt(0).toUpperCase() + fechaIni.format('MMMM').slice(1));
      fechaIni.add(1,'month');
   }
   
    result.Meses = timeValues;
  
    return result;
  },

};

export default validaciones;
