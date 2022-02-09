var express = require('express');

var router = express.Router();
const { userController } = require('../app/controllers');

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.get('/generateHash', userController.generatePassword);
router.post('/requestLogin', userController.userLogin);

router.use('/', (req, res) => {
  res.send('404');
});

module.exports = router;
