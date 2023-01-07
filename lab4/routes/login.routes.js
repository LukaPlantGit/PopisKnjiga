const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('login', {
        title: 'Login',
        linkActive: 'login',
        user: req.oidc.user,
        err: undefined
    });
});

module.exports = router;