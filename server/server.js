require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 8080;
require('./database');
// route requires
const { TokenService } = require('./services');
const user = require('./routes/user');
const pubs = require('./routes/pubs');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// authenticate all routes
app.use(async (req, res, next) =>
  TokenService.verify(req.headers.authorization).then(
    (decodedToken) => {
      req.user = decodedToken;
      next();
    },
    (error) => {
      res.status(401).json(error);
      next(error);
    }
  )
);

// routes
app.use('/user', user);
app.use('/pubs', pubs);

// starting server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
