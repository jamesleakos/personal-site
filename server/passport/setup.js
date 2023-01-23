const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../../db/models/Users.js');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Local Strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // Match User
    User.findOne({ email: email })
      .then((user) => {
        // Create new User
        if (!user) {
          // for now I don't want any new users
          return done(null, false, {
            message: "Username or password doesn't exist, fool. ",
          });

          // const newUser = new User({ email, password });
          // // Hash password before saving in database
          // bcrypt.genSalt(10, (err, salt) => {
          //   bcrypt.hash(newUser.password, salt, (err, hash) => {
          //     if (err) throw err;
          //     newUser.password = hash;
          //     newUser
          //       .save()
          //       .then((user) => {
          //         return done(null, user);
          //       })
          //       .catch((err) => {
          //         return done(null, false, { message: err });
          //       });
          //   });
          // });

          // Return other user
        } else {
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Wrong password' });
            }
          });
        }
      })
      .catch((err) => {
        return done(null, false, { message: err });
      });
  })
);

module.exports = passport;
