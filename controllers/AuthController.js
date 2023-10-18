const passport = require('../middleware/passport');

// Hàm đăng nhập bằng Google
async function loginWithGoogle(req, res) {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })(req, res);
}

// Hàm xử lý sau khi đăng nhập thành công
async function googleCallback(req, res) {
  passport.authenticate('google', {
    successRedirect: '/auth/profile',
    failureRedirect: '/login',
  })(req, res);
}

// Hàm hiển thị trang thông tin người dùng
async function report(req, res) {
  res.render('profile', { user: req.user });
}

module.exports = { loginWithGoogle, googleCallback, report };
