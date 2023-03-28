const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/register_login', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: 'No user found' });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      return res.status(200).json({ success: `logged in ${user.id}` });
    });
  })(req, res, next);
});

router.get('/check-auth', (req, res) => {
  // check with passport if user is authenticated
  if (req.isAuthenticated()) {
    return res.status(200).json({ success: 'user is authenticated' });
  } else {
    return res.status(401).json({ errors: 'user is not authenticated' });
  }
});

router.post('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(400).json({ errors: err });
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
