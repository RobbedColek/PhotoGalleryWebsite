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
    Photo.findByIdAndUpdate(req.params.id, { $push: { "comments": {user_id: req.body.user_id, comment: req.body.comment,
                isVisible: req.body.isVisible}}}, {safe: true, upsert: true, new: true}, function (err) {
        if (err) return next(err);
        res.send('Comment added');
    })
};

exports.add_rating = function (req, res) {
    Photo.findByIdAndUpdate(req.params.id, { $push: { "ratings": {user_id: req.body.user_id, rating: req.body.rating}}},
                {safe: true, upsert: true, new: true}, function (err) {
        if (err) return next(err);
        res.send('Rating added');
    })
};

exports.hide_comment = function (req, res) {
    Photo.findById(req.params.id, function (err, photo) {
        if (err) return next(err);
        let comment = photo.comments.find(x => x.id === req.body.id);
        comment.isVisible = req.body.isVisible;

        photo.save(function (err) {
            if (err) {
                return next(err);
            }
            res.send('Comment hidden');
        })
    })
};