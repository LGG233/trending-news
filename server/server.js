const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session")
const app = express();
const PORT = 8080;
const dbConnection = require('./database')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
// route requires
const user = require('./routes/user')

// Middleware
app.use(morgan('dev'));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(bodyParser.json())

// Sessions
app.use(
    session({
        secret: 'the-rain-in-spain',
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false,
        saveUninitialized: false
    })
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls serializeUser and deserializeUser

// routes
app.use('/user', user)

// starting server
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)
})