let router = require("express").Router();

// add Auth if needed
router.get('', (req, res, next) => {
    res.send("Return all tournaments");
})

router.post('/add', (req, res, next) => {
    res.send("Post Sended");
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

module.exports = router;