var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
    {
        name: "Vienna",
        image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2b0a68081d1ed7ec4004307d81e12fd0&auto=format&fit=crop&w=1052&q=80",
        description: "Bacon ipsum dolor amet short ribs turkey shoulder bresaola. Picanha ball tip alcatra doner pork chop, buffalo meatloaf. Ground round andouille burgdoggen shankle prosciutto, tri-tip meatloaf t-bone beef ribs. Turkey pancetta turducken pork belly. Sirloin pork pastrami, jerky brisket shank boudin. Flank corned beef pork short ribs beef, pastrami tri-tip. Cupim pork belly biltong, sausage pork loin ham hock picanha."
    },
    {
        name: "Budapest",
        image: "https://images.unsplash.com/photo-1505567959736-13553ce10cb4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9bad0082e6591c9e8f6d5742b16aeb50&auto=format&fit=crop&w=1050&q=80",
        description: "Shoulder ribeye porchetta, pork belly swine salami turkey meatball rump shankle. Swine flank landjaeger, sausage pork loin boudin spare ribs beef ribs leberkas rump meatloaf chicken beef meatball tenderloin. Sirloin corned beef beef tri-tip tongue swine biltong turducken ham hock rump brisket strip steak. Drumstick prosciutto brisket short loin, hamburger pig frankfurter tenderloin buffalo meatloaf cupim chuck."
    },
    {
        name: "Berner Oberland",
        image: "https://images.unsplash.com/photo-1521065865215-4dce7206664f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0f98b03a31a8289395cb1f9cde284b37&auto=format&fit=crop&w=1050&q=80",
        description: "Porchetta tail pastrami, cupim corned beef doner venison frankfurter swine cow short loin flank picanha. Alcatra meatball picanha bacon sausage. Shank tail turducken fatback, spare ribs burgdoggen pork belly tri-tip chuck andouille ham frankfurter. Cupim bresaola pancetta spare ribs corned beef kevin leberkas. Beef ham bresaola jerky kielbasa, shank swine pig sausage. Biltong drumstick tongue, leberkas chuck sausage jerky burgdoggen strip steak pork loin ground round turkey. Meatball tongue chuck swine sausage pig."
    },
    {
        name: "Salzburg",
        image: "https://images.unsplash.com/photo-1436454421951-a8c518cba39b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0482eb3dd216a9ec9a70539681ffbf1e&auto=format&fit=crop&w=1055&q=80",
        description: "Meatloaf andouille corned beef short loin leberkas hamburger spare ribs flank chuck pig turducken kevin t-bone drumstick ribeye. Pastrami t-bone burgdoggen tenderloin, bresaola ham buffalo flank. Chuck capicola doner, hamburger salami drumstick boudin shank. Kevin biltong leberkas ball tip andouille pork hamburger meatloaf chuck cow."
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
            // data.forEach(function(seed) {
            //     Campground.create(seed, function(err, campground) {
            //         if (err) {
            //             console.log(err);
            //         } else {
            //             console.log("added a campground: " + campground.name);

            //             // Create comment
            //             Comment.create(
            //                 {
            //                     text: "Great place!",
            //                     author: "Caleb"
            //                 }, function (err, comment) {
            //                     if (err) {
            //                         console.log(err);
            //                     } else {
            //                         campground.comments.push(comment);
            //                         campground.save();
            //                         console.log("added a comment");
            //                     }
            //                 }
            //             );
            //         }
            //     });
            // });
        }
    });

    // Add a few comments
}

module.exports = seedDB;