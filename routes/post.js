const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { validatePost } = require('../middlwares');
const { catchAsyncError } = require('../helpers/errorHandlers');

router.route('/')
    .get(postController.index)
    .post(validatePost, catchAsyncError(postController.create));

router.route('/new')
    .get(postController.new);

router.route('/:id')
    .get(postController.show)
    .put(postController.update)
    .delete(postController.delete);

router.route('/:id/edit')
    .get(postController.edit);

module.exports = router;