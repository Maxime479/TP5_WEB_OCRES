const express = require('express')
const router = express.Router();


// Lodash utils library
const _ = require('lodash');

//Axios Library
const axios = require('axios').default;



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
            "Joaquin Phoeni",
            "Robert De Nir",
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
            "Sam Worthingto",
            "Zoe Saldan",
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
            "Leonardo DiCapri",
            "Kate Winsle",
            "Billy Zane"
        ],
        poster: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
        boxOffice: 659363944,
        rottenTomatoesScore: 89
    }
]


// function movieFound(data){
//
// }


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
                console.log("--------ERROR--------");

                movies.splice(movies.length-1, 1)

            }else{
                console.log("--------SUCCESS--------");
                console.log("Film Found");
                console.log(axiosData);
                console.log("--------SUCCESS--------");

                if(newMovie){
                    movies.push({id: id, movie: movieName});
                }

                addMovieInfos(movieName, id, axiosData);
            }


        })
        // .then(data => {
        //     console.log("--------VA--------");
        //     console.log(data.data);
        //     console.log("--------VA--------");
        //
        //     // datas.push(data.data);
        // })
        // .catch(function (error) {
        //     console.log(error);
        //     // this.datas =  '#ERROR#';
        // });

    // console.log("--------AFTER--------");
    // console.log(axiosData);
    // console.log("--------AFTER--------");
    // return axiosData;

}

function addMovieInfos(movieName, id, datas){

    // let datas = getDatas(movieName);
    // let datas = axiosData;

    // console.log("________movieName__________");
    // console.log(movieName);
    // console.log("________id__________");
    // console.log(id);
    console.log("________datas__________");
    console.log(datas);
    console.log("________datas__________");

    const movieToUpdate = _.find(movies, ["id", id]);

    let adjustBoxOffice = datas.BoxOffice;
    adjustBoxOffice = adjustBoxOffice.replace(",", "");
    adjustBoxOffice = adjustBoxOffice.replace(",", "");
    let adjustTomatoesScore = datas.Ratings[1].Value;
    let adjustActors = datas.Actors;


    let firstComma = adjustActors.indexOf(",");
    let secondComma = adjustActors.indexOf(",", firstComma+1);

    let actorsList = [];


    // console.log("________Comma__________");
    // console.log(firstComma);
    // console.log(secondComma);
    // console.log("________Comma__________");

    actorsList.push(adjustActors.slice(0, firstComma))
    actorsList.push(adjustActors.slice(firstComma+2, secondComma))
    actorsList.push(adjustActors.slice(secondComma+2, adjustActors.length))


    movieToUpdate.movie = datas.Title;

    movieToUpdate.yearOfRelease = parseInt(datas.Year);
    movieToUpdate.duration = parseInt(datas.Runtime);

    movieToUpdate.actors = actorsList;
    movieToUpdate.poster = datas.Poster;
    movieToUpdate.boxOffice = parseInt(adjustBoxOffice.slice(1, adjustBoxOffice.length));
    movieToUpdate.rottenTomatoesScore = parseInt(adjustTomatoesScore);

}



let innitDone = false;
function idInnit(){
    if (innitDone===false){
        for(let i=0; i<movies.length; i++){
            const id = _.uniqueId();
        }
        //Faire une verif de movies.length = movies.lastId
        innitDone=true;
    }
}




// const getBreeds = async () => {
//     try {
//         return await axios.get('https://dog.ceo/api/breeds/list/all')
//             } catch (error) {
//         console.error(error)
//     }
// }
//
//
// const countBreeds = async () => {
//     const breeds = await getBreeds()
//
//
//     if (breeds.data.message) {
//         // console.log(Got </span><span style="color:#e6db74">${</span>Object.<span style="color:#a6e22e">entries</span>(<span style="color:#a6e22e">breeds</span>.<span style="color:#a6e22e">data</span>.<span style="color:#a6e22e">message</span>).<span style="color:#a6e22e">length</span><span style="color:#e6db74">}</span><span style="color:#e6db74"> breeds)
//         console.log("________________________")
//         console.log("Got it !")
//         console.log("________________________")
// }
// }
//
//
// countBreeds()


// axios({
//     url: 'https://dog.ceo/api/breeds/list/all',
//     method: 'get',
//     data: {
//         foo: 'bar'
//     }
// })


// new Vue({
//     el: '#app',
//     data () {
//         return {
//             info: null
//         }
//     },
//     mounted () {
//         axios
//             .get('https://api.coindesk.com/v1/bpi/currentprice.json')
//             .then(response => (this.info = response))
//     }
// })




// axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
//     .then(response => {
//
//         ress = response.data;
//
//         // console.log(response.data.url);
//         // console.log(response.data.explanation);
//     })
//     .catch(error => {
//         console.log(error);
// });
//
//
// let maj = function (){
//     if(ress !== null){
//         movies[5].movie = ress;
//     }
// }





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


// POST localhost:3000/movies/axios/:movieName Add Movie and infos with uniqueId with AXIOS
router.post('/axios/', (req, res) => {
    const {movieName} = req.body;
    let findMovie = _.find(movies, ["movie", movieName]);

    let newMovie;

    console.log("________movieName__________");
    console.log(movieName);
    console.log("________findMovie__________");
    console.log(findMovie);
    // console.log("________datas__________");
    // console.log(datas);
    console.log("__________________");


    if(findMovie !== undefined){



        // addMovieInfos(findMovie.movie, findMovie.id);
        getDatas(findMovie.movie, findMovie.id, false);

        newMovie = _.find(movies, ["movie", movieName]);
    }else{

        idInnit();
        const id = _.uniqueId();

        // movies.push({id: id, movie: movieName});


        // addMovieInfos(movieName, id);
        getDatas(movieName, id, true);

        newMovie = _.find(movies, ["id", id]);
    }

    // newMovie = _.find(movies, ["id", findMovie.id]);

    res.status(200).json({
        message: `Film ${movieName} added to bdd with axios`,
        newMovie
    });
});



// PUT localhost:3000/movies/ -- Ajoute un film via son nom
router.put('/', (req, res) => {
    const { movie } = req.body;
    idInnit();
    const id = _.uniqueId();

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

    // movieToUpdate.movie = movie;
    movieToUpdate.movie = movie;

    res.json({
        message: `Movie's name, with id (${id}), updated to ${movie}`,
        movie
    });

});


// DELETE localhost:3000/movies/:id -- Efface un film via son id
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    const movie = _.find(movies, ["id", id]);

    _.remove(movies, ["id", id]);

    res.json({
        message: `Movie ${movie.movie} deleted successfully`
    });
});



module.exports = router;

