var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String, required: true, max: 32},
    password: {type: String, required: true, max: 32},
    email: {type: String, required: true, max: 64},
    isAdmin: {type: Boolean}
})

module.exports = mongoose.model('User', UserSchema);