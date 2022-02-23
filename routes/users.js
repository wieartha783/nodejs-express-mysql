var express = require('express');

var router = express.Router();
const { userController } = require('../app/controllers');
const { userMiddleware } = require('../app/middleware');

/* GET users listing. */
router.get('/', userMiddleware.cekLogged, userController.frontUser);
router.get('/endpoint', userMiddleware.cekLogged, userController.frontUser);

router.get('/generateHash', userController.generatePassword);
router.get('/formsignup', (req, res) => {
  res.render('auth/signup', { title: process.env.TITLE, layout : false, req});
} );
router.post('/requestLogin', userController.userLogin);
router.post('/doSignUp', userController.signUp);

//Getting data user with middleware (Callback used)
router.get('/getalluser', userMiddleware.cekLogged, userController.getAllUser);

router.use('/', (req, res) => {
  res.send('404');
});

module.exports = router;
