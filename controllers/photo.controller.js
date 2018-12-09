const Photo = require('../models/photo.model');

exports.photo_upload = function (req, res) {
    console.log(req.file);
    let photo = new Photo (
        {
            user_id: req.body.user_id,
            name: req.body.name,
            description: req.body.description,
            image: req.file.path,
            rating: [],
            comments: []
        }
    );

    photo.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Photo uploaded successfully')
    })
};

exports.add_comment = function (req, res) {
   Photo.findByIdAndUpdate(req.params.id, { $push: { comments: req.body }},function (err, photo) {
        if (err) return next(err);
        res.send('Comment added');
    })
};

exports.add_rating = function (req, res) {
    Photo.findByIdAndUpdate(req.params.id, { $push: { rating: req.body }},function (err, photo) {
        if (err) return next(err);
        res.send('Rating added');
    })
};

exports.hide_comment = function (req, res) {
    //w ten sposob wyszukuje poprawnie
    /*Photo.findById(req.params.id, function (err, photo) {
        if (err) return next(err);
        res.send(photo.comments.find(x => x.id === "5c0c2fb2bcaf214130d59751"));
    })*/

    Photo.findByIdAndUpdate(req.params.id.comments.find(x => x.id === "5c0c2fb2bcaf214130d59751"), { $set: {isVisible: 0} },function (err, photo) {
        if (err) return next(err);
        res.send(photo);
    })
};
