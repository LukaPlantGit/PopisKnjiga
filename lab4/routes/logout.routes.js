const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    user = undefined;

    res.redirect('/');
});

module.exports = router;