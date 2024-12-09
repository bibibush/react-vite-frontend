/* eslint-disable @typescript-eslint/no-explicit-any */
import { tokenService } from "@/lib/tokenService";
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

  if (_.isPlainObject(data)) {
    return _(data)
      .mapKeys((_value, key: string) => _.camelCase(key))
      .mapValues((value) => fromSnakeToCamel(value))
      .value();
  }

  return data;
}

function fromCamelToSnake(data: any): any {
  if (_.isArray(data)) {
    return _.map(data, fromCamelToSnake);
  }

  if (_.isPlainObject(data)) {
    return _(data)
      .mapKeys((_value, key: string) => _.snakeCase(key))
      .mapValues((value) => fromCamelToSnake(value))
      .value();
  }

  return data;
}

export default function requestAPI({
  headers,
  params,
  method,
  url,
  withJWT,
  ...config
}: requestParams) {
  if (withJWT) {
    const token = tokenService.getToken("accessToken");
    if (!token) {
      const error = Object.assign(new Error("Unauthorized"), {
        response: {
          status: 401,
          statusText: "Unauthorized",
        },
      });

      return Promise.reject(error);
    }

    headers = { ...headers, Authorization: `Bearer ${token}` };
  }

  return axios
    .request(
      fromCamelToSnake({
        headers,
        url,
        method,
        params,
        ...config,
      })
    )
    .then((response) => Promise.resolve(fromSnakeToCamel(response)))
    .catch((error) => Promise.reject(error));
}
