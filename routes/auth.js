const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateUser } = require('../middlwares');
const { catchAsyncError } = require('../helpers/errorHandlers');

router.route('/login')
    .post(authController.login)
    .get(authController.renderLogin);

router.route('/register')
    .post(validateUser, catchAsyncError(authController.register))
    .get(authController.renderRegister);

router.route('/logout')
    .post(authController.logout);

module.exports = router;