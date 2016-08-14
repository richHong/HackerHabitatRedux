var mongoose = require('mongoose');

var TokenSchema = new mongoose.Schema({
    user_id: Number,
    access_token: String,
    token_type: String,
    expires_at: Date,
    ip_address: String
}); 

module.exports = mongoose.model('Token', TokenSchema);
