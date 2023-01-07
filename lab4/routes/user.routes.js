const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    user = req.oidc.user;
    if(user === undefined) {
        res.render('home', {
            title: 'Home',
            user: undefined,
            linkActive: 'home'
        });
    } else {
        res.render('user', {
            title: 'User profile',
            user: req.oidc.user,
            linkActive: 'user',
            err: undefined
        });
    }
});

module.exports = router;