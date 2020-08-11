const jwtSecret = 'your_jwt_secret'; //same as the key in JWTStrategy

const jwt = require('jsonwebtoken'),
passport = require('passport');

require('./passport'); //the local passport file

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, //the username you're encoding in JWT
        expiresIn: '7d', //specifies when the token will expire
        algorithm: 'HS256' //algorithm used to "sign"/encode the values of the JWT
    });
}

/* POST login. */
module.exports = (router) => {
    router.post('/login', (req, res) => {
    passport.authenticate('local', {session: false}, (error, user, info) => {
        if (error || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        require.login(user, {session: false}, (error) => {
            if (error) {
                res.send(error);
            }
            let token = generateJWTToken(user.toJSON());
            return res.json({user, token}); // res.json({ user: user, token: token }). With ES6, if your keys are the same as your values, you can use this shorthand.
        });
    })(req,res);
});
}


