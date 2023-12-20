// authController.js
import passport from 'passport';
import User from '../model/User.js';

export const renderLogin = (req, res) => {
    res.render('login');
};

export const renderRegister = (req, res) => {
  res.render('register');
};

export const registerUser = (req, res) => {
    console.log(req.body)
  User.register(
    { username: req.body.username, firstName: 'steve', lastName: 'sunny' },
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.redirect('/register');
      } else {
        passport.authenticate('local')(req, res, () => {
          res.redirect('/secrets');
        });
      }
    }
  );
};

export const loginUser = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate('local')(req, res, () => {
        res.redirect('/secrets');
      });
    }
  });
};
