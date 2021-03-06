var express     = require("express");
var router      = express.Router({mergeParams: true});
var middleware  = require("../middleware");

var Campground  = require("../models/campground");  

// Campgrounds Index
router.get("/", function(req, res) {
    // Get all campgrounds from db
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    })
});

// Campgrounds New
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// Campgrounds Create
router.post("/", middleware.isLoggedIn, function(req, res) {
    // Get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {
        name: name, 
        price: price,
        image: image, 
        description: description, 
        author: author
    };
        
    // Add newCampground to DB    
    Campground.create(newCampground, function (err, campground) {
            if (err) {
                req.flash("error", err.message + ".");
            } else {
                req.flash("success", "Successfully added campground.");
            }
            //Redirect to campgrounds page
            res.redirect("/campgrounds");
        }
    );
});

// Campgrounds Show
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            req.flash("error", err.message + ".");
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// Campgrounds Edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
      
    // Does user own campground?
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {            
            req.flash("error", err.message + ".");
            return res.redirect("/campgrounds");
        }
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// Campgrounds Update
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    // Find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            req.flash("error", err.message + ".");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Successfully edited campground.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Campgrounds Destroy
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    // Find and destroy correct campground
    Campground.findByIdAndRemove(req.params.id, function(err, removedCampground) {
        if (err) {
            req.flash("error", err.message + ".");
        } else {
            req.flash("success", "Successfully deleted campground.");
        }
        res.redirect("/campgrounds");
    });
});

module.exports = router;
