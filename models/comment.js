const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    body: {
        required: true,
        type: String
    },
    create_time: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

commentSchema.virtual('url').get(function() {
    return `/post/${this.post}/${this._id}`;
});

commentSchema.methods.isAuthor = function(user) {
    if (!user) return false;

    return this.user._id.equals(user._id);
};




module.exports = mongoose.model('Comment', commentSchema);