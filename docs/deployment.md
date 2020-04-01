# Deployment

Deployments are done using [Heroku](https://www.heroku.com). Log in or sign up!

## Executing a deployment

As new changes are committed to the `master` branch, we can deploy those changes to Heroku.

- **API** = `cd server && npm run deploy`
- **Web Client** = `cd client && npm run deploy`

## Creating a new deployment

Heroku offers two ways to setup & manage deployment applications: [Heroku CLI](https://devcenter.heroku.com/categories/command-line) and [Heroku Web Dashboard](https://dashboard.heroku.com/apps). Chances are that you'll use both means to accomplish a variety of deployment activities.

In order to use the CLI, [download it](https://devcenter.heroku.com/articles/heroku-cli) and then log in with `heroku login`.

### API

1. Create a new app.
   - Go to your [Dashboard](https://dashboard.heroku.com/apps). Click "New" + "Create new app".
   - Give it a good name, like `trending-news-api`, then click "Create app". The app name will be the subdomain of the public URL: `{{API_APP_NAME}}.herokuapp.com`.
1. Add the **NodeJS** buildpack.
   - Open the new app you just created. Go to "Settings".
   - Find the "Buildpacks" section. Click "Add buildpack".
   - Select the **NodeJS** official buildpack. Save changes.
1. Create a MongoDB cloud instance & connect it to the deployed API.
   - Open the app in your Dashboard. Go to "Resources".
   - Find the "Add-ons" section. Type "mLab" and select "mLab MongoDB".
   - Choose the free "Sandbox" plan and click "Provision".
   - Go to "Settings". Find the "Config Vars" section. Click "Reveal Config Vars"
   - Verify `MONGODB_URI` key-value pair exists. Heroku will use this as a `process.env` variable at build time to connect to the MongoDB cloud instance you just created.
   - Back in VSCode, open `server/database/index.js` and add logic to use the MongoDB URI environment variable when creating the database connection.
     ```
     const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/{{DB_NAME}}';
     ```
1. Let Heroku choose the PORT number.
   - We get to choose our own local server port (8080). Heroku chooses its own port (which we must respect) and exposes it as an environment variable.
   - In VSCode, open `server/server.js` and add the following:
     ```
     const PORT = process.env.PORT || 8080;
     ```
1. Enable CORS (cross-origin resource sharing)

   - Web browsers, by default, block cross-domain requests as a standard security protocol. Enabling CORS on the API server instructs the web browser to permit cross-domain requests made to the API.
   - Install [cors](https://github.com/expressjs/cors#readme).
     ```
     cd server && npm install cors --save
     ```
   - Open `server/server.js` and add the following below. We'll specify more advanced configuration later; for now, this will do the trick!

     ```
     const cors = require('cors');

     app.use(cors());
     ```

1. Add a `deploy` script to `server/package.json`
   - Open the app in your Dashboard. Go to "Settings".
   - Find the "App Information" section. Copy the Heroku git URL: `https://git.heroku.com/{{APP_NAME}}.git`
   - Back in VSCode, add the deploy script to the server's `package.json`.
     ```
     "deploy": "git push https://git.heroku.com/{{APP_NAME}}.git master"
     ```

### Web Client

1. Create a new app.
   - Go to your [Dashboard](https://dashboard.heroku.com/apps). Click "New" + "Create new app".
   - Give it a good name, like `trending-news-client`, then click "Create app". The app name will be the subdomain of the public URL: `{{CLIENT_APP_NAME}}.herokuapp.com`.
1. Add the **NodeJS** buildpack.
   - Open the new app you just created. Go to "Settings".
   - Find the "Buildpacks" section. Click "Add buildpack".
   - Select the **NodeJS** official buildpack. Save changes.
1. Use Express to serve a production build.

   - Unfortunately, `react-scripts` is not customizable. The default port is 3000 for the `start` command. Heroku will choose its own port number. As a result, we need to serve the app ourselves (using Express) so that we can allow Heroku to set the port for us. The silver lining here is we're forced to create a production build which adds other benefits and improvements to our deployed web client application.
   - In VSCode, install Express.
     ```
     cd client && npm install express --save
     ```
   - Create a new file `server.js` inside the `client` folder. Add the following code below.

     ```
     const express = require('express');
     const path = require('path');
     const port = process.env.PORT || 3000;
     const app = express();

     app.use(express.static(path.join(__dirname, 'build')));

     app.get(/.*/, function(req, res) {
       res.sendFile(path.join(__dirname, 'build', 'index.html'));
     });

     app.listen(port, () => console.log('Server started...'));
     ```

   - Add a production start script to `client/package.json`.
     ```
     "start:prod": "node server.js"
     ```
   - Verify the production build & server works locally. Run the following command, then open http://localhost:3000.
     ```
     cd client && npm run build && npm run start:prod
     ```

1. Connect the Web Client app to the API app.

   - Open the app in your Dashboard. Go to "Settings".
   - Find the "Config Vars" section. Click "Reveal Config Vars".
   - Add a new key-value pair.
     ```
     Key: REACT_APP_API_URL   Value: https://{{API_APP_NAME}}.herokuapp.com
     ```
   - API call configuration can grow over time and become overwhelmingly redundant. It's good practice to create an `ApiService` utility that abstracts away this configuration from React Components and makes it easier to implement new API calls.
   - Back in VSCode, create a new folder `services` within `client/src`.
   - Create a new file `api.service.js` within `client/src/services` and add the following code below.

     ```
     import Axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

     /**
      * @type {string}
      */
     const API = process.env.REACT_APP_API_URL || "http://localhost:8080";

     /**
      * @template T
      * @param {Method} method
      * @param {string} url
      * @param {AxiosRequestConfig} config
      * @returns {Promise<AxiosResponse<T>>}
      */
     function request(method, url, config) {
       return Axios.request({ method, url: `${API}/${url}`, ...config });
     }

     class ApiService {
       /**
        * @template T
        * @param {string} url
        * @param {AxiosRequestConfig} config
        * @returns {Promise<AxiosResponse<T>>}
        */
       get = (url, config) => request("get", url, config);

       /**
        * @template T
        * @param {string} url
        * @param {any} data
        * @param {AxiosRequestConfig} config
        * @returns {Promise<AxiosResponse<T>>}
        */
       post = (url, data, config) => request("post", url, { data, ...config });
     }

     export default ApiService = new ApiService();
     ```

   - Create a new file `index.js` within `client/src/services` and add the following code below.

     ```
     import ApiService from "./api.service";

     export { ApiService };
     ```

   - Replace all instances of `axios.get()` and `axios.post()` in the application with `ApiService.get()` and `ApiService.post()`, respectively.
     - Import the `ApiService` from the `index.js` file. Example: `import { ApiService } from '../services';`
     - Additionally, remove all `/` prefixes on routes defined in these API call methods. Example: `/user/` should be `user/`.
   - Delete the `"proxy"` configuration from `client/package.json`. We don't need it anymore!
   - Verify local development of the full stack still works!

1. Add a `deploy` script to `client/package.json`
   - Open the app in your Dashboard. Go to "Settings".
   - Find the "App Information" section. Copy the Heroku git URL: `https://git.heroku.com/{{APP_NAME}}.git`
   - Add the deploy script to the client's `package.json`.
     ```
     "deploy": "git push https://git.heroku.com/{{APP_NAME}}.git master"
     ```

### Monorepo - additional configuration

Heroku's fundamental architecture assumes one Git repository per application. A [monorepo](./repository.md) breaks this assumption. As a result, we have to do some extra configuration work before we can deploy our applications.

Heroku is going to search the root folder of our monorepo for a `package.json` file and perform `npm install` followed by `npm start`. We're going to hook into these access points and redirect Heroku to each application.

1. In VSCode, create a `scripts` folder at the root. Inside this folder, create two new files: `install` and `start`. These files will be Linux Shell scripts that will be executed on the Heroku servers.
1. Open `scripts/install` and add the following:

   ```
   #!/bin/sh -e

   if [ "$BUILD_ENV" = "server" ]; then
     cd server; npm install;
   elif [ "$BUILD_ENV" = "client" ]; then
     cd client; npm install; npm run build;
   fi
   ```

1. Open `scripts/start` and add the following:

   ```
   #!/bin/sh -e

   if [ "$BUILD_ENV" = "server" ]; then
     cd server; npm start;
   elif [ "$BUILD_ENV" = "client" ]; then
     cd client; npm run start:prod;
   fi
   ```

1. Back in your Heroku Dashboard, add a `BUILD_ENV` configuration variable to both the API and Web Client applications.
   - **API** -- Go to "Settings". Find the "Config Vars" section. Click "Reveal Config Vars". Add a new key-value pair.
     ```
     Key: BUILD_ENV   Value: server
     ```
   - **Web Client** -- Go to "Settings". Find the "Config Vars" section. Click "Reveal Config Vars". Add a new key-value pair.
     ```
     Key: BUILD_ENV   Value: client
     ```
1. Back in VSCode, add the following scripts to the root `package.json`. The `chmod +x` command makes the Shell script executable before attempting to execute it! _Note: Unfortunately, this cannot be tested locally on Windows since these are Linux shell scripts._
   ```
   "install": "chmod +x ./scripts/install && ./scripts/install",
   "start": "chmod +x ./scripts/start && ./scripts/start"
   ```
