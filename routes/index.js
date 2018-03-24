var express     = require("express");
var router      = express.Router();
var passport    = require("passport");

var User        = require("../models/user");  

// ==================
// INDEX ROUTES
// ==================

// Index Landing
router.get("/", function(req, res) {
    res.render("landing");
});

// Auth Register
// Show register form
router.get("/register", function(req, res) {
    res.render("register");
});

// Auth Register POST
// Handle sign up logic
router.post("/register", function(req, res) {
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

// Auth Login
// Show login form
router.get("/login", function (req, res) {
    res.render("login");
});

// Auth Login POST
// Handle login logic
router.post("/login", 
    passport.authenticate("local", {        // middleware block
        successRedirect: "/campgrounds",    // middleware block
        failureRedirect: "/login"          // middleware block
    }), 
    function (req, res) {
    
});

// Auth Logout
// Logout route
router.get("/logout", function (req, res) {
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

module.exports = router;