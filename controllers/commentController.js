const Comment = require('../models/comment');
const Post = require('../models/post');
const ExpressError = require('../helpers/ExpressError');

module.exports.delete = async (req, res) => {
    const { id, post_id } = req.params;
    await Comment.findByIdAndDelete(id);
    req.flash('success', 'Comment deleted');
    res.redirect(`/post/${post_id}`);
}

/**
 * @todo check if post_id is valid
 */
module.exports.create = async (req, res) => {
    const { post_id } = req.params;
    const { body } = req.body;
    const user_id = req.user._id;
    const post = await Post.findById(post_id);
    const comment = new Comment({
        post: post_id,
        body,
        user: user_id
    });

    if (!post) {
        return next(new ExpressError(404, 'Post not found'));
    }

    post.comments.push(comment);

    await post.save();
    await comment.save();

    req.flash('success', 'Comment creted.');

    res.redirect(post.url);
}