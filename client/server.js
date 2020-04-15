const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

// redirect http to https on Heroku
app.use(function (req, res, next) {
  if (process.env.NODE_ENV !== 'production') return next();
  if (req.headers['x-forwarded-proto'] === 'https') return next();
  return res.redirect(301, `https://${req.hostname}${req.originalUrl}`);
});

app.use(express.static(path.join(__dirname, 'build')));

app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log('Server started...'));
