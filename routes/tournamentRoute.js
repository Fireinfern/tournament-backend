const { createTournament, getAllTournaments, getTournamentById, updateTournamentById, deleteTournamentById, deleteRoundById, updateRoundById } = require("../controllers/tournamentController");
const Tournament = require("../models/tournamentModel");

let router = require("express").Router();

// add Auth if needed
router.get('', [getAllTournaments], async(req, res, next) => {
    res.json(res.locals.tournaments);
})

router.post('/add', [createTournament],async (req, res, next) => {
    res.status(201)
    res.json(res.locals.tournament);
});

router.get('/:id', [getTournamentById],async (req, res, next) => {
    res.json(res.locals.tournament);
});

router.delete('/:id', [deleteTournamentById],async(req, res, next) => {
    res.sendStatus(204);
})

router.put('/:id', [updateTournamentById],async(req, res, next) => {
    res.json(res.locals.tournament);
});

//get all rounds of a tournament
router.get('/:id/round', [getAllRoundsByTournamentId],async (req, res, next) => {
    res.json(res.locals.tournament);
});

//get one round of a tournament by Id
router.get('/:id/round/:round', [getOneRoundFromTournamentById],async (req, res, next) => {
    res.json(res.locals.round);
});

//update round by Id
router.put('/:id/round/:round', [updateRoundById], async (req, res, next) => {
    res.json(res.locals.tournament);
});

//delete a round in a tournament by Id
router.delete('/:id/round/:round', [deleteRoundById], async (req, res, next) => {
    res.send("Delete a specific round");
});

//create a tournament round
router.post('/:id/round/add', [createTournamentRound],async (req, res, next) => {
    res.json(res.locals.tournament);
});

module.exports = router;