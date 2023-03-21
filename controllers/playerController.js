const { Tournament } = require("../models/tournamentModel");

module.exports.getAllPlayersByTournamentId = async (req, res, next) => {
    let id = req.params.id;
    let tournament = await Tournament.findById(id);

    //flatMap gets all player subdocuments from all rounds to a single array of players
    let players = tournament.rounds.flatMap(round => round.players);
    
    res.locals.players = players;
    return next();
}

module.exports.getAllPlayersByRoundId = async (req, res, next) => {
    let tournamentId = req.params.id;
    let roundId = req.params.round;

    let tournament = await Tournament.findById(id);
    let round = tournament.rounds.id(roundId);
    let players = round.players;

    res.locals.players = players;
    return next();
}