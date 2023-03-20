const { createTournament, getAllTournaments, getTournamentById, updateTournamentById, deleteTournamentById } = require("../controllers/tournamentController");
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

router.get('/:id/round/:round', (req, res, next) => {

});

module.exports = router;