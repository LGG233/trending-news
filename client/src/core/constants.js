import { base64encode } from './utils';

const AWS_COGNITO_BASE_URL = process.env.REACT_APP_AWS_COGNITO_BASE_URL;
const AWS_COGNITO_CLIENT_ID = process.env.REACT_APP_AWS_COGNITO_CLIENT_ID;
const AWS_COGNITO_CLIENT_SECRET = process.env.REACT_APP_AWS_COGNITO_CLIENT_SECRET;
export const AWS_COGNITO_LOGIN_REDIRECT_URL = process.env.REACT_APP_AWS_COGNITO_REDIRECT_URL_LOGIN;
const AWS_COGNITO_LOGOUT_REDIRECT_URL = process.env.REACT_APP_AWS_COGNITO_REDIRECT_URL_LOGOUT;

export const AUTH_TOKEN = base64encode(`${AWS_COGNITO_CLIENT_ID}:${AWS_COGNITO_CLIENT_SECRET}`);
export const TOKEN_URL = `${AWS_COGNITO_BASE_URL}/oauth2/token`;

export const SIGNUP_URL = `${AWS_COGNITO_BASE_URL}/signup?client_id=${AWS_COGNITO_CLIENT_ID}&response_type=code&scope=openid+profile&redirect_uri=${AWS_COGNITO_LOGIN_REDIRECT_URL}`;
export const LOGIN_URL = `${AWS_COGNITO_BASE_URL}/login?client_id=${AWS_COGNITO_CLIENT_ID}&response_type=code&scope=openid+profile&redirect_uri=${AWS_COGNITO_LOGIN_REDIRECT_URL}`;
export const LOGOUT_URL = `${AWS_COGNITO_BASE_URL}/logout?client_id=${AWS_COGNITO_CLIENT_ID}&logout_uri=${AWS_COGNITO_LOGOUT_REDIRECT_URL}`;

export const ACCESS_TOKEN_STORAGE_KEY = 'access-token-aws-cognito';
