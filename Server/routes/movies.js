const express = require('express')
const router = express.Router();


// Lodash utils library
const _ = require('lodash');

//Axios Library
const axios = require('axios').default;

// PM2
//pm2 start bin/www --watch



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
    },{
        id: "2",
        movie: "Fight Club",
        yearOfRelease: 1999,
        duration: 139,
        actors: ["Brad Pitt", "Edward Norton", "Meat Loaf"],
        poster: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/d1dd8c0c5a5fcee2c9b60387fdd548700048134a8f9b395d1d225a0c97d4a25c._RI_V_TTW_.jpg",
        boxOffice: 101200000,
        rottenTomatoesScore: 79,
    },{
        id: "3",
        movie: "Le Loup de Wall Street",
        yearOfRelease: 2013,
        duration: 179,
        actors: ["Leonardo DiCaprio", "Jonah Hill", "Margot Robbie"],
        poster: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/cb70325a0ae619c0b429151c6e34792d4821303ea39475a2baf912ba340b2b4a._RI_V_TTW_.jpg",
        boxOffice: 392000000,
        rottenTomatoesScore: 79,
    },{
        id: "4",
        movie: "Jumanji",
        yearOfRelease: 2019,
        duration: 123,
        actors: ["Dwayne Johnson", "Kevin Hart", "Jack Black"],
        poster: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/f641bbf64201e9f10cc871b16b6c752e60acd675b281d90efa4fec6646b69b11._RI_V_TTW_.jpg",
        boxOffice: 800100000,
        rottenTomatoesScore: 71,
    },{
        id: "5",
        movie: "Joker",
        yearOfRelease: 2019,
        duration: 122,
        actors: [
            "Joaquin Phoenix",
            "Robert De Niro",
            "Zazie Beetz"
        ],
        poster: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
        boxOffice: 335451311,
        rottenTomatoesScore: 68
    },
    {
        id: "6",
        movie: "Avatar",
        yearOfRelease: 2009,
        duration: 162,
        actors: [
            "Sam Worthington",
            "Zoe Saldana",
            "Sigourney Weaver"
        ],
        poster: "https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_SX300.jpg",
        boxOffice: 760507625,
        rottenTomatoesScore: 81
    },
    {
        id: "7",
        movie: "Titanic",
        yearOfRelease: 1997,
        duration: 194,
        actors: [
            "Leonardo DiCaprio",
            "Kate Winslet",
            "Billy Zane"
        ],
        poster: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
        boxOffice: 659363944,
        rottenTomatoesScore: 89
    }
]

var tempData = {
    error: false,
    datas: undefined,
};


function newId(){

    let newId = 0;
    let tempDa;

    do{
        newId++;
        tempDa = _.find(movies, ["id", newId.toString()])
    }while (tempDa !== undefined)

    return newId.toString();

}


function getDatas(movieName, id, newMovie){
    let URL = 'http://www.omdbapi.com/?t=' + movieName + '&apikey=322d7f6f';

    var axiosData = {};


    let config = {
        method: 'get',
        url: URL,
        headers: {
            'apikey': '322d7f6f'
        }
    };



    axios(config)
        .then(function (response) {
            // console.log("--------JSON--------");
            // // console.log(JSON.stringify(response.data));
            // console.log(response.data);
            // console.log("--------JSON--------");

            axiosData = response.data;

            const res = axiosData.Response;




            if(res.includes('False')){
                console.log("--------ERROR--------");
                console.log("Film Not Found");
                console.log(axiosData);
                console.log("___________________________________");

                tempData.error = true;
                tempData.datas = null;

                // movies.splice(movies.length-1, 1)

            }else{
                console.log("--------SUCCESS--------");
                console.log("Film Found");
                console.log(axiosData);
                console.log("___________________________________");


                if(newMovie){
                    tempData.newMovie = true;
                    // movies.push({id: id, movie: movieName});
                    movies.push({id: id});
                    console.log("--------THIS IS A NEW MOVIE--------");
                }else{
                    tempData.newMovie = false;
                    console.log("--------THIS IS NOT A NEW MOVIE--------");
                }


                addMovieInfos(movieName, id, response.data);

                tempData.error = false;
                tempData.datas = movies[id];

            }

        })

}

