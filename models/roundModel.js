const { Schema } = require("mongoose");
const Player = require("./playerModel");

const Round = Schema({
    players: {
        type: [Player],
        validate: {
            validator: () => {
                return this.players.length <= 2;
            }
        }
    },
    winners: {
        type: [Player],
        required: false
    }
});

module.exports = Round;