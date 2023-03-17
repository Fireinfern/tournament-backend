const { Tournament } = require("../models/tournamentModel");

module.exports.createTournament = async (req, res, next) => {
    let body = req.body;
    let newTournament = new Tournament(body);
    await newTournament.save();
    next();
}

module.exports.getAllTournaments = async (req, res, next) => {
    let tournaments = await Tournament.find({});
    req.tournaments;
    next();
}