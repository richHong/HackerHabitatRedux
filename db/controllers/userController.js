var userModel = require('../models/userModel.js'),
    Q = require('q'),
    jwt  = require('jwt-simple'),
    url = require('url');

exports.signUpUser = function(req, res, next) {
  var username  = req.body.username,
      password  = req.body.password,
      email = req.body.email,
      create = Q.nbind(userModel.create, userModel),
      findOne = Q.nbind(userModel.findOne, userModel),
      newUser = {
        email: email,
        password: password,
        username: username
      },
      user_id,
      id;

  findOne({username: username})
    .then(function(user) {
      if (user) {
        next(new Error('User already exist!'));
      } else {
        return create(newUser);
      }
    })
    .then(function (user) {
      var token = jwt.encode(user, 'secret');
      user_id = user._id;
      id = user._id;
      res.json({
                token: token,
                user_id: user_id,
                id: id
              });
    })
    .fail(function (error) {
      next(error);
    });
};

exports.signInUser = function(req, res, next) {
  var username = req.body.username,
      password = req.body.password,
      user_id,
      id;

  var findUser = Q.nbind(userModel.findOne, userModel);

  findUser({username: username})
    .then(function (user) {
      if (!user) {
        next(new Error('User does not exist'));
      } else {
        user_id = user._id;
        id = user._id;
        return user.comparePasswords(password)
          .then(function(foundUser) {
            if (foundUser) {
              var token = jwt.encode(user, 'secret');
              res.json({
                token: token,
                user_id: user_id,
                id: id
              });
            } else {
              return next(new Error('No user'));
            }
          });
      }
    })
    .fail(function (error) {
      res.send(error);
    });
};

exports.updateUser = function(req, res, next) {
  var user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    description: req.body.description,
    occupation: req.body.occupation,
    gen_interests: req.body.gen_interests,
    tech_interests: req.body.tech_interests,
    hometown: req.body.hometown,
    avatar: req.body.avatar
  };

  userModel.update({ _id: req.params.userId }, user, function(err, newUser){
    if (err){ 
      console.log('Error in updating. ', err);
    } else {
      res.send('User ' + newUser.username + ' has been updated.');
    } 
  });
};

exports.getAllUsers = function(req, res, next) {
  userModel.find(function(err, data){
    if (err){
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

exports.checkAuth = function(req, res, next){
  
  var queryData = url.parse(req.url, true).query;
  var token = queryData.access_token;

    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
     
      var findUser = Q.nbind(userModel.findOne, userModel);
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            next();
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
};

exports.getUserById = function(req, res, next){
  var user_id = req.params.userId,
  findOne = Q.nbind(userModel.findOne, userModel);

  findOne({_id: user_id})
  .then(function(user){
    if (user){
      var body = {
        _id: user._id,
        avatar: user.avatar,
        description: user.description,
        first_name: user.first_name,
        gen_interests: user.gen_interests,
        hometown: user.hometown,
        last_name: user.last_name,
        occupation: user.occupation,
        tech_interests: user.tech_interests,
        username: user.username
      };
      res.send(body);
    }
  });
};