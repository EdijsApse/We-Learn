const express = require('express');
const router = express.Router({ mergeParams: true });
const commentController = require('../controllers/commentController');
const { catchAsyncError } = require('../helpers/errorHandlers');
const { validateComment, isAuth, canDeleteComment } = require('../middlwares');

router.route('/')
    .post(isAuth, validateComment, catchAsyncError(commentController.create));

router.route('/:id')
    .delete(isAuth, catchAsyncError(canDeleteComment), catchAsyncError(commentController.delete));

module.exports = router;