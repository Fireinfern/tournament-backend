const { Schema } = require("mongoose");
const Player = require("./playerModel");

const Round = Schema({
    players: {
        type: [Player]
    },
    winners: {
        type: [Player],
        required: false
    }
});

module.exports = Round;