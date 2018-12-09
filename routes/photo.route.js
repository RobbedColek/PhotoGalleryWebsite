const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
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

router.post('/upload', upload.single('image'), photo_controller.photo_upload);

router.put('/:id/add_comment', photo_controller.add_comment);

router.put('/:id/add_rating', photo_controller.add_rating);

router.put('/:id/hide_comment', photo_controller.hide_comment);

module.exports = router;