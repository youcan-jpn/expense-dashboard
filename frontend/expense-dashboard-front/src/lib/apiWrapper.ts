import axios from 'axios';

export type Result<T, U> = Success<T> | Failure<U>;

export type Success<T> = T & {
  isSuccess: true;
};

export type Failure<T> = T & {
  isSuccess: false;
};

export type ApiFunction<T, U, V> = (params: T, formdata?: U) => Promise<V>;

export const success = <T extends object>(obj: T): Success<T> =>
  Object.assign(obj, { isSuccess: true as const });

export const failure = <T extends object>(obj: T): Failure<T> =>
  Object.assign(obj, { isSuccess: false as const });

const apiWrapper = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  },
  responseType: 'json'
});

export default apiWrapper;