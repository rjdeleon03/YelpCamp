var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground")
    seedDB      = require("./seeds");

seedDB();

// Required for parsing post params
app.use(bodyParser.urlencoded({extended: true}));

// Treat all pages to render as ejs
app.set("view engine", "ejs");

// Connect mongoose
mongoose.connect("mongodb://localhost/yelpcamp");

app.get("/", function(req, res) {
    res.render("landing");
});

// Campground.create({
//     name: "Riomaggiore",
//     image: "https://images.unsplash.com/photo-1483984937723-e978b50f0e2a?ixlib=rb-0.3.5&s=f59f49aebad5e2e41271397acd1f440d&auto=format&fit=crop&w=1052&q=80",
//     description: "Riomaggiore is a village and comune in the province of La Spezia, situated in a small valley in the Liguria region of Italy. It is the first of the Cinque Terre one meets when travelling north from La Spezia."
// });

// INDEX ROUTE
app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from db
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: campgrounds});
        }
    })
});

// NEW ROUTE
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
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
            res.render("show.ejs", {campground: foundCampground});
        }
    });
});

app.listen(3000, function() {
    console.log("YelpCamp is running...");
});