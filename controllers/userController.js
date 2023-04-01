const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports.createUser = async (req, res, next) => {
    let body = req.body;
    if (!body.username || !body.email || !body.password) {
        res.sendStatus(418);
        return;
    }
    try {
        let newUser = new User(body);
        await newUser.save();
        res.status(201);
        return next();
    }
    catch (error) {
        res.status(400);
        res.json(error);
        return;
    }
};

module.exports.verifyUser = async (req, res, next) => {
    let body = req.body;
    if (!body.username || !body.password) {
        res.sendStatus(418);
        return;
    }
    let user = await User.find({ username: body.username, password: body.password });
    if (user.length > 0) {
        res.status(202);
        const token = jwt.sign({ username: user[0].username, id: user[0]._id }, process.env.SECRET);
        res.json({ token });
        return;
    }
    res.status(401);
    return next();
}