var express = require('express');

var router = express.Router();

const { authController } = require('../app/controllers');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('welcome/welcome', { title : process.env.TITLE});
});

router.get('/login', function(req, res) {
  res.render('auth/login', { title: process.env.TITLE, layout : false, req});
});

router.post('/doLogin', authController.dologin);
router.get('/logout', authController.logout);

module.exports = router;
