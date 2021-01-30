const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateUser, canAuth, isAuth } = require('../middlwares');
const { catchAsyncError } = require('../helpers/errorHandlers');

router.route('/login')
    .post(canAuth, authController.login)
    .get(canAuth, authController.renderLogin);

router.route('/register')
    .post(canAuth, validateUser, catchAsyncError(authController.register))
    .get(canAuth, authController.renderRegister);

router.route('/logout')
    .post(isAuth, authController.logout);

module.exports = router;