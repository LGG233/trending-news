const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: process.env.AWS_AUTH_JWKS_URL,
  cache: true,
});

const MISSING_TOKEN = 'Missing Token';
const INVALID_TOKEN = 'Invalid Token';

class TokenService {
  /**
   * Verifies a JSON Web Token (JWT)
   * @param {string} token encoded JWT
   * @returns {Promise<any>} decoded token object
   * @throws {string} 'Missing Token' or 'Invalid Token'
   */
  verify = (token) => {
    if (!token) return Promise.reject(MISSING_TOKEN);

    const decodedToken = jwt.decode(token, { complete: true });
    const kid = decodedToken && decodedToken.header && decodedToken.header.kid;
    if (!kid) return Promise.reject(INVALID_TOKEN);

    return new Promise((resolve, reject) => {
      client.getSigningKey(kid, (err, key) => {
        if (err) return reject(INVALID_TOKEN);
        jwt.verify(token, key.getPublicKey(), (error, decoded) => (error ? reject(INVALID_TOKEN) : resolve(decoded)));
      });
    });
  };
}

module.exports = new TokenService();
