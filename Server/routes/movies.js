const express = require('express')
const router = express.Router();


// Lodash utils library
const _ = require('lodash');

//Axios Library
const axios = require('axios').default;

const instance = axios.create({
    baseURL: 'http://www.omdbapi.com/?t=inception&apikey=322d7f6f',
    method: 'get',
    timeout: 1000,

    transformRequest: [function (data, headers) {
        // Do whatever you want to transform the data

        return data;
    }],

    // `transformResponse` allows changes to the response data to be made before
    // it is passed to then/catch
    transformResponse: [function (data) {
        // Do whatever you want to transform the data

        return data;
    }],

    headers: {'X-Custom-Header': 'foobar'}
});


let movies = [
    {
        id: "1",
        movie: "Free Guy",
        yearOfRelease: 2021,
        duration: 115, // en minutes,
        actors: ["Ryan Reynolds", "Jodie Comer", "Joe Keery"],
        poster: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/fee52e38b0f738762bd6172085da2291da3cf72b755f9b413e4fc3aa2e3c0bae._RI_V_TTW_.jpg", // lien vers une image d'affiche,
        boxOffice: 302400000, // en USD$,
        rottenTomatoesScore: 80,
    },
    {
        id: "2",
        movie: "Fight Club",
        yearOfRelease: 1999,
        duration: 139,
        actors: ["Brad Pitt", "Edward Norton", "Meat Loaf"],
        poster: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/d1dd8c0c5a5fcee2c9b60387fdd548700048134a8f9b395d1d225a0c97d4a25c._RI_V_TTW_.jpg",
        boxOffice: 101200000,
        rottenTomatoesScore: 79,
    },
    {
        id: "3",
        movie: "Le Loup de Wall Street",
        yearOfRelease: 2013,
        duration: 179,
        actors: ["Leonardo DiCaprio", "Jonah Hill", "Margot Robbie"],
        poster: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/cb70325a0ae619c0b429151c6e34792d4821303ea39475a2baf912ba340b2b4a._RI_V_TTW_.jpg",
        boxOffice: 392000000,
        rottenTomatoesScore: 79,
    },
    {
        id: "4",
        movie: "Jumanji",
        yearOfRelease: 2019,
        duration: 123,
        actors: ["Dwayne Johnson", "Kevin Hart", "Jack Black"],
        poster: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/f641bbf64201e9f10cc871b16b6c752e60acd675b281d90efa4fec6646b69b11._RI_V_TTW_.jpg",
        boxOffice: 800100000,
        rottenTomatoesScore: 71,
    },
]

// GET localhost:3000/movies -- Affiche tout les films
router.get('/', (req, res) => {
    res.status(200).json({movies});
});


// GET localhost:3000/movies/:id -- Affiche un film via son id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    const movie = _.find(movies, ["id", id]);

    res.status(200).json({
        message: 'Film found!',
        movie
    });
});


// PUT localhost:3000/movies/ -- A  joute un film via son nom
router.put('/', (req, res) => {
    const { movie } = req.body;
    const id = _.uniqueId('0');

    movies.push({id, movie});

    res.json({
        message: `Movie ${movie} added to BDD!`,
        movie: { id, movie }
    });
});


// POST localhost:3000/movies/:id -- Update un film via son id
router.post('/:id', (req, res) => {
    const {id} = req.params;
    const {movie} = req.body;
    const movieToUpdate = _.find(movies, ["id", id]);

    movieToUpdate.movie = movie;

    res.json({
        message: `Movie's name, with id (${id}), updated to ${movie}`
    });

});


// DELETE localhost:3000/movies/:id -- Efface un film via son id
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    const movie = _.find(movies, ["id", id]);

    _.remove(movies, ["id", id]);

    res.json({
        message: `Movie ${movie} deleted successfully`
    });
});



module.exports = router;

