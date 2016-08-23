'use strict';
var express = require('express'),
    path = require('path'),
    httpProxy = require('http-proxy'),
    favicon = require('serve-favicon'),
    publicPath = path.resolve(__dirname, 'public'),
    bodyParser = require('body-parser'),
    isProduction = process.env.NODE_ENV === 'production',
    port = isProduction ? process.env.PORT : 3000,
    multiparty = require('connect-multiparty'),
    helmet = require('helmet'),
    fetch = require('isomorphic-fetch'),
    mongoose = require('mongoose');

var UserController = require('./db/controllers/userController.js'),
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

mongoose.connect(process.env.mongoURI);

app.route('/email')
   .post(function(req, res, err) {
        fetch("https://api.sendgrid.com/v3/mail/send", {
            "method": "POST",
            "headers": {
                "authorization": "Bearer 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",
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "d1d73c00-90fc-fcb0-1246-d7f416a65443"
            },
            "body": JSON.stringify(req.body)
    }).then((response, req) => {
        res.status(response.status).send(response)});
    });

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
