const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { validatePost, isAuth, isAuthor } = require('../middlwares');
const { catchAsyncError } = require('../helpers/errorHandlers');

router.route('/')
    .get(postController.index)
    .post(isAuth, validatePost, catchAsyncError(postController.create));

router.route('/new')
    .get(isAuth, postController.new);

router.route('/:id')
    .get(postController.show)
    .put(isAuth, catchAsyncError(isAuthor), validatePost, postController.update)
    .delete(isAuth, catchAsyncError(isAuthor),  postController.delete);

router.route('/:id/edit')
    .get(isAuth, catchAsyncError(postController.edit));

router.route('/:id/favorite-remove')
    .post(isAuth, catchAsyncError(postController.favoriteRemove));

router.route('/:id/favorite')
    .post(isAuth, catchAsyncError(postController.favorite));

module.exports = router;

