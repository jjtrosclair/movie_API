const express = require("express");
const app = express();
morgan = require("morgan");
const bodyParser = require("body-parser");
uuid = require("uuid");
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true});

//Middleware
app.use(express.static("public"));
app.use(morgan("common"));
app.use(bodyParser.json());





// Gets the list of data about ALL movies

app.get("/movies", (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

// Gets the data about a single movie, by name

app.get("/movies/:Title", (req, res) => {
    Movies.findOne({ Title: req.params.Title})
    .then((movie) => {
        res.json(movie);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Gets the data about a single genre, by name

app.get("/movies/Genre/:Name", (req, res) => {
    Movies.findOne({ "Genre.Name": req.params.Name})
    .then((movies) => {
        res.json(movies.Genre.Description);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Gets the data about a single director, by name

app.get("/movies/Director/:Name", (req, res) => {
    Movies.findOne({ "Director.Name": req.params.Name})
    .then((movies) => {
        res.json(   "Name: " +
        movies.Director.Name +
        " Bio: " +
        movies.Director.Bio +
        " Birth: " +
        movies.Director.Birth
    );
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Allow users to register

app.post("/users", (req, res) => {
    Users.findOne({Username: req.body.Usermame})
    .then((user) => {
        if (user) {
            return res.status(400).send(req.body.Username + 'already exists');
        } else {
            Users
                .create({
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday

                })
            .then((user) =>{res.status(201).json(user) })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error: ' + error);
            })
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
    });
});


// Allow users to update their account

app.put("/users/:Username", (req, res) => {
    Users.findOneAndUpdate({Username: req.params.Username}, {
        $set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    },
    {new: true}, //makes sure updated doc is returned
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
    });

//Allow users to add a movie to their favorites

app.post("/users/:Username/movies/:MovieID", (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username}, {
        $push: {FavoriteMovies: req.params.MovieID}
    },
    {new: true},
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

//Allow users to delete a movie from their favorites

app.delete("/users/:Username/movies/:MovieID", (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username}, {
        $pull: {FavoriteMovies: req.params.MovieID}
    },
    {new: true},
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

app.delete("/users/:Username", (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username})
    .then((user) => {
        if (!user) {
            res.status(400).send(req.params.Username + ' was not found');
        } else {
            res.status(200).send(req.params.Username + ' was deleted.');
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send("Uh oh!");
});

app.listen(8080, () => console.log("Your app is listening on port 8080."));

