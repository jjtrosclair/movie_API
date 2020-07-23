const express = require('express');
const app = express();
morgan = require('morgan');

app.use(morgan('common'));

app.get('/movies', (req, res) => {

    let movies = [
            {
                "name": "Drowning by Numbers",
                "director": "Peter Greenaway",
                "release": "1988"
            },
        
            {
                "name": "Sicario",
                "director": "Dennis Villeneuve",
                "release": "2015"
            },
        
            {
                "name": "The Life Aquatic with Steve Zissou",
                "director": "Wes Anderson",
                "release": "2004"
            },
        
            {
                "name": "There Will Be Blood",
                "director": "Paul Thomas Anderson",
                "release": "2007"
            },
        
           {
                "name": "No Country for Old Men",
                "director": "The Coen Brothers",
                "release": "2007"
            },
        
          {
                "name": "Winter's Bone",
                "director": "Debra Granik",
                "release": "2010"
            },
        
          {
                "name": "Full Metal Jacket",
                "director": "Stanley Kubrick",
                "release": "1987"
            },
        
            {
                "name": "Uncut Gems",
                "director": "The Safdie Brothers",
                "release": "2019",
            },
        
            {
                "name": "The Departed",
                "director": "Martin Scorsese",
                "release": "2006",
            },
        
         {
                "name": "Casino Royale",
                "director": "Martin Campbell",
                "release": "2006"
            }
        
        ]

  
});


app.get('/', (req, res) => {
        let responseText = 'Welcome!';
  res.send(responseText);

});

app.use(express.static('public'));



  // Gets the list of data about ALL movies

app.get('/movies', (req, res) => {
    // res.json(movies);
    res.status(201);
  });

// Gets the data about a single movie, by name

app.get('/movies/:name', (req, res) => {
    // res.json(movies.find((movie) =>
    //   { return movie.name === req.params.name }));
    res.status(201)
  });

// Gets the data about a single genre, by name

app.get('/genres/:name', (req, res) => {
    // res.json(genres.find((genre) =>
    //   { return genre.name === req.params.name }));
    res.status(201)
  });

  // Gets the data about a single director, by name

app.get('/directors/:name', (req, res) => {
    // res.json(directors.find((director) =>
    //   { return director.name === req.params.name }));
    res.status(201)
  });

// Allow users to register

app.post('/users', (req, res) => {
    

    // users.create({
    //     Username: req.body.Username,
    //     Password: req.body.Password,
    //     Email: req.body.Email,
    //     DateOfBirth: req.body.DateOfBirth
        
    //   });
      
     res.status(201).send("Account was successfully created.");
  });

// Allow users to update their account

app.put('/users/:Username', (req, res) => {
    res.status(201).send("Account was successfully updated.");
});

//Allow users to add a movie to their favorites

app.post("/users/:Username/Favorites/:name", (req, res) => {
    // res.status(201).send(re.params.movieName + " was successfully added to your favorites.");
    res.status(201).send("MOVIE was successfully added to your favorites.");
});

//Allow users to delete a movie to their favorites

app.delete('/users/:Username/Favorites/:name, (req, res) => {
    // res.status(201).send(re.params.movieName + " was successfully removed from your favorites.");
    res.status(201).send("MOVIE was successfully removed from your favorites.");
});

app.delete('/users', (req, res) => {
    res.status(201).send("Account was successfully deleted.");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Uh oh!');
  });

app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);


