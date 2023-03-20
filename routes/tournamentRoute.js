const { createTournament, deleteRoundById } = require("../controllers/tournamentController");
const Tournament = require("../models/tournamentModel");

let router = require("express").Router();

// add Auth if needed
router.get('', (req, res, next) => {
    res.send("Return all tournaments");
})

router.post('/add', [createTournament],async (req, res, next) => {
    res.json(res.locals.tournament);
});

router.get('/:id', (req, res, next) => {
    res.send("Find a torunament with an ID");
});

router.delete('/:id', (req, res, next) => {
    res.send("Delete an specific Entry");
})

router.put('/:id', (req, res, next) => {
    res.send("Putted in here");
});

//get all rounds of a tournament
router.get('/:id/round', [getAllRoundsByTournamentId],async (req, res, next) => {
    res.json(res.locals.tournament);
});

//get one round of a tournament by Id
router.get('/:id/round/:round', [getOneRoundFromTournamentById],async (req, res, next) => {
    res.json(res.locals.round);
});

//delete a round in a tournament by Id
router.delete('/:id/round/:round', [deleteRoundById], async (req, res, next) => {
    res.send("Delete a specific round");
});


module.exports = router;