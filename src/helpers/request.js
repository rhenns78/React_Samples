import "whatwg-fetch";

import apiConfig from "../config/api";
const getToken = () => localStorage.getItem("AccessToken");

const defaultHeaders = () => ({
  "Content-Type": "application/json",
  "Ocp-Apim-Subscription-Key": apiConfig.OcpApimSubscriptionKey,
  Authorization: `Bearer ${getToken()}`,
});

/**
 * Parses an object to the params format (filtro=value&numero=2)
 *
 * @param  {object} objeto filtro => value
 *
 * @return {string}          The parsed object
 */
export const getParamsFormat = (filter) => {
  let params = "";
  Object.keys(filter).forEach((key) => {
    params = `${params}${params !== "" ? "&" : ""}${key}=${filter[key]}`;
  });
  return params;
};

export const getUrlFormat = (url, params) => {
  if (params) {
    return `${url}?${getParamsFormat(params)}`;
  }
  return url;
};

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

export const post = (url, options) =>
  fetch(`${getUrlFormat(url, options.params)}`, {
    method: "POST",
    headers: {
      ...defaultHeaders(),
      ...options.headers,
    },
    body: options.body,
  });

export const get = (url, options) =>
  fetch(`${getUrlFormat(url, options.params)}`, {
    method: "GET",
    headers: {
      ...defaultHeaders(),
      ...options.headers,
    },
  });

export const requestDelete = (url, options) =>
  fetch(`${getUrlFormat(url, options.params)}`, {
    method: "DELETE",
    headers: {
      ...defaultHeaders(),
      ...options.headers,
    },
    body: options.body,
  });
