/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, Method } from "axios";
import _ from "lodash";

interface requestParams extends AxiosRequestConfig {
  method: Method;
  url: string;
  withJWT?: boolean;
}

function fromSnakeToCamel(data: any): any {
  if (_.isArray(data)) {
    return _.map(data, fromSnakeToCamel);
  }

  if (_.isObject(data)) {
    return _(data)
      .mapKeys((_value, key) => _.camelCase(key))
      .mapValues((value) => fromSnakeToCamel(value))
      .value();
  }

  return data;
}

function fromCamelToSnake(data: any): any {
  if (_.isArray(data)) {
    return _.map(data, fromCamelToSnake);
  }

  if (_.isObject(data)) {
    return _(data)
      .mapKeys((_value, key) => _.snakeCase(key))
      .mapValues((value) => fromCamelToSnake(value))
      .value();
  }

  return data;
}

export default function requestAPI({
  params,
  method,
  url,
  withJWT,
  ...config
}: requestParams) {
  if (withJWT) {
    return;
  }

  return axios
    .request(
      fromCamelToSnake({
        url,
        method,
        params,
        withCredentials: process.env.NODE_ENV === "development" ? true : false,
        ...config,
      })
    )
    .then((response) => fromSnakeToCamel(response.data))
    .catch((error) => Promise.reject(error));
}
