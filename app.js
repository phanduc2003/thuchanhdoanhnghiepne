// app.js
const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const passport = require('./middleware/passport');
const mongoose = require('mongoose');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const AuthRouter = require('./router/AuthRouter');
const ReportRouter = require('./router/ReportRouter');
const UserRouter = require('./router/UserRouter');
const TypeRouter = require('./router/TypeRouter');

// Thiết lập Handlebars làm view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Thiết lập middleware cho phiên làm việc
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

const connDb = async () => {
  let uri = "mongodb+srv://ducpvps21704:duc12345@thuctapdoanhnghiep.yvydndx.mongodb.net/?retryWrites=true&w=majority";
  try {
    await mongoose.connect(uri);
    console.log("connect successful!..");
  } catch (error) {
    console.error(error);
  }
}
connDb();

// Sử dụng Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Sử dụng định tuyến
app.use('/', AuthRouter);
app.use('/reports', ReportRouter);
app.use('/users', UserRouter);
app.use('/types', TypeRouter);

app.get('/login', (req, res) => {
  res.render('login');
});




app.listen(3000, () => {
  console.log('http://localhost:3000/login');
});
