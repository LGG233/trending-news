/* eslint-disable no-unused-vars */
import Axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

/**
 * @type {string}
 */
const API = process.env.REACT_APP_API_URL || 'http://localhost:8080';

/**
 * @template T
 * @param {Method} method
 * @param {string} url
 * @param {AxiosRequestConfig} config
 * @returns {Promise<AxiosResponse<T>>}
 */
function request(method, url, config) {
  url = url.startsWith('http') ? url : `${API}/${url}`;
  return Axios.request({ method, url, ...config });
}

class ApiService {
  /**
   * @template T
   * @param {string} url
   * @param {AxiosRequestConfig} config
   * @returns {Promise<AxiosResponse<T>>}
   */
  get = (url, config) => request('get', url, config);

  /**
   * @template T
   * @param {string} url
   * @param {any} data
   * @param {AxiosRequestConfig} config
   * @returns {Promise<AxiosResponse<T>>}
   */
  post = (url, data, config) => request('post', url, { data, ...config });
}

export default ApiService = new ApiService();
