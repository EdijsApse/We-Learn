const Post = require('../models/post');

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

module.exports.show = (req, res) => {
    res.send('Post view');
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