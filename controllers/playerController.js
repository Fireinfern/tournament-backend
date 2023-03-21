const { Tournament } = require("../models/tournamentModel");

module.exports.getAllPlayersByTournamentId = async (req, res, next) => {
    let id = req.params.id;
    let tournament = await Tournament.findById(id);

    //flatMap gets all player subdocuments from all rounds to a single array of players
    let players = tournament.rounds.flatMap(round => round.players);
    
    res.locals.players = players;
    return next();
}