var express = require('express');

var router = express.Router();

const { authController } = require('../app/controllers');
const { userMiddleware } = require('../app/middleware');


/* GET home page. */
router.get('/', userMiddleware.cekLogged ,function(req, res) {
  res.render('welcome/welcome', { title : process.env.TITLE});
});

router.get('/login', function(req, res) {
  res.render('auth/login', { title: process.env.TITLE, layout : false, req});
});

router.post('/doLogin', authController.dologin);
router.get('/logout', authController.logout);

module.exports = router;
