const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    surname: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    }
})

userSchema.virtual('fullname').get(function() {
    return `${this.name} ${this.surname}`;
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});


module.exports = mongoose.model('User', userSchema);