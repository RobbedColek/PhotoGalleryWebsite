var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let PhotoSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    name: {type: String, required: true},
    description: {type: String, required: false},
    image: {type: String, required: true},
    ratings: [{
        user_id: Schema.Types.ObjectId,
        rating: { type: Number, min: 1, max: 5 }
    }],
    comments: [{
        user_id: Schema.Types.ObjectId,
        comment: {type: String, required: true},
        isVisible: {type: Boolean, required: true}
    }]

})

module.exports = mongoose.model('Photo', PhotoSchema);