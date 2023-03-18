const { createTournament, getAllTournaments } = require("../controllers/tournamentController");
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

router.get('/:id', (req, res, next) => { //! complete
    res.send("Find a torunament with an ID");
});

router.delete('/:id', (req, res, next) => { //!complete
    res.send("Delete an specific Entry");
})

router.put('/:id', (req, res, next) => {
    res.send("Putted in here");
});

router.get('/:id/round/:round', (req, res, next) => {

});

module.exports = router;