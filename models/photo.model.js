var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let PhotoSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    name: {type: String, required: true},
    description: {type: String, required: false},
    image: {type: String, required: true},
    rating: [{
        user_rating_id: Schema.Types.ObjectId,
        rate: { type: Number, min: 1, max: 5 }
    }],
    comments: [{
        user_comment_id: Schema.Types.ObjectId,
        comment: {type: String, required: true},
        is_Visible: {type: Boolean, required: true}
    }]

})

module.exports = mongoose.model('Photo', PhotoSchema);