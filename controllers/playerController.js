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
    let rounds = tournament.rounds;
    let round = tournament.rounds.id(roundId);
    let player = round.players.id(playerId);
    let players = round.players;
    
    let index = -1;
    round.winners.push(player);
    var filteredRes = rounds.find(function(item, i){
        if(item._id === round._id){
        index = i;
        return i;
        }
    });
    if(tournament.maxPlayerAmount == 8 && index == 2 || tournament.maxPlayerAmount == 16 && index ==3){
        await tournament.save();
        res.locals.tournament = tournament;
        return next();
    }
    rounds[index+1].players = rounds[index].winners; 
    await tournament.save();
    res.locals.tournament = tournament;
    return next();
}
module.exports.getTournamentWinnerByTournamentId = async(req, res, next) => {
    let id = req.params.id;

    let tournament = await Tournament.findById(id);
    let winner;
    if(tournament.maxPlayerAmount == 8){
        winner = tournament.rounds[2].winners[0];
    }
    else{
        winner = tournament.rounds[3].winners[0]
    }

    if( winner == null){
        return res.sendStatus(418);
    }    
    res.locals.winner = winner;
    return next();
}