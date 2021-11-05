import React from "react";
import ListeFilms from "./ListeFilms";
export default class Container extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            searchMovie: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    helloMessage = () => {

        fetch("/server/hello")
            .then((res) => res.json())
            .then((data) => this.setState({data: data.message}));


    };

    // fetching GET routes from server.js
    callBackendAPI = async () => {
        const response = await fetch('/movies');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }


        return body;
    };

    //Getting Datas
    componentDidMount() {
        this.callBackendAPI()
            .then(data => {
                // console.log("--------VA--------")
                // console.log(data)
                this.setState({ moviesData : data.movies })
            })
            .catch(err => console.log(err));
    }




    handleChange(event) {
        this.setState({searchMovie: event.target.value});

        // this.addMovieOnDb(event.target.value);

    }

    handleSubmit(event) {
        // alert('Le nom a été soumis : ' + this.state.searchMovie);

        //Page refresh after uploading data on server
        window.location.reload();

        this.addMovieOnDb(this.state.searchMovie);

        event.preventDefault();
    }

    addMovieOnDb = (movie) => {

        let url = "/movies/axios";

        console.log("________MOVIE_________");
        console.log(movie);
        console.log("________MMMMM_________");

        fetch('/movies/axios/', {
            method: 'POST',
            body: JSON.stringify({movieName: movie}),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(json => console.log(json))
    }




    render() {
        return(

            <div className="App">

                <header>

                    <h1 className="mainTitle">
                        mainTitle
                    </h1>


                </header>


                <form onSubmit={this.handleSubmit} className="addMovie">
                    <input
                        type="text"
                        onChange={this.handleChange}
                        placeholder="Add movie..."
                        className="area"
                        required
                    />
                    <input
                        type="submit"
                        value="Search"
                        className="button"
                        // onClick={this.setState({searchMovie: })}
                    />
                </form>



                {/*<button onClick={() => {console.log(this.state)}}>*/}
                        {/*    Show Data*/}
                        {/*</button>*/}

                        {/*<p>{!this.state.data ? "Loading..." : this.state.data}</p>*/}


                        <ListeFilms
                            caller={this.state}
                        />




            </div>

        )
    }
}




