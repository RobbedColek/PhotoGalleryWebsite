const express = require('express');
const router = express.Router();
const multer = require('multer');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + '-' + Date.now()+ '.' + extension)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else
        cb(new Error('Invalid filetype'), false);
};

const upload = multer({storage: storage, fileFilter: fileFilter, limits: {fileSize: 1024 * 1024 * 5, files: 1} });

const photo_controller = require('../controllers/photo.controller');

router.post('/upload', isAuthenticated, upload.single('image'), photo_controller.photo_upload);

router.get('/:id/getDetails', isAuthenticated, photo_controller.getDetails);

router.get('/:id/getPhoto', isAuthenticated, photo_controller.getPhoto);

router.put('/:id/add_comment', isAuthenticated, photo_controller.add_comment);

router.put('/:id/add_rating', isAuthenticated, photo_controller.add_rating);

router.put('/:id/hide_comment', isAuthenticated, photo_controller.hide_comment);

router.delete('/:id/deletePhoto', isAuthenticated, photo_controller.deletePhoto);

module.exports = router;