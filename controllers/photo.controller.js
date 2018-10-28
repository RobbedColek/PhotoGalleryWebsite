const Photo = require('../models/photo.model');

exports.photo_upload = function (req, res) {
    console.log(req.file);
    let photo = new Photo (
        {
            user_id: req.body.user_id,
            name: req.body.name,
            description: req.body.description,
            image: req.file.path
        }
    );

    photo.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Photo uploaded successfully')
    })

};