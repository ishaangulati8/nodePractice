require('dotenv').config();

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/**
 * Connect to mongoDB.
 */
mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
}
)

const routes = require('./routes');

/**
 * Use json.
 */
app.use(bodyparser.json());

/**
 * Initialize passport.
 */
app.use(passport.initialize());

// app.use('/api', routes);

/**
 * Global Error Handler.
 */
app.use((error, req, res, next) => {
    return res.json({
        error,
    });
});

/**
 * Cors origin url.
 */
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

