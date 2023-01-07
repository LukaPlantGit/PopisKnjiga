const express = require('express');
const router = express.Router();
// const { response } = require('express');
// const pool = require('../db');
// const queries = require('../src/knjiga/queries');
const controller = require('../src/knjiga/controller');

router.get('/', function (req, res, next) {
    // books = controller.getBooksForDownload();
    user = req.oidc.user;
    if(user === undefined) {
        res.render('home', {
            title: 'Home',
            user: undefined,
            linkActive: 'home'
        });
    } else {
        res.render('download', {
            title: 'Download files',
            user: req.oidc.user,
            books: controller.getBooksForDownload(),
            linkActive: 'user',
            err: undefined
        });
    }
});

module.exports = router;