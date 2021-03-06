var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

// Required for parsing post params
app.use(bodyParser.urlencoded({extended: true}));

// Include stylesheets
app.use(express.static(__dirname + "/public"));

// Treat all pages to render as ejs
app.set("view engine", "ejs");

// Connect mongoose
// Use environment DB url (if deployed), else use local DB
var databaseUrl = process.env.DATABASEURL || "mongodb://localhost/yelpcamp";
console.log(databaseUrl);
mongoose.connect(databaseUrl);

// Use method-override
app.use(methodOverride("_method"));

// Use connect-flash - must before passport
app.use(flash());

// Seed database
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once upon a time",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Add current user info in every route
app.use(function(req, res, next) {
    // Everything put in res.locals is available to all routes
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


// Setup routes
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// Listen to router
app.listen(process.env.PORT || 3000, function() {
    console.log("YelpCamp is running...");
});