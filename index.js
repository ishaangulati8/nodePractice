require('dotenv').config();

const express = require('express');
const app = express();
const body-parser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');


const routes = require('./routes');

/**
 * Use json.
 */
app.use(body-parser.json());

/**
 * Initialize passport.
 */
app.use(passport.initialize());

app.use('/api', routes);

/**
 * Global Error Handler.
 */
app.use((error, req, res, next) => {
    return res.json({
        error,
    });
});

app.use(cors({
    origin: 'http://localhost:3000',
}));

const port = process.env.PORT_NO || 3001;

app.listen(port, (error) => {
    if (error) {
        console.log("error", error);
    } else {
        console.log(`Working: ${port}`)
    }
});

module.exports = app;