const { Tournament } = require("../models/tournamentModel");
const { Round } = require("../models/roundModel");

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
    res.locals.tournament = await Tournament.findByIdAndUpdate(id, req.body);
    return next();
}

module.exports.deleteTournamentById = async (req, res, next) => {
    let id = req.params.id;
    await Tournament.findByIdAndDelete(id);
    return next();
}

module.exports.getAllRoundsByTournamentId = async (req, res, next) => {
    let id = req.params.id;
    let tournament = await Tournament.findById(id, {rounds:1});
    res.locals.tournament = tournament;
    return next();
}

module.exports.getOneRoundFromTournamentById = async (req, res, next) => {
    let tournamentId = req.params.id;
    let roundId = req.params.round;

    let tournament = await Tournament.findById(tournamentId, {rounds:1});
    res.locals.round = tournament.rounds.id(roundId);

    return next();
}

module.exports.updateRoundById = async (req, res, next) => {
    let tournamentId = req.params.id;
    let roundId = req.params.round;
    let body = req.body;

    let tournament = await Tournament.findOneAndUpdate(
        { _id: tournamentId, 'rounds._id': roundId }, //search keys
        { $set: { 'rounds.$': body } }
    );
    res.locals.tournament = tournament;
        
    return next();
}

module.exports.deleteRoundById = async (req, res, next) => {
    let tournamentId = req.params.id;
    let roundId = req.params.round;

    let tournament = await Tournament.findById(tournamentId);
    tournament.rounds.remove(roundId);
    await tournament.save();
    return next();
}


module.exports.createTournamentRound = async (req, res, next) => {
    let id = req.params.id;
    let body = req.body;
    //let newRound = new Round(body);
    let tournament = await Tournament.findById(id);
    let round = tournament.rounds.create(body);
    tournament.rounds.push(round);
    await tournament.save();
    res.locals.tournament = tournament;
    return next();
}