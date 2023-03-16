const { Schema } = require("mongoose");
const Player = require("./playerModel");
const Round = require("./roundModel");

const Tournament = Schema({
    displayName: {
        type: String,
        required: true
    },
    maxPlayerAmount: {
        require: true,
        type: Number,
        validate:
        {
            validator: (val) => val == 16 || val == 8,
            message: '{VALUE} should be either 16 or 8'
        },
        default: 8
    },
    rounds:{
        type: [Round],
        default: () => {
            if (this.maxPlayerAmount == 16) return 4;
            return 3;
        }
    },
});

module.exports = Tournament;