const { getAllPlayersByTournamentId, getAllPlayersByRoundId } = require("../controllers/playerController");

let router = require("express").Router();

//get all players by tournamentId
router.get('/:id/players', [getAllPlayersByTournamentId], async (req, res, next) => {
    res.json(res.locals.players);
});

//get all players by round id
router.get('/:id/round/:round/players', [getAllPlayersByRoundId], async (req, res, next) => {
    res.json(res.locals.players);
});
