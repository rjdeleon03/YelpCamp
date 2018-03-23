var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
    {
        name: "Vienna",
        image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2b0a68081d1ed7ec4004307d81e12fd0&auto=format&fit=crop&w=1052&q=80",
        description: "Vienna, Austria"
    },
    {
        name: "Budapest",
        image: "https://images.unsplash.com/photo-1505567959736-13553ce10cb4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9bad0082e6591c9e8f6d5742b16aeb50&auto=format&fit=crop&w=1050&q=80",
        description: "Budapest, Hungary"
    },
    {
        name: "Berner Oberland",
        image: "https://images.unsplash.com/photo-1521065865215-4dce7206664f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0f98b03a31a8289395cb1f9cde284b37&auto=format&fit=crop&w=1050&q=80",
        description: "Berner Oberland, Hungary"
    },
    {
        name: "Salzburg",
        image: "https://images.unsplash.com/photo-1436454421951-a8c518cba39b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0482eb3dd216a9ec9a70539681ffbf1e&auto=format&fit=crop&w=1055&q=80",
        description: "Salzburg, Austria"
    },
];

function seedDB() {

    // Clear campground db
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("removed campgrounds!");

            // Add some campgrounds
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("added a campground: " + campground.name);

                        // Create comment
                        Comment.create(
                            {
                                text: "Great place!",
                                author: "Caleb"
                            }, function (err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("added a comment");
                                }
                            }
                        );
                    }
                });
            });
        }
    });

    // Add a few comments
}

module.exports = seedDB;