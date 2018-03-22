var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

// Required for parsing post params
app.use(bodyParser.urlencoded({extended: true}));

// Treat all pages to render as ejs
app.set("view engine", "ejs");

// Connect mongoose
mongoose.connect("mongodb://localhost/yelpcamp");

// Setup schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});
var Campground = mongoose.model("Campground", campgroundSchema);


// // Campgrounds array
// var campgrounds = [
//     {name: "Salmon Creek", image: "http://s3images.coroflot.com/user_files/individual_files/original_167452_JmmzN5W2h7lbUSmXoHBwzyttF.jpg"},
//     {name: "Granite Hill", image: "http://s3images.coroflot.com/user_files/individual_files/original_167452_fdzMPLBuTMswUEiORdviqebfC.jpg"},
//     {name: "Mountain Goat's Rest", image: "http://s3images.coroflot.com/user_files/individual_files/original_167452_SuthvSh2oIqvVP8R4iczat8ix.jpg"},
//     {name: "Salmon Creek", image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144394f6c470a4e8b5_340.jpg"},
//     {name: "Granite Hill", image: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144394f6c470a4e8b5_340.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/eb32b9072ef3063ed1584d05fb1d4e97e07ee3d21cac104497f1c77caeeeb0b8_340.jpg"},
//     {name: "Salmon Creek", image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144394f6c470a4e8b5_340.jpg"},
//     {name: "Granite Hill", image: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144394f6c470a4e8b5_340.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/eb32b9072ef3063ed1584d05fb1d4e97e07ee3d21cac104497f1c77caeeeb0b8_340.jpg"}
// ];

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
    console.log(req.body);
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
        
    // Add newCampground to DB    
    Campground.create(newCampground, function (err, campground) {
            if (err) {
                console.log(err);
            } else {
                console.log("NEWLY CREATED CAMPGROUND:");
                console.log(campground);
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