const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

router.get('/:id', isAuthenticated, user_controller.user_details);

router.post('/create', isAuthenticated, user_controller.user_create);

router.put('/:id/update', isAuthenticated, user_controller.user_update);

router.delete('/:id/delete', isAuthenticated, user_controller.user_delete);

module.exports = router;