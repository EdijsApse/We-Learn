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
    }
});

postSchema.virtual('url').get(function() {
    return `/post/${this._id}`;
});


module.exports = mongoose.model('Post', postSchema);