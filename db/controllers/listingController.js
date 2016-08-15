var listingModel = require('../models/listingModel.js'),
    Q = require('q');

exports.getAllListings = function(req, res, next) {
  var find = Q.nbind(listingModel.find, listingModel);

  find(function(houses){
    res.send(houses);
  });

};

exports.createListing = function(req, res, next) {
  var create = Q.nbind(listingModel.create, listingModel),
      findOne = Q.nbind(listingModel.findOne, listingModel),
      house_name = req.body.house_name,
      newHouse = {
        email: req.body.email,
        user_id: req.body.user_id,
        house_name: house_name,
        heading: req.body.heading,
        street_add: req.body.street_add,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        lat: req.body.lat,
        lng: req.body.lng,
        price: req.body.price,
        dates_avail: req.body.dates_avail,
        house_interests: req.body.house_interests,
        house_mission: req.body.house_mission,
        house_rules: req.body.house_rules,
        vacancies: req.body.vacancies,
        primary_member: req.body.primary_member,
        amenities: req.body.amenities,
        pic1: req.body.pic1,
        pic2: req.body.pic2,
        pic3: req.body.pic3,
        pic4: req.body.pic4,
        pic5: req.body.pic5
      };

  findOne({house_name: house_name})
    .then(function(house) {
      if (house) {
        next(new Error('House already exist!'));
      } else {
        return create(newHouse);
      }
    })
    .then(function (house) {
      res.json(house);
    })
    .fail(function (error) {
      next(error);
    });
};

exports.getListingsById = function(req, res, next) {
  var user_id = req.params.userID;
  var find = Q.nbind(listingModel.find, listingModel);

  find({user_id: user_id})
    .then(function(houses) {
      res.send(houses);
    });

};

exports.getListingsByCity = function(req, res, next) {
  var city = req.params.city.replace(/:/, '');
  var find = Q.nbind(listingModel.find, listingModel);

  find({city: city})
    .then(function(houses) {
      res.send(houses);
    });
};

exports.getListingsByName = function(req, res, next) {
  var house_name = req.params.house_name.replace(/:/, '');
  var findOne = Q.nbind(listingModel.findOne, listingModel);

  findOne({house_name: house_name})
    .then(function(house) {
      res.send(house);
    });
}