const { Schema, default: mongoose } = require("mongoose");
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
        default: function() {
            let numberOfRounds = this.maxPlayerAmount == 16 ? 4 : 3;
            let array = [];
            for (let i = 0; i < numberOfRounds; i++) {
                console.log(i);
                array.push({});
            }
            return array;
        },
    }
},
{
    collection: "tournament"
});

module.exports.Tournament = mongoose.model('tournament', Tournament);