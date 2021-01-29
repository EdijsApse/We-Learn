const express = require('express');
const router = express.Router({ mergeParams: true });
const commentController = require('../controllers/commentController');
const { catchAsyncError } = require('../helpers/errorHandlers');
const { validateComment } = require('../middlwares');

router.route('/')
    .post(validateComment, catchAsyncError(commentController.create));

router.route('/:id')
    .delete(catchAsyncError(commentController.delete));

module.exports = router;