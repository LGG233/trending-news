# Environment Variables

In order to run the client & server apps locally, you must create and maintain a `.env` file at the root-level of both directories with the following environment variables. These files are not under Git source control for security reasons; you'll have to obtain the values needed for these variables from another developer on the project.

## Client

```
REACT_APP_AWS_COGNITO_BASE_URL=dummy
REACT_APP_AWS_COGNITO_CLIENT_ID=dummy
REACT_APP_AWS_COGNITO_CLIENT_SECRET=dummy
REACT_APP_AWS_COGNITO_REDIRECT_URL_LOGIN=dummy
REACT_APP_AWS_COGNITO_REDIRECT_URL_LOGOUT=dummy
```

## Server

```
AWS_COGNITO_BASE_URL=dummy
```
