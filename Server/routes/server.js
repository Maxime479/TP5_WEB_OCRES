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


let serverMessages = [
    {
        id: "1",
        message: "Hello from server!",
    },
    {
        id: "2",
        message: "Redirection",
    },
    {
        id: "3",
        message: "",
    },
    {
        id: "4",
        message: "Jumanji",
    },
]


router.get("/hello", (req, res) => {
    res.json({ message: "Hello from server!" });
});



//
// // GET localhost:3000/movies -- Affiche tout les films
// router.get('/', (req, res) => {
//     res.status(200).json({movies});
// });
//
//
// // GET localhost:3000/movies/:id -- Affiche un film via son id
// router.get('/:id', (req, res) => {
//     const {id} = req.params;
//     const movie = _.find(movies, ["id", id]);
//
//     res.status(200).json({
//         message: 'Film found!',
//         movie
//     });
// });
//
//
// // PUT localhost:3000/movies/ -- A  joute un film via son nom
// router.put('/', (req, res) => {
//     const { movie } = req.body;
//     const id = _.uniqueId('0');
//
//     movies.push({id, movie});
//
//     res.json({
//         message: `Movie ${movie} added to BDD!`,
//         movie: { id, movie }
//     });
// });
//
//
// // POST localhost:3000/movies/:id -- Update un film via son id
// router.post('/:id', (req, res) => {
//     const {id} = req.params;
//     const {movie} = req.body;
//     const movieToUpdate = _.find(movies, ["id", id]);
//
//     movieToUpdate.movie = movie;
//
//     res.json({
//         message: `Movie's name, with id (${id}), updated to ${movie}`
//     });
//
// });
//
//
// // DELETE localhost:3000/movies/:id -- Efface un film via son id
// router.delete('/:id', (req, res) => {
//     const {id} = req.params;
//     const movie = _.find(movies, ["id", id]);
//
//     _.remove(movies, ["id", id]);
//
//     res.json({
//         message: `Movie ${movie} deleted successfully`
//     });
// });
//
//
//








module.exports = router;

