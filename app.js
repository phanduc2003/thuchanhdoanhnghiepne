// app.js
const express = require('express');
const session = require('express-session');
const hbs = require('hbs');
const path = require('path');
const passport = require('./middleware/passport');
const AuthRouter = require('./router/AuthRouter');
const ReportRouter = require('./router/ReportRouter');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Thiết lập Handlebars làm view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static("dist"))
app.use(express.static("plugins"))
app.use(express.static("public/css"))

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

app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());


app.use(cors({ origin: true, credentials: true }));

// Sử dụng Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Sử dụng định tuyến từ AuthRouter
app.use('/', AuthRouter);

app.get('/login', (req, res) => {
  res.render('login');
});

app.use('/reports', ReportRouter);




app.listen(3000, () => {
  console.log('http://localhost:3000/login');
});
