var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground")
    seedDB      = require("./seeds");


// Required for parsing post params
app.use(bodyParser.urlencoded({extended: true}));

// Treat all pages to render as ejs
app.set("view engine", "ejs");

// Connect mongoose
mongoose.connect("mongodb://localhost/yelpcamp");

// Seed database
seedDB();

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

app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.listen(3000, function() {
    console.log("YelpCamp is running...");
});