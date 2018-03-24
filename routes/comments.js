var express     = require("express");
var router      = express.Router({mergeParams: true});

var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");  

// Comments New
// Check if user is logged in before displaying new comment form
router.get("/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        console.log(campground);
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// Comments Create
// Check if user is logged in before POSTing new comment
router.post("/", isLoggedIn, function(req, res) {
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
                    // Add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();

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

// Middleware for logged in state checking
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;