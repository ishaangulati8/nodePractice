const models = require('../models');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err) {
            next(err);
        }
        if (user) {
            req.login(user, { session: false }, (err) => {
                if (err) {
                    res.send(err);
                }
            });
            const token = jwt.sign({userName: user.firstName + " "+ user.lastName, userId: user.id}, process.env.SECRET);
            res.json({
                user,
                token,
            });
        }
        res.json({
            success: false,
        });
    })(req, res, next);
});

module.exports = router;