const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const passport = require('passport');
const session = require('express-session');
//custom import
const config = require('./config/index');
const passportConfig = require('./config/passportConfig');

//use 
app.use(cors())
app.use(session({
    secret: config.secret,
    saveUninitialized: true,
    resave: true,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(passportConfig)
//config
const port =config.port;

//routes import
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

//use
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes use
app.use('/', indexRouter);
app.use('/users', usersRouter);


//google start
app.get('/oauth',
    passport.authenticate('google', {
        successRedirect: '/users',
        failureRedirect: '/'

    }),

);
app.get('/login', passport.authenticate('google', { scope: ['profile'] }));
//google closs

//common
app.get('/logout', (req, res) => {
    req.logOut()
    res.redirect("/")
})

//lesten server
app.listen(port, function (e) {
    console.log('Server running at port', port);
});
