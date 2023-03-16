const { Schema } = require("mongoose");

const Player = Schema({
    displayName: {
        type: String,
        required: true
    }
});

module.exports = Player;