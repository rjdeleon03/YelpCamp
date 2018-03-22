var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// Required for parsing post params
app.use(bodyParser.urlencoded({extended: true}));

// Treat all pages to render as ejs
app.set("view engine", "ejs");

// Campgrounds array
var campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144394f6c470a4e8b5_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144394f6c470a4e8b5_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/eb32b9072ef3063ed1584d05fb1d4e97e07ee3d21cac104497f1c77caeeeb0b8_340.jpg"}
];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
    // Get data from form and add to campgrounds array
    console.log(req.body);
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);

    //Redirect to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})

app.listen(3000, function() {
    console.log("YelpCamp is running...");
});