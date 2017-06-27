var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}))

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Restya Ballz Resort", 
//         image: "https://static.pexels.com/photos/25540/pexels-photo-25540.jpg",
//         description: "This is a nice place to rest your balls."
        
//     }, function(err, campground){
//     if(err){
//         console.log("Theres been a mishap!");
//         console.log(err);
//     }else{
//         console.log("Newly created campground!");
//         console.log(campground);
//     }
// });

    


app.get("/", function(req, res){

    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
        //Get all campgrounds from DB
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            }else{
                res.render("index", {campgrounds:allCampgrounds});
            }
        });
        
        
});

//NEW
app.get("/campgrounds/new", function(req, res){
    res.render("new");
    
});
//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("show", {campground: foundCampground});
        }
    })
    req.params.id
    // render show template with that campground
    
    
    res.render("show");
});

//CREATE
app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    })
    
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
})

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("yelpcamp server has started");
});