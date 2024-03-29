const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
// const spdy = require("spdy");
// const fs = require("fs");
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const keys = require('./config/keys');

require('./models/User');
require('./models/Song');
require('./services/cache');

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();
app.use(
  helmet()
  //   {
  //   referrerPolicy: {
  //     policy: 'strict-origin-when-cross-origin',
  //   },
  // }
);
app.use(compression());
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  // Enable reverse proxy support in Express. This causes the
  // the "X-Forwarded-Proto" header field to be trusted so its
  // value can be used to determine the protocol. See
  // http://expressjs.com/api#app-settings for more details.
  app.enable('trust proxy');

  // Add a handler to inspect the req.secure flag (see
  // http://expressjs.com/api#req.secure). This allows us
  // to know whether the request was via http or https.
  app.use(function (req, res, next) {
    if (req.secure) {
      // request was via https, so do no special handling
      next();
    } else {
      // request was via http, so redirect to https
      res.redirect('https://' + req.headers.host + req.url);
    }
  });
}
app.get('/test', (req, res) => {
  console.log(req.secure);
  console.log(process.env.NODE_ENV);
  res.send({ hi: 'there' });
});

//route handler
require('./routes/songRoutes')(app);
require('./routes/userRoutes')(app);

//grab index.html generated by build
if (['production', 'ci'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// const options = {
//   key: fs.readFileSync(__dirname + "/keys/server.key"),
//   cert: fs.readFileSync(__dirname + "/keys/server.crt"),
//   ca: fs.readFileSync(__dirname + "/keys/server.csr")
// };

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(PORT);
});

// spdy.createServer(options, app).listen(PORT, error => {
//   if (error) {
//     console.error(error);
//     return process.exit(1);
//   } else {
//     console.log("Listening on port: " + PORT + ".");
//   }
// });
