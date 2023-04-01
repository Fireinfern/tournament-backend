const { createTournament, getAllTournaments, getTournamentById, updateTournamentById, deleteTournamentById, deleteRoundById, updateRoundById, createTournamentRound, getAllRoundsByTournamentId, getOneRoundFromTournamentById } = require("../controllers/tournamentController");
const { getAllPlayersByTournamentId, getAllPlayersByRoundId } = require("../controllers/playerController");
const passport = require("passport");

let router = require("express").Router();

function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}


// add Auth if needed
router.get('', [passport.authenticate('jwt', { session: false }),getAllTournaments], async(req, res, next) => {
    res.json(res.locals.tournaments);
})

router.post('/add',requireAuth, [createTournament],async (req, res, next) => {
    res.status(201)
    res.json(res.locals.tournament);
});

router.get('/:id',requireAuth, [getTournamentById],async (req, res, next) => {
    res.json(res.locals.tournament);
});

router.delete('/:id', requireAuth, [deleteTournamentById],async(req, res, next) => {
    res.sendStatus(204);
})

router.put('/:id', requireAuth, [updateTournamentById],async(req, res, next) => {
    res.json(res.locals.tournament);
});

//get all rounds of a tournament
router.get('/:id/rounds', requireAuth, [getAllRoundsByTournamentId],async (req, res, next) => {
    res.json(res.locals.tournament);
});

//get one round of a tournament by Id
router.get('/:id/rounds/:round', requireAuth,[getOneRoundFromTournamentById],async (req, res, next) => {
    res.json(res.locals.round);
});

//update round by Id
router.put('/:id/rounds/:round',requireAuth, [updateRoundById], async (req, res, next) => {
    res.json(res.locals.tournament);
});

//delete a round in a tournament by Id
router.delete('/:id/rounds/:round',requireAuth, [deleteRoundById], async (req, res, next) => {
    res.sendStatus(204);
});

//create a tournament round
router.post('/:id/rounds/add',requireAuth, [createTournamentRound],async (req, res, next) => {
    res.status(201);
    res.json(res.locals.tournament);
});

//get all players by tournamentId
router.get('/:id/players',requireAuth, [getAllPlayersByTournamentId], async (req, res, next) => {
    res.json(res.locals.players);
});

//get all players by round id
router.get('/:id/round/:round/players', requireAuth, [getAllPlayersByRoundId], async (req, res, next) => {
    res.json(res.locals.players);
});

module.exports = router;