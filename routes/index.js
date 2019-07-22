const router = require('express').Router();
const signUp = require('./SignUp');
const login = require('./login');

router.use('/signUp', signUp);

module.exports = router;
