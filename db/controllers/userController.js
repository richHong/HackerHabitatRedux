var userModel = require('../models/userModel.js'),
    Q = require('q'),
    jwt  = require('jwt-simple');

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
      user_id = user._id;
      id = user._id;
      if (!user) {
        next(new Error('User does not exist'));
      } else {
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
      next(error);
    });
};

exports.updateUser = function(req, res, next) {
  var user = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    description: req.body.description,
    occupation: req.body.occupation,
    gen_interests: req.body.gen_interests,
    tech_interests: req.body.email,
    hometown: req.body.email,
    avatar: req.body.email
  };

  userModel.update({_id:req.body._id}, user, function(err, newUser){
    if (err){ 
      console.log(err);
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
  var token = req.headers['x-access-token'];
  console.log('This is the token', req);
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            // res.send(200);
            next(req, res);
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
      res.send(user);
    }
  });
};