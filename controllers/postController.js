const Post = require('../models/post');
const ExpressError = require('../helpers/ExpressError');

module.exports.create = async (req, res) => {
    const { title, body, category } = req.body;
    const post = new Post({title, body, category});
    post.user = req.user._id;
    
    await post.save();

    res.redirect(post.url);
}

module.exports.new = (req, res) => {
    res.render('post/create');
}

module.exports.show = async (req, res, next) => {
    const post = await Post.findById(req.params.id).populate({
        path: 'comments',
        populate: {
            path: 'user',
        }
    }).populate('user');

    if (!post) {
        return next(new ExpressError(404, 'Post not found!'));
    }

    res.render('post/view', { post })
}

module.exports.update = (req, res) => {

}

module.exports.delete = (req, res) => {

}

module.exports.index = async (req, res) => {
    const posts = await Post.find().populate('user');
    res.render('post/index', {
        posts
    });
}

module.exports.edit = (req, res) => {

}