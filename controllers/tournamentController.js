const { Tournament } = require("../models/tournamentModel");

module.exports.createTournament = async (req, res, next) => {
    let body = req.body;
    let newTournament = new Tournament(body);
    await newTournament.save();
    res.locals.tournament = newTournament;
    return next();
}

module.exports.getAllTournaments = async (req, res, next) => {
    let tournaments = await Tournament.find({});
    res.locals.tournaments = tournaments;
    return next();
}

module.exports.getTournamentById = async (req, res, next) => {
    let id = req.params.id;
    let tournament = await Tournament.findById(id);
    res.locals.tournament = tournament;
    return next();
}

module.exports.updateTournamentById = async (req, res, next) => {
    let id = req.params.id;
    await Tournament.findByIdAndUpdate(id, req.body);
    return next();
}

module.exports.deleteTournamentById = async (req, res, next) => {
    let id = req.params.id;
    await Tournament.findByIdAndDelete(id);
    return next();
}