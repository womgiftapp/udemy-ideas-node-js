const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

//Passport config
require('./config/passport')(passport);

// DB config
const db = require('./config/database');

// Connect to mongoose
mongoose.connect(db.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware
app.use(methodOverride('_method'));

// Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use(function (req, res, next) {
    //     //console.log(Date.now());
    //     req.name = 'Margarita';
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Index route
app.get('/', (req, res) => {
    //console.log(req.name);
    const title = 'Welcome..';
    res.render('index', {
        title: title
    });
});

//About route
app.get('/about', (req, res) => {
    //res.send('About');
    res.render('about');
});


// Use routes
app.use('/ideas', ideas);
app.use('/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listen the port ${port}`);
});