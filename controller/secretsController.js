// secretsController.js
import User from '../model/User.js';

export const renderSecrets = async (req, res) => {
    try {
      const foundUsers = await User.find({ secret: { $ne: null } });
      res.render('secrets', { usersWithSecrets: foundUsers });
    } catch (err) {
      console.error(err);
      // Handle the error appropriately (send an error response or redirect, etc.)
      res.status(500).send('Internal Server Error');
    }
  };

export const renderSubmit = (req, res) => {
  if (req.isAuthenticated()) {
    res.render('submit');
  } else {
    res.redirect('/login');
  }
};

export const submitSecret = async (req, res) => {
    try {
      const submittedSecret = req.body.secret;
  
      // Once the user is authenticated and their session gets saved,
      // their user details are saved to req.user.
      console.log(req.user.id);
  
      const foundUser = await User.findById(req.user.id);
      if (foundUser) {
        foundUser.secret = submittedSecret;
        await foundUser.save();
        res.redirect('/secrets');
      } else {
        // Handle the case where the user is not found
        res.status(404).send('User not found');
      }
    } catch (err) {
      console.error(err);
      // Handle the error appropriately (send an error response or redirect, etc.)
      res.status(500).send('Internal Server Error');
    }
  };
  
export const logoutUser = (req, res) => {
  req.logout();
  res.redirect('/');
};
