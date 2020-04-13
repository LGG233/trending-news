/**
 * Base 64 encode a string
 * @param {string} x
 * @returns {string}
 */
export const base64encode = (x) => Buffer.from(x).toString('base64');

/**
 * Map application/json to application/x-www-form-urlencoded
 * @param {Record<string, string | number | boolean>} data
 * @returns {string}
 */
export const mapJsonToUrlEncoded = (data) => {
  var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
};

/**
 * Map URL query parameters string to an object of key-value pairs
 * @param {string} urlQueryString
 * @returns {Record<string, string>}
 */
export const mapQueryParams = (urlQueryString) =>
  urlQueryString
    .substring(1)
    .split('&')
    .map((pair) => pair.split('='))
    .reduce((p, c) => ({ ...p, [c[0]]: c[1] }), {});
