# Environment Variables

In order to run the client & server apps locally, you must create and maintain a `.env` file at the root-level of both directories with the following environment variables. These files are not under Git source control for security reasons; you'll have to obtain the values needed for these variables from another developer on the project.

## Client

```
REACT_APP_AWS_PROJECT_REGION=dummy
REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID=dummy
REACT_APP_AWS_COGNITO_REGION=dummy
REACT_APP_AWS_USER_POOLS_ID=dummy
REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID=dummy
```

## Server

```
AWS_AUTH_JWKS_URL=dummy
```
