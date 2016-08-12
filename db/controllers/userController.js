var Sequelize = require('sequelize'),
    sequelize = new Sequelize('postgres://fwheybfahuoalr:44kVbWfUQVLQrEag5E3oAMfh2n@ec2-50-17-255-49.compute-1.amazonaws.com:5432/dcrrmheujtq3rq'),
    User = require('../models/userModel'),
    user = new User(Sequelize);

exports.create = function(req, res) {
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

user
  .sync({ force: true })
  .complete(function(err) {
    user
      .create(user)
      .complete(function(err, account) {
        if(!!err || !account) {
          console.log('An error occurred while creating account.');
          console.log(err.message)
          res.status(500).end();
        } else {
          console.log('Account ' + account.id + ' successfully created.');
          res.send(account);
        }
    });
  });
};

exports.getById = function(req, res) {
  user
    .find({ where: { id: req.params.accountId } })
    .complete(function(err, account) {
      if(!!err) {
        console.log('An error occurred while searching for account ' + req.params.accountId);
        res.status(500).end();
      } else if(!account) {
        console.log('No account found for id ' + req.params.accountId);
        res.status(404).end();
      } else {
        console.log('Account located for id ' + req.params.accountId);
        res.send(account);
      }
    });
};