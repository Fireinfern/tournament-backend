const { Schema, default: mongoose } = require("mongoose");

const User = Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
},
{
    collection: 'user'
});

module.exports.User = mongoose.model('user', User);