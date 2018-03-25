var express     = require("express");
var router      = express.Router({mergeParams: true});
var middleware  = require("../middleware");

var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");  

// Comments New
// Check if user is logged in before displaying new comment form
router.get("/new", middleware.isLoggedIn, function(req, res) {
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
router.post("/", middleware.isLoggedIn, function(req, res) {
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

// Comments Edit
router.get("/:commentId/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.commentId, function(err, foundComment) {  
        res.render("comments/edit", {
            campgroundId: req.params.id,
            comment: foundComment
        });
    });
});

// Comments Update
router.put("/:commentId", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, foundComment) {
        res.redirect("/campgrounds/" + req.params.id);
    });
});

// Comments Destroy
router.delete("/:commentId", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.commentId, function(err) {
        res.redirect("/campgrounds/" + req.params.id);
    })
});



module.exports = router;