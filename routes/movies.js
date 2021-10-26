const express = require('express')

// Lodash utils library
const _ = require('lodash');

const router = express.Router();


let movies = [{
    id: "1",
        movie: "Free Guy",
},
{
    id: "2",
        movie: "Fight Club",
},
{
    id: "3",
        movie: "Le Loup de Wall Street",
},
{
    id: "4",
        movie: "Jumanji",
},
]

// GET localhost:3000/movies -- Affiche tout les films
router.get('/', (req, res) => {
    res.status(200).json({movies});
});


// GET localhost:3000/movies/:id -- Affiche un film via son id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    const movie =_.find(['id', id]);

    res.status(200).json({
        message: 'Film found!',
        movie
    });
});


// PUT localhost:3000/movies/ -- Ajoute un film via son nom
router.put('/',  (req, res) => {
    const {movie} = req.body;
    const id = _.uniqueId();

    movies.push({id, movie});

    res.json({
        message: `Movie ${id} added to BDD!`,
        movie: {id, movie}
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

