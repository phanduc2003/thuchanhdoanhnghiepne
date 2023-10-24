const passport = require('../middleware/passport');
const User = require('../model/User');

// Hàm đăng nhập bằng Google
async function loginWithGoogle(req, res) {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })(req, res);
}

// Hàm xử lý sau khi đăng nhập thành công
async function googleCallback(req, res) {
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/login',
  })(req, res);
}

// Hàm hiển thị trang thông tin người dùng
async function report(req, res) {
  res.render('profile', { user: req.user });
}

async function getAll() {
  try {
    let user = await User.find({});
    console.log("Reports from MongoDB:", user); // Thêm dòng này để ghi log dữ liệu
    return user;
  } catch (error) {
    console.log("Error in getAll():", error);
  }
}

module.exports = { loginWithGoogle, googleCallback, report, getAll };
