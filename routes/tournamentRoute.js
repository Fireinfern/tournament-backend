const { createTournament, getAllTournaments, getTournamentById, updateTournamentById, deleteTournamentById, deleteRoundById, updateRoundById, createTournamentRound, getAllRoundsByTournamentId, getOneRoundFromTournamentById } = require("../controllers/tournamentController");
const { getAllPlayersByTournamentId, getAllPlayersByRoundId, addPlayerByTournamentId, selectWinnerByPlayerId } = require("../controllers/playerController");
const passport = require("passport");

let router = require("express").Router();

// add Auth if needed
router.get('', [getAllTournaments], async (req, res, next) => {
    res.json(res.locals.tournaments);
})

router.post('/add', [passport.authenticate('jwt', { session: false }), createTournament], async (req, res, next) => {
    res.status(201)
    res.json(res.locals.tournament);
});

router.get('/:id', [passport.authenticate('jwt', { session: false }), getTournamentById], async (req, res, next) => {
    res.json(res.locals.tournament);
});

router.delete('/:id', [passport.authenticate('jwt', { session: false }), deleteTournamentById], async (req, res, next) => {
    res.sendStatus(204);
})

router.put('/:id', [passport.authenticate('jwt', { session: false }), updateTournamentById], async (req, res, next) => {
    res.json(res.locals.tournament);
});

//get all rounds of a tournament
router.get('/:id/rounds', [passport.authenticate('jwt', { session: false }), getAllRoundsByTournamentId], async (req, res, next) => {
    res.json(res.locals.tournament);
});

//get one round of a tournament by Id
router.get('/:id/rounds/:round', [passport.authenticate('jwt', { session: false }), getOneRoundFromTournamentById], async (req, res, next) => {
    res.json(res.locals.round);
});

//update round by Id
router.put('/:id/rounds/:round', [passport.authenticate('jwt', { session: false }), updateRoundById], async (req, res, next) => {
    res.json(res.locals.tournament);
});

//delete a round in a tournament by Id
router.delete('/:id/rounds/:round', [passport.authenticate('jwt', { session: false }), deleteRoundById], async (req, res, next) => {
    res.sendStatus(204);
});

//create a tournament round
router.post('/:id/rounds/add', [passport.authenticate('jwt', { session: false }), createTournamentRound], async (req, res, next) => {
    res.status(201);
    res.json(res.locals.tournament);
});

//get all players by tournamentId
router.get('/:id/players', [passport.authenticate('jwt', { session: false }), getAllPlayersByTournamentId], async (req, res, next) => {
    res.json(res.locals.players);
});

//get all players by round id
router.get('/:id/round/:round/players', [passport.authenticate('jwt', { session: false }), getAllPlayersByRoundId], async (req, res, next) => {
    res.json(res.locals.players);
});

router.post('/:id/add-player', [passport.authenticate('jwt', { session: false }), addPlayerByTournamentId], async (req, res, next) => {
    res.json(res.locals.tournament);
});
router.post('/:id/rounds/:round/players/:player/select-as-winner', [passport.authenticate('jwt', { session: false }), selectWinnerByPlayerId], async (req, res, next) => {
    res.json(res.locals.tournament);
});

module.exports = router;