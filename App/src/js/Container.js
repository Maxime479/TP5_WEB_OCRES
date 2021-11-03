import React from "react";
import ListeFilms from "./ListeFilms";
export default class Container extends React.Component{

    constructor(props) {
        super(props);

        this.state = {}
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

    //Getting Data
    componentDidMount() {
        this.callBackendAPI()
            .then(data => {
                // console.log("--------VA--------")
                // console.log(data)
                this.setState({ moviesData : data.movies })
            })
            .catch(err => console.log(err));
    }




    render() {
        return(

            <div className="App">

                <header>

                    <h1>All Movies on DIY Database</h1>

                </header>


                        {/*<button onClick={() => {console.log(this.state)}}>*/}
                        {/*    Show Data*/}
                        {/*</button>*/}

                        {/*<p>{!this.state.data ? "Loading..." : this.state.data}</p>*/}


                        <ListeFilms caller={this.state} />




            </div>

        )
    }
}




