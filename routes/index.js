var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('welcome/welcome', { title : process.env.TITLE});
});

router.get('/login', function(req, res) {
  res.render('auth/login', { title: process.env.TITLE, layout : false});
});

module.exports = router;
