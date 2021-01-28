const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { validatePost } = require('../middlwares');

router.route('/')
    .get(postController.index)
    .post(validatePost, postController.create);

router.route('/new')
    .get(postController.new);

router.route('/:id')
    .get(postController.show)
    .put(postController.update)
    .delete(postController.delete);

router.route('/:id/edit')
    .get(postController.edit);

module.exports = router;