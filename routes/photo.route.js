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

const upload = multer({storage: storage});

const photo_controller = require('../controllers/photo.controller');

router.post('/upload', upload.single('image'), photo_controller.photo_upload);

module.exports = router;