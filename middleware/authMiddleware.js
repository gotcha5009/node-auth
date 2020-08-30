const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check jwt exist and is validated 
    if (token) {
        jwt.verify(token, 'my secret', (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
};

//check user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    // check jwt exist and is validated 
    if (token) {
        jwt.verify(token, 'my secret', async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                console.log(user);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
};


module.exports = { requireAuth, checkUser };