const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    user = req.oidc.user;
    res.render('home', {
        title: 'Home',
        linkActive: 'home'
    });
});

module.exports = router;