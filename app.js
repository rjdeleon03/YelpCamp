var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");


// Required for parsing post params
app.use(bodyParser.urlencoded({extended: true}));

// Include stylesheets
app.use(express.static(__dirname + "/public"));

// Treat all pages to render as ejs
app.set("view engine", "ejs");

// Connect mongoose
mongoose.connect("mongodb://localhost/yelpcamp");

// Seed database
seedDB();

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
    next();
});

app.get("/", function(req, res) {
    res.render("landing");
});

// INDEX ROUTE
app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from db
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    })
});

// NEW ROUTE
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

// CREATE ROUTE
app.post("/campgrounds", function(req, res) {
    // Get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
        
    // Add newCampground to DB    
    Campground.create(newCampground, function (err, campground) {
            if (err) {
                console.log(err);
            } else {
                // console.log("NEWLY CREATED CAMPGROUND:");
                // console.log(campground);
            }
        }
    );

    //Redirect to campgrounds page
    res.redirect("/campgrounds");
});

// SHOW ROUTE
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// ==================
// COMMENTS ROUTES
// ==================

// Check if user is logged in before displaying new comment form
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// Check if user is logged in before POSTing new comment
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
    // Lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {

            // Create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                    res.redirect("/campgrounds");
                } else {

                    // Connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();

                    // Redirect to show page
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

// ==================
// AUTH ROUTES
// ==================

// Show register form
app.get("/register", function(req, res) {
    res.render("register");
});

// Handle sign up logic
app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds");
        });
    });
});

// Show login form
app.get("/login", function (req, res) {
    res.render("login");
});

// Handle login logic
app.post("/login", 
    passport.authenticate("local", {        // middleware block
        successRedirect: "/campgrounds",    // middleware block
        failureRedirect: "/login"          // middleware block
    }), 
    function (req, res) {
    
});

// Logout route
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

// Middleware for logged in state checking
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function() {
    console.log("YelpCamp is running...");
});