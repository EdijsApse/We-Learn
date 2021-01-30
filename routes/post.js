const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { validatePost, isAuth, canDeletePost } = require('../middlwares');
const { catchAsyncError } = require('../helpers/errorHandlers');

router.route('/')
    .get(postController.index)
    .post(isAuth, validatePost, catchAsyncError(postController.create));

router.route('/new')
    .get(isAuth, postController.new);

router.route('/:id')
    .get(postController.show)
    .put(isAuth, postController.update)
    .delete(isAuth, catchAsyncError(canDeletePost),  postController.delete);

router.route('/:id/edit')
    .get(isAuth, postController.edit);

module.exports = router;