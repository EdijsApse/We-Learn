const express = require('express');
const router = express.Router({ mergeParams: true });
const commentController = require('../controllers/commentController');
const { catchAsyncError } = require('../helpers/errorHandlers');
const { validateComment, isAuth } = require('../middlwares');

router.route('/')
    .post(isAuth, validateComment, catchAsyncError(commentController.create));

router.route('/:id')
    .delete(catchAsyncError(isAuth, commentController.delete));

module.exports = router;