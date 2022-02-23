const tutorials = require('../controllers/tutorialController');
const generate64 = require('../controllers/base64generate');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

module.exports ={
	tutorials,
	generate64,
	userController,
	authController,
	adminController
};