const Axios = require('axios').default;

/**
 * @param {Method} method
 * @param {string} url
 * @param {AxiosRequestConfig} config
 * @returns {Promise<AxiosResponse>}
 */
function request(method, url, config) {
  return Axios.request({ method, url, ...config });
}

class ApiService {
  /**
   * @param {string} url
   * @param {AxiosRequestConfig} config
   * @returns {Promise<AxiosResponse>}
   */
  get = (url, config) => request('get', url, config);

  /**
   * @param {string} url
   * @param {any} data
   * @param {AxiosRequestConfig} config
   * @returns {Promise<AxiosResponse>}
   */
  post = (url, data, config) => request('post', url, { data, ...config });
}

module.exports = new ApiService();
