import apiConfig from "../config/api";
const getToken = () => localStorage.getItem("AccessToken");

const parameters = `${apiConfig.apiUri}api/parameters`;
const sucursalesUrl = `${apiConfig.apiUri}api/company/get`;


const powerBi = `${apiConfig.apiUri}api/user/`;

export const listaProfesionales = () =>
  fetch(`${parameters}/profesionales`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaEstadoCivil = () =>
  fetch(`${parameters}/estadoCivil`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaRegiones = () =>
  fetch(`${parameters}/regiones`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaComunas = () =>
  fetch(`${parameters}/comunas`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaAfp = () =>
  fetch(`${parameters}/afp`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaRubros = () =>
  fetch(`${parameters}/rubros`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaJornadas = () =>
  fetch(`${parameters}/jornadas`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaBancos = () =>
  fetch(`${parameters}/bancos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaParentesco = () =>
  fetch(`${parameters}/parentescos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaSucursales = (idEmpresa) =>

  fetch(`${sucursalesUrl}/offices/${idEmpresa}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaSexos = () =>
  fetch(`${parameters}/sexos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaNacionalidades = () =>
  fetch(`${parameters}/nacionalidades`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaPueblosOriginarios = () =>
  fetch(`${parameters}/pueblosOriginarios`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaTiposCalle = () =>
  fetch(`${parameters}/tiposCalle`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaClasificacionesAccidente = () =>
  fetch(`${parameters}/clasificacionesAccidente`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaMediosPrueba = () =>
  fetch(`${parameters}/mediosPrueba`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaTiposCuenta = () =>
  fetch(`${parameters}/tipoCuentas`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaTiposContrato = () =>
  fetch(`${parameters}/tipoContrato`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaCategoriasOcupacionales = () =>
  fetch(`${parameters}/categoriaOcupacional`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaTiposIngreso = () =>
  fetch(`${parameters}/tipoIngreso`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const listaDirecciones = () =>
  fetch(`${parameters}/direcciones`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const GetTokenPowerBi = (groupId, reportId) =>
  fetch(`${powerBi}/GetEmbedToken/${groupId}/${reportId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
      Authorization: `Bearer ${getToken()}`,
    },
  });
