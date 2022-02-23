var express = require('express');
var router = express.Router();

const { adminController } = require('../app/controllers');
const { userMiddleware } = require('../app/middleware');

/* GET users listing. */
router.get('/', userMiddleware.cekLogged, adminController.index);
router.get('/user', userMiddleware.cekLogged, adminController.user);
router.get('/fuser', userMiddleware.cekLogged, adminController.fuser);
router.get('/editUser', userMiddleware.cekLogged, adminController.editUser);
router.get('/destroyUser', userMiddleware.cekLogged, adminController.destroyUser);
router.post('/saveUser', userMiddleware.cekLogged, adminController.saveUser);
router.post('/updateUser', userMiddleware.cekLogged, adminController.updateUser);


module.exports = router;