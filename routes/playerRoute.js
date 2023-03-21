const { getAllPlayersByTournamentId } = require("../controllers/playerController");

let router = require("express").Router();

//get all players by tournamentId
router.get('/:id/players', [getAllPlayersByTournamentId], async (req, res, next) => {
    res.json(res.locals.players);
});
