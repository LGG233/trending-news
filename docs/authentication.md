# Authentication

This application uses [AWS Cognito](https://docs.aws.amazon.com/cognito/index.html) for authenticating users.

## How it works

1. A user will sign up and log in via an external AWS-hosted UI.
1. Upon successful login, the user will be redirected back to this application's client site with an authorization code appended to the URL as a query param `code=sdfpoi234lkjo23k`.
1. The client application uses this authorization code to generate a temporary access token that is stored in the user's browser local storage.
1. This access token is then used to authenticate subsequent API calls for user data via an Authorization header.
1. If the user closes the browser and refreshes the page, the client appliction is smart enough to retry the existing access token in the browser storage before asking the user to login again. An access token is valid for 1 hour.

## AWS Cognito Resources

- [User Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html)
- [Auth API Endpoints](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-userpools-server-contract-reference.html)
