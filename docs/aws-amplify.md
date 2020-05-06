# AWS Amplify

## Setup & Configuration

### AWS Account Configuration - [link](https://docs.amplify.aws/start/getting-started/installation/q/integration/react#option-2-follow-the-instructions)

1. `npm install -g @aws-amplify/cli`
1. `amplify configure`
   - Opens AWS browser login.
   - Specify AWS Region: `us-east-2` (Ohio)
   - Specify username of new IAM user: `amplify-YHr2G` (auto-generated)
   - Opens AWS browser to create new IAM user
     - Choose all default settings.
     - Download CSV file with AccessKeyId and SecretAccessKey values.
   - Specify accessKeyId: `*******`
   - Specify secretAccessKey: `******`
   - Specify Profile Name: `amplify`

### Initialize Amplify in React Project - [link](https://docs.amplify.aws/start/getting-started/setup/q/integration/react#initialize-a-new-backend)

1. `cd client`
1. `amplify init`
   - Specify a project name: `TrendingTopics`
   - Specify environment: `production`
   - Specify default editor: `Visual Studio Code`
   - Specify type of app: `javascript`
   - Specify javascript framework: `react`
   - Specify source directory path: `src`
   - Specify distribution directory path: `build`
   - Specify build command: `npm run-script build`
   - Specify start command: `npm run-script start`
   - Specify AWS profile: `Yes` and `amplify`
   - Generates an `amplify` folder with a collection of infrastructure-as-code json files.
     - Also adds a bunch of file names to `.gitignore`

### Code. Wire it up! - [link](https://docs.amplify.aws/start/getting-started/setup/q/integration/react#install-amplify-libraries)

1. `cd client`
1. `npm install --save aws-amplify`
1. Open `src/index.js` and add the following code:
   ```js
   import Amplify from 'aws-amplify';
   import awsExports from './aws-exports';
   Amplify.configure(awsExports);
   ```

## Authentication

### Connect Amplify to a Cognito User Pool

- **Option 1:** Add new Cognito User Pool - [link](https://docs.amplify.aws/start/getting-started/auth/q/integration/react)

  1. `cd client`
  1. `amplify add auth`
     - Specify configuration: `Default configuration`
     - Specify how users sign in: `Username`
     - Specify advanced configuration: `No, I am done.`
     - Creates & updates files in the `amplify` folder.
  1. `amplify push`
     - Actually creates the authentication resources in AWS (e.g., Cognito User Pool)

- **Option 2:** Reuse existing Cognito User Pool - [link](https://docs.amplify.aws/lib/auth/start/q/platform/js#re-use-existing-authentication-resource)

  - TODO

### Create Login UI

- **Option 1A:** Use pre-built UI components - [link](https://docs.amplify.aws/start/getting-started/auth/q/integration/react#create-login-ui)

  1. `cd client`
  1. `npm install --save @aws-amplify/ui-react`
  1. Open `src/App.js` and make the following code changes:

     ```js
     import { withAuthenticator } from 'aws-amplify-react';

     export default withAuthenticator(App);
     ```

- **Option 1B:** Customize pre-built UI components - [link](https://docs.amplify.aws/ui/auth/authenticator/q/framework/react)

  - TODO

- **Option 2:** Call Authentication APIs manually - [link](https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js)

  `Auth` has over 30 methods including `signUp`, `signIn`, `forgotPasword`, and `signOut` that allow you full control over all aspects of the user authentication flow. Check out the complete API [here](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html).

  1. Sign In

     ```js
     import { Auth } from 'aws-amplify';

     async function SignIn() {
       try {
         const user = await Auth.signIn(username, password);
       } catch (error) {
         console.log('error signing in', error);
       }
     }
     ```

  1. Sign Out

     ```js
     import { Auth } from 'aws-amplify';

     async function signOut() {
       try {
         await Auth.signOut();
       } catch (error) {
         console.log('error signing out: ', error);
       }
     }
     ```

  1. Sign Up

     ```js
     import { Auth } from 'aws-amplify';

     async function signUp() {
       try {
         const user = await Auth.signUp({
           username,
           password,
           attributes: {
             email, // optional
             phone_number, // optional - E.164 number convention
             // other custom attributes
           },
         });
         console.log({ user });
       } catch (error) {
         console.log('error signing up:', error);
       }
     }
     ```

  1. Current Autheticated User - [link](https://docs.amplify.aws/lib/auth/manageusers/q/platform/js#retrieve-current-authenticated-user)

     - This method can be used to check if a user is logged in when the page is loaded. It will throw an error if there is no user logged in.

     ```js
     import { Auth } from 'aws-amplify';

     async function autoSignIn() {
       const user = await Auth.currentAuthenticatedUser().catch(() => null);
       if (user) {
         // user is logged in, perform any user data fetching
       }
     }
     ```

  1. Current Session - [link](https://docs.amplify.aws/lib/auth/manageusers/q/platform/js#retrieve-current-session)

     - `Auth.currentSession()` returns a `CognitoUserSession` object which contains JWT `accessToken`, `idToken`, and `refreshToken`. This method will automatically refresh the `accessToken` and `idToken` if tokens are expired and a valid `refreshToken` presented. So you can use this method to refresh the session if needed.
     - This method should also be used to send JWT user tokens to a backend resource (e.g., API) for authentication verification needs.

     ```js
     import { Auth } from 'aws-amplify';

     async function callApi(endpoint) {
       const session = await Auth.currentSession().catch(() => null);
       if (session) {
         const headers = { authorization: session.getIdToken().getJwtToken() };
         // perform API call using endpoint and headers data
       }
     }
     ```

### Verify JWT for API endpoints - [link](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html)

- We must protect our API endpoints with the same authenication used in the client. The client must pass a user's `AccessToken` or `IdToken` via the Authorization header for all API calls. The server must verify the token is valid and unexpired before returning any protected user data.
- `jsonwebtoken` and `jwks-rsa` are excellent NPM packages to help accomplish this task.
- See `server/services/token.service.js` and `server/server.js` for implementation code.
