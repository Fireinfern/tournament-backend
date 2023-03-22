const { createUser, verifyUser } = require("../controllers/userController");

let router = require("express").Router();

router.post("/register", [createUser], async (req, res, next) => {
    res.send();
});

router.post("/login", [verifyUser], async (req, res, next) => {
    res.send();
})

module.exports = router;