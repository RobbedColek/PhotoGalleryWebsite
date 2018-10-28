var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let PhotoSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    name: {type: String, required: true},
    description: {type: String, required: false},
    image: {type: String, required: true}
})

module.exports = mongoose.model('Photo', PhotoSchema);