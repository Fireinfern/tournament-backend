const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const tournaments = require('./routes/tournamentRoute');
const users = require('./routes/userRoute');

//authentication modules
let passport = require('passport');
let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

const port = process.env.PORT || 3000;
const db = process.env.DB;

mongoose.connect(db);

let app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//create a user model for each user
let userModel = require('./models/userModel');
let User = userModel.User;

//passport user configuration
passport.use(User.createStrategy());

//serialize and deserialize the user info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = db.Secret;
let strategy = new JWTStrategy(jwtOptions,(jwt_payload,done) => {
  User.findById(jwt_payload.id).then(user => {
    return done(null,user);
  }).catch(err => {
    return done(err, false);
  });
});
passport.use(strategy);

app.get('', (req, res, next) => {
    res.redirect('/v1/tournaments');
})

app.use('/v1/tournaments', tournaments);
app.use('/v1/users', users);

app.listen(port);