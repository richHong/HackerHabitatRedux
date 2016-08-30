'use strict';
var express      = require('express'),
    path         = require('path'),
    httpProxy    = require('http-proxy'),
    favicon      = require('serve-favicon'),
    publicPath   = path.resolve(__dirname, 'public'),
    bodyParser   = require('body-parser'),
    isProduction = process.env.NODE_ENV === 'production',
    port         = isProduction ? process.env.PORT : 3000,
    multiparty   = require('connect-multiparty'),
    helmet       = require('helmet'),
    fetch        = require('isomorphic-fetch'),
    mongoose     = require('mongoose'), 
    Twitter      = require('twitter');

if (!isProduction){
  var config = require('./config.js');
}

var UserController    = require('./db/controllers/userController.js'),
    ListingController = require('./db/controllers/listingController.js');

var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});

var app = express();

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(helmet());
app.use(multiparty());
app.use(favicon(__dirname + '/public/assets/black-house.ico'));

require('./server/S3ListingsMiddleware.js')(app);
require('./server/S3AvatarMiddleware.js')(app);

mongoose.connect(process.env.mongoURI || config.mongo_URI);

var client = new Twitter({
  consumer_key: process.env.twitter_consumer_key || config.twitter_consumer_key,
  consumer_secret: process.env.twitter_consumer_secret || config.twitter_consumer_secret,
  access_token_key: process.env.twitter_access_token_key || config.twitter_access_token_key,
  access_token_secret: process.env.twitter_access_token_secret || config.twitter_access_token_secret
});

app.route('/email')
 .post(function(req, res, err) {
    fetch("https://api.sendgrid.com/v3/mail/send", {
      "method": "POST",
      "headers": {
          "authorization": process.env.sendgridAuth || config.sendgridAuth,
          "content-type": "application/json",
          "cache-control": "no-cache",
          "postman-token": process.env.sendgridToken || config.sendgridToken
      },
      "body": JSON.stringify(req.body)
  }).then((response, req) => {
    res.status(response.status).send(response)});
  });

app.route('/twitter')
  .get(function(req, res){
    var params = {
      q: 'hacker houses',
      count: 30
    };
    client.get('https://api.twitter.com/1.1/search/tweets.json', params, function(error, tweets, response) {
      if (!error) {
        res.send(tweets);
      }
    });
  })

app.route('/v1/users')
  .post(UserController.signUpUser)
  .get(UserController.checkAuth, UserController.getAllUsers);

app.route('/v1/users/signin')
  .post(UserController.signInUser);

app.route('/v1/users/:userId')
  .get(UserController.getUserById)
  .put(UserController.checkAuth, UserController.updateUser);

app.route('/v1/listings')
  .get(ListingController.getAllListings)
  .post(UserController.checkAuth, ListingController.createListing);

app.get('/v1/listings/:userId', UserController.checkAuth, ListingController.getListingsById);
 
app.get('/v1/listings/city/:city', ListingController.getListingsByCity);

app.get('/v1/listings/house/:house_name', ListingController.getListingsByName);

//server/compiler.js runs webpack-dev-server which creates the bundle.js which index.html serves
//will not see a physical bundle.js because webpack-dev-server runs it from memory

if (!isProduction) {
  var bundle = require('./server/compiler.js');
  bundle();
  app.all('/build/*', function(req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });
}

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function() {
  console.log('Server running on port ' + port);
});
