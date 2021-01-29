const mongoose = require('mongoose');
const Categories = require('./category');

const postSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    body: {
        required: true,
        type: String
    },
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        required: true,
        type: Number,
        enum: [...Categories.getCategoriesId()]
    },
    create_time: {
        type: Date,
        default: Date.now()
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

postSchema.virtual('url').get(function() {
    return `/post/${this._id}`;
});

postSchema.virtual('image').get(function() {
    return `https://source.unsplash.com/random/500x500`;
});

postSchema.virtual('category_name').get(function() {
    return Categories.getCategoryName(this.category);
});

postSchema.virtual('body_intro').get(function() {
    return this.body.slice(0, 100) + ' ...'
});

postSchema.virtual('date_created').get(function() {
    const date = new Date(this.create_time);

    return `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`;
})


module.exports = mongoose.model('Post', postSchema);