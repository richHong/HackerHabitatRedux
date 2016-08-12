module.exports = function(Sequelize) {
  var sequelize = new Sequelize('postgres://fwheybfahuoalr:44kVbWfUQVLQrEag5E3oAMfh2n@ec2-50-17-255-49.compute-1.amazonaws.com:5432/dcrrmheujtq3rq');

  return sequelize.define('User', {
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    username: Sequelize.STRING,
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    description: Sequelize.STRING,
    occupation: Sequelize.STRING,
    gen_interests: Sequelize.STRING,
    tech_interests: Sequelize.STRING,
    hometown: Sequelize.STRING,
    avatar: Sequelize.STRING
});
