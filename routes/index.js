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
            req.flash("error", err.message + ".");
            res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to YelpCamp, <strong>" + user.username + "</strong>!");
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
        if(err) {            
            req.flash("error", err);
        }
    
});

// Auth Logout
// Logout route
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "You have been logged out.");
    res.redirect("/campgrounds");
});

module.exports = router;