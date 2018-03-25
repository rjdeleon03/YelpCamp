var Campground  = require("../models/campground"); 
var Comment  = require("../models/campground"); 

// All middleware
var middlewareObj = {};

// Middleware for campground ownership checking
middlewareObj.checkCampgroundOwnership = function checkCampgroundOwnership(req, res, next) {
    // Is user logged in?
    if (req.isAuthenticated()) {
        
        // Does user own campground?
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();    
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

// Middleware for comment ownership checking
middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next) {
    // Is user logged in?
    if (req.isAuthenticated()) {
        
        // Does user own comment?
        Comment.findById(req.params.commentId, function(err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();    
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

// Middleware for logged in state checking
middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

module.exports = middlewareObj;

