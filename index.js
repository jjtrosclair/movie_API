const express = require('express');
const app = express();
morgan = require('morgan');

app.use(morgan('common'));

app.get('/movies', (req, res) => {

    let favoriteMovies = {
            "first": {
                "name": "Drowning by Numbers",
                "director": "Peter Greenaway",
                "release": "1988"
            },
        
            "second": {
                "name": "Sicario",
                "director": "Dennis Villeneuve",
                "release": "2015"
            },
        
            "third": {
                "name": "The Life Aquatic with Steve Zissou",
                "director": "Wes Anderson",
                "release": "2004"
            },
        
            "fourth": {
                "name": "There Will Be Blood",
                "director": "Paul Thomas Anderson",
                "release": "2007"
            },
        
            "fifth": {
                "name": "No Country for Old Men",
                "director": "The Coen Brothers",
                "release": "2007"
            },
        
            "sixth": {
                "name": "Winter's Bone",
                "director": "Debra Granik",
                "release": "2010"
            },
        
            "seventh": {
                "name": "Full Metal Jacket",
                "director": "Stanley Kubrick",
                "release": "1987"
            },
        
            "eigth": {
                "name": "Uncut Gems",
                "director": "The Safdie Brothers",
                "release": "2019",
            },
        
            "ninth": {
                "name": "The Departed",
                "director": "Martin Scorsese",
                "release": "2006",
            },
        
            "tenth": {
                "name": "Casino Royale",
                "director": "Martin Campbell",
                "release": "2006"
            }
        
    }

    res.json(favoriteMovies);
});


app.get('/', (req, res) => {
        let responseText = 'Welcome!';
  res.send(responseText);

});

app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Uh oh!');
  });

app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);


