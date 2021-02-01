const Post = require('../models/post');
const ExpressError = require('../helpers/ExpressError');

module.exports.create = async (req, res) => {
    const { title, body, category } = req.body;
    const post = new Post({title, body, category});
    post.user = req.user._id;
    
    await post.save();

    req.flash('success', 'Post created');

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

module.exports.update = async (req, res) => {
    const { id } = req.params;
    const { body, title } = req.body;

    const post = await Post.findByIdAndUpdate(id, { body, title })

    req.flash('success', 'Post updated');

    return res.redirect(post.url);
}

module.exports.delete = async (req, res) => {
    const { id } = req.params;
    
    await Post.findByIdAndDelete(id);
   
    req.flash('success', 'Post deleted');
    
    return res.redirect('/post');
}

module.exports.index = async (req, res) => {
    const posts = await Post.find().populate('user');
    res.render('post/index', {
        posts
    });
}

module.exports.edit = async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
        return next(new ExpressError(404, 'Post not found!'));
    }

    res.render('post/update', {post});
}

module.exports.favorite = async (req, res) => {
    const { id } = req.params;

    await Post.findOneAndUpdate({_id: id}, {
        $push: {
            favorite: req.user._id
        }
    });

    req.flash('success', 'Post added to favorite list');

    res.redirect(`/post/${id}`);
}

module.exports.favoriteRemove = async (req, res) => {
    const { id } = req.params;
    await Post.findOneAndUpdate( {_id: id}, {
        $pull: {
            favorite: req.user._id
        }
    });

    req.flash('success', 'Post removed from favorite list');

    res.redirect(`/post/${id}`);
}