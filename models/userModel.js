const { Schema, default: mongoose } = require("mongoose");

const User = Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
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