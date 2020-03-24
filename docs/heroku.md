# Heroku

Log in or sign up at www.heroku.com.

## Creating a new deployment

Do this twice -- once for server, once for client.

1. Go to your Dashboard and click "New" + "Create new app".
   - Give it a good name then click "Create app".
   - `trending-news-{{client|server}}` are good name choices!
1. Once created, in app view, click "Deploy".
   - Choose the Heroku Git deployment method.
   - Follow the instructions.
     - Open a command terminal. Choose client or server directory.
     - We already have git repository. Skip `git init`.
     - Do this only once: `heroku git:remote -a {{app-name}}`.
     - We also already have commits. Skip `git add` and `git commit`.
     - Deploy! `git push heroku master`
1. Once deployed, go back to app view, click "Open App".
   - Public URL: `{{app-name}}-#####.herokuapp.com`.

## Execute a deployment

1. Create a `deploy` script in each `package.json`
   - `"deploy": "git push heroku master"`
1. Commit new code changes like you normally would.
1. When you want to deploy, just `npm run deploy` and let Heroku do the rest!

## Deploy & Connect with MongoDB

1. Go to your Dashboard and select the server app.
1. In app view, click "Resources".
1. In the "Add ons" section, type "mLab" and select "mLab MongoDB".
1. Choose the free "Sandbox" plan and click "Provision".
1. You just created a new MongoDB instance in the cloud!
1. Click the mLab add-on to view information about your deployed instance.
   - Explore. You can do all sorts of stuff here.
   - You can also direct connect to the cloud DB from your local machine.
1. Go back to app view, click "Settings".
   - Click "Reveal Config Vars"
   - Observe MONGODB_URI key-value pair. Heroku should use this as a `process.env` variable at build time. Read more about Heroku configuration variables [here](https://devcenter.heroku.com/articles/config-vars).
