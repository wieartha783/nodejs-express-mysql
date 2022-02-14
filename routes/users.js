var express = require('express');

var router = express.Router();
const { userController } = require('../app/controllers');

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.get('/generateHash', userController.generatePassword);
router.get('/formsignup', (req, res) => {
  res.render('auth/signup', { title: process.env.TITLE, layout : false, req});
} );
router.post('/requestLogin', userController.userLogin);
router.post('/doSignUp', userController.signUp);
router.get('/getalluser', userController.getAllUser);

router.use('/', (req, res) => {
  res.send('404');
});

module.exports = router;
