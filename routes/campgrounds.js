var express     = require("express");
var router      = express.Router();

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
router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// Campgrounds Create
router.post("/", isLoggedIn, function(req, res) {
    // Get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {
        name: name, 
        image: image, 
        description: description, 
        author: author
    };
        
    // Add newCampground to DB    
    Campground.create(newCampground, function (err, campground) {
            if (err) {
                console.log(err);
            } else {

                console.log(campground);
                //Redirect to campgrounds page
                res.redirect("/campgrounds");
            }
        }
    );
});

// Campgrounds Show
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// Campgrounds Edit
router.get("/:id/edit", checkCampgroundOwnership, function(req, res) {
      
    // Does user own campground?
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// Campgrounds Update
router.put("/:id", checkCampgroundOwnership, function(req, res) {
    // Find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Campgrounds Destroy
router.delete("/:id", checkCampgroundOwnership, function(req, res) {
    // Find and destroy correct campground
    Campground.findByIdAndRemove(req.params.id, function(err, removedCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log("REMOVED: " + removedCampground);
        }
        res.redirect("/campgrounds/");
    });
});

// Middleware for logged in state checking
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

// Middleware for campground ownership checking
function checkCampgroundOwnership(req, res, next) {
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

module.exports = router;
