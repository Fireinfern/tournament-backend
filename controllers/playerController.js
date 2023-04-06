const { Tournament } = require("../models/tournamentModel");

module.exports.getAllPlayersByTournamentId = async (req, res, next) => {
    let id = req.params.id;
    let tournament = await Tournament.findById(id);

    if ( !tournament ) {
        return res.sendStatus(418);
    }
    //flatMap gets all player subdocuments from all rounds to a single array of players
    let players = tournament.rounds.flatMap(round => round.players);
    
    res.locals.players = players;
    return next();
}

module.exports.getAllPlayersByRoundId = async (req, res, next) => {
    let id = req.params.id;
    let roundId = req.params.round;

    let tournament = await Tournament.findById(id);
    let round = tournament.rounds.id(roundId);
    let players = round.players;

    res.locals.players = players;
    return next();
}

module.exports.addPlayerByTournamentId = async(req, res, next) => {
    let id = req.params.id;
    let player = req.body;

    let tournament = await Tournament.findById(id);
    
    if(tournament.rounds[0].players.length == tournament.maxPlayerAmount){
        return res.sendStatus(418);
    }
    tournament.rounds[0].players.push(player);
    await tournament.save();
    res.locals.tournament = tournament;
    return next();
}
module.exports.selectWinnerByPlayerId= async (req, res, next) => {
    let id = req.params.id;
    let roundId = req.params.round;
    let playerId = req.params.player;  

    let tournament = await Tournament.findById(id);
    let round = tournament.rounds.id(roundId);
    let player = round.players.id(playerId);
    let players = round.players;
    
    if(Math.floor(round.players.length/2) == round.winners.length){
        return res.sendStatus(418);
    }
    /*if(!round.winners.find((e) => e._id == player)){
        return res.sendStatus(418);
    }*/
    round.winners.push(player);
    await tournament.save();
    res.locals.tournament = tournament;
    return next();
}