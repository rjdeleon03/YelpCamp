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
router.get("/new", function(req, res) {
    res.render("campgrounds/new");
});

// Campgrounds Create
router.post("/", function(req, res) {
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

module.exports = router;
