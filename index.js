const express = require('express');
const cors = require('cors');
const tournaments = require('./routes/tournamentRoute');

const port = process.env.PORT || 3000;

let app = express();

app.get('', (req, res, next) => {
    res.redirect('/v1/tournaments');
})

app.use('/v1/tournaments',tournaments);

app.listen(port);