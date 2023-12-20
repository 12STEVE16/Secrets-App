import passport from 'passport';
import User from '../model/User.js';

export const islogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log(req.session);
        next();
    } else {
        res.redirect('/login');
    }
};
export const isAlreadyLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/secrets');
    } else {
        next();
    }
};