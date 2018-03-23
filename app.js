var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground");

// Required for parsing post params
app.use(bodyParser.urlencoded({extended: true}));

// Treat all pages to render as ejs
app.set("view engine", "ejs");

// Connect mongoose
mongoose.connect("mongodb://localhost/yelpcamp");


// Setup schema

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from db
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: campgrounds});
        }
    })
});

app.post("/campgrounds", function(req, res) {
    // Get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
        
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

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})

app.listen(3000, function() {
    console.log("YelpCamp is running...");
});