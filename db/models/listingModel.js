var mongoose = require('mongoose');

var ListingSchema = new mongoose.Schema({
    email: String,
    user_id: Number,
    house_name: {
        type: String,
        required: true,
        unique: true
    },
    heading: String,
    street_add: String,
    city: String,
    state: String,
    zipcode: String,
    lat: String,
    lng: String,
    price: Number,
    dates_avail: String,
    house_interests: String,
    house_mission: String,
    house_rules: String,
    vacancies: Number,
    primary_member: String,
    amenities: String,
    pic1: String,
    pic2: String,
    pic3: String,
    pic4: String,
    pic5: String
}); 

module.exports = mongoose.model('Listing', ListingSchema);
