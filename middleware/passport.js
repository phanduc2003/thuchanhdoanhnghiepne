// middleware/passport.js

const passport = require('passport');
const User = require('../model/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: '863559376039-f1lt8bjrt48kd8pf66g25kuo1v23hctl.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id }).then((existingUser) => {
    if (existingUser) {
      // Người dùng đã tồn tại, trả về thông tin người dùng
      done(null, existingUser);
    } else {
      // Người dùng chưa tồn tại, tạo một bản ghi mới
      const newUser = new User({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value,
        role: "manager",
        status: "isActive"
        // Thêm các trường dữ liệu khác tùy theo nhu cầu
      });
      newUser.save().then((user) => {
        done(null, user);
      });
    }
  }).catch((err) => {
    done(err);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  }).catch((err) => {
    done(err);
  });
});

module.exports = passport;