function addMovieInfos(movieName, id, datas){

    console.log("________Data get from OMBD__________");
    console.log(datas);
    console.log("___________________________________");

    let nb = Number(id);
    if(nb!==1){
        nb--;
    }

    // console.log("________ID__________");
    // console.log(id);
    // console.log(nb);
    // console.log("________ID__________");



    const movieToUpdate = _.find(movies, ["id", id], nb);

    // console.log("________movieToUpdate__________");
    // console.log(movieToUpdate);
    // console.log("___________________________________");


    let adjustBoxOffice = datas.BoxOffice;

    if(adjustBoxOffice !== undefined){
        adjustBoxOffice = adjustBoxOffice.replace(",", "");
        adjustBoxOffice = adjustBoxOffice.replace(",", "");
        adjustBoxOffice = parseInt(adjustBoxOffice);
    }

    let adjustTomatoesScore;
    if(datas.Ratings[1] === undefined){
        adjustTomatoesScore = 0;
    }else{
        adjustTomatoesScore = datas.Ratings[1].Value;
    }


    let adjustActors = datas.Actors;
    let actorsList = [];

    if(adjustActors!== undefined){
        let firstComma = adjustActors.indexOf(",");
        let secondComma = adjustActors.indexOf(",", firstComma+1);


        // console.log("________Comma__________");
        // console.log(firstComma);
        // console.log(secondComma);
        // console.log("________Comma__________");

        actorsList.push(adjustActors.slice(0, firstComma))
        actorsList.push(adjustActors.slice(firstComma+2, secondComma))
        actorsList.push(adjustActors.slice(secondComma+2, adjustActors.length))


    }else{
        actorsList = undefined;
    }






    movieToUpdate.movie = datas.Title;

    movieToUpdate.yearOfRelease = parseInt(datas.Year);
    movieToUpdate.duration = parseInt(datas.Runtime);

    movieToUpdate.actors = actorsList;
    movieToUpdate.poster = datas.Poster;
    // movieToUpdate.boxOffice = parseInt(adjustBoxOffice.slice(1, adjustBoxOffice.length));
    movieToUpdate.boxOffice = adjustBoxOffice;
    movieToUpdate.rottenTomatoesScore = parseInt(adjustTomatoesScore);

    correctError(movieToUpdate);

    // console.log("________movieToUpdateCorrect__________");
    // console.log(movieToUpdate);
    // console.log("______________________________________");

}

function correctError(movieToUpdate){
    let temp = movieToUpdate.boxOffice;
    // console.log("________CORRECT__________");
    // console.log(temp);
    // console.log(movieToUpdate);
    // console.log("________CORRECT__________");


    if (movieToUpdate.movie === undefined){
        movieToUpdate.movie = "N/A";
    }

    if (isNaN(movieToUpdate.yearOfRelease)){
        movieToUpdate.yearOfRelease = 0;
    }

    if (isNaN(movieToUpdate.duration)){
        movieToUpdate.duration = 0;
    }

    if (movieToUpdate.actors === undefined){
        movieToUpdate.actors = "N/A";
    }

    if (movieToUpdate.poster === undefined){
        movieToUpdate.poster = "N/A";
    }

    if (isNaN(movieToUpdate.boxOffice)){
        movieToUpdate.boxOffice = 0;
    }

    if (isNaN(movieToUpdate.rottenTomatoesScore)){
        movieToUpdate.rottenTomatoesScore = 0;
    }


}

function capitalizeFirstLetter(movieName) {
    return movieName.charAt(0).toUpperCase() + movieName.slice(1);
}



// POST localhost:3000/movies/axios/:movieName Add Movie and infos with uniqueId with AXIOS
router.post('/axios/', (req, res) => {
    const {movieName} = req.body;
    let findMovie = _.find(movies, ["movie", movieName]);
    const capMovieName = capitalizeFirstLetter(movieName);
    let findMovieUpperCase = _.find(movies, ["movie", capMovieName]);

    console.log("________Search Movie Name__________");
    console.log(movieName);
    console.log("___________________________________");

    let message;
    let finalId = "";


    if((findMovie !== undefined) || (findMovieUpperCase !== undefined)){
        getDatas(findMovie.movie, findMovie.id, false);

        message = "updated from";
        finalId = findMovie.id;
    }else{
        const id = newId();
        getDatas(movieName, id, true);

        message = "added to";
        finalId = id;
    }


    let nb = Number(finalId);
    if(nb!==1){
        nb--;
    }

    // console.log("________ID__________");
    // console.log(finalId);
    // console.log(nb);
    // console.log("___________________________________");



    const error = tempData.error;
    let data = _.find(movies, {id: finalId}, nb);

    // const datas = _.find(movies, function (obj){
    //     if(obj.movie === movieName){
    //         return obj;
    //     }
    // });

    if(error === false){
        res.status(200).json({
            message: `Film ${movieName} ${message} bdd with axios`,
            data,
        });
    }else{
        res.status(404).json({
            message: `Film ${movieName} not found on OMBD`,
        });
    }




});






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


// PUT localhost:3000/movies/ -- Ajoute un film via son nom
router.put('/', (req, res) => {
    const { movie } = req.body;
    const id = newId();

    movies.push({id, movie});

    res.json({
        message: `Movie ${movie} added to BDD!`,
        movie: { id, movie }
    });
});


// POST localhost:3000/movies/:id -- Update le nom d'un film via son id
router.post('/:id', (req, res) => {
    const {id} = req.params;
    const {movie} = req.body;
    const movieToUpdate = _.find(movies, ["id", id]);

    const oldName = movieToUpdate.movie;

    // movieToUpdate.movie = movie;
    movieToUpdate.movie = movie;

    res.json({
        message: `Movie's name (${oldName}), with id (${id}), updated to ${movie}`,
        movieToUpdate
    });

});


// DELETE localhost:3000/movies/:id -- Efface un film via son id
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    const movie = _.find(movies, ["id", id]);

    _.remove(movies, ["id", id]);

    let movieName = movie.movie;
    if(movieName === undefined){
        movieName = "N/A";
    }

    res.json({
        message: `Movie ${movieName} deleted successfully`
    });
});


module.exports = router;

