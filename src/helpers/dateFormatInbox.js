import Moment from "moment";
import "moment/locale/es";
/**
 * Retorna la fecha en el formato que corresponda segun lo siguiente:
 * Si la fecha de notificacion es del mismo dia muestra "Hace x horas",
 *  Si la fecha de notificacion es de mas de un dia muestra " eJ: Jueves 21 a las 00:00hrs"
 * Si la fecha de notificacion es de mas de 7 dias muestra la fecha en el formato "dd/mm/yyyy"
 */

const dateFormatInbox = (fecha) => {
  let result = "";
  if (fecha) {
    const fechaActual = Moment();
    const fechaActualHoras = Moment().format("h");
    const fechaNotificacion = Moment(fecha);

    if (Moment(fechaNotificacion).add(7, "day") < fechaActual) { // + DE 7dias
      result = Moment(fechaNotificacion).format("DD/MM/YYYY");
    } else if (Moment(fechaNotificacion).add(fechaActualHoras, "hours") < fechaActual) { // >EL X DIA
      result = Moment(fechaNotificacion).format("dddd");
    } else {
      result = Moment(fechaNotificacion).startOf("hour").fromNow();
    }
    return result;
  }
  return result;
};

export default dateFormatInbox;
