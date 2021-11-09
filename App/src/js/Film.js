import React from 'react';

export default class Film extends React.Component{

    constructor(props){
        super(props);

        // this.state = {
        //
        // }
    }

    showActors = (actors) => {

        if (actors === undefined){
            return "N/A";
        }

        let stringActors = actors.toString();

        if((stringActors.includes("Unkn")) || (stringActors.includes("N/A"))){
            return "N/A";
        }


        let i = 1;
        let arra = []
        arra = actors;
        const len = arra.length;


        return actors.map((act) => {

            if (i !== len) {
                i++;
                return <span>{act}, </span>

            } else {
                return <span>{act}</span>
            }

        });

    };

    showTime = (time) => {
        let hours = Math.floor(time /60);
        let minutes = time % 60

        if(minutes < 10){
            return hours + "h0" + minutes

        }

            return hours + "h" + minutes
    }

    showMoney = (money) => {

        let stringMoney = money.toString();

        let length = stringMoney.length;
        let newMoney = "";

        let addDigit = length % 3;


        if(length === 1){
            return "N/A";
        }

        switch (addDigit){
            case 0 :
                for(let i=0; i<length; i+=3) {
                    newMoney = newMoney + stringMoney.slice(i, i+3) + " ";
                }
                break;
            case 1 :
                newMoney += stringMoney.slice(0, 1) + " ";
                for(let i=0; i<length; i+=3) {
                    newMoney += stringMoney.slice(i, i+3) + " ";
                }
                break;
            case 2 :
                newMoney += stringMoney.slice(0, 2) + " ";
                for(let i=0; i<length; i+=3) {
                    newMoney += stringMoney.slice(i, i+3) + " ";
                }
                break;
        }


        return newMoney + " $";
    }

    showScore = (score) => {

        if(score === 0){
            return "N/A";
        }

        return score + "%";

    }


    showPoster = (poster) => {

        let link;
        let line;

        if((poster === undefined) || (poster.includes("N/A"))){
            link = "https://media-exp1.licdn.com/dms/image/C560BAQGQP6YcZyZKTA/company-logo_200_200/0/1525452789390?e=2159024400&v=beta&t=iB0ldPkxW8MIEgJmpL3EFav3trh7zZg8_Go1EyLm89s";
        }else{
            link = poster;
        }


        line = 'url("' + link + '")';

        return line;


    }




    render() {

        let newMovie = this.props.caller;


        return(

            <div className="propFilm" style={{backgroundImage: this.showPoster(newMovie.poster)}}>

                <div className="backgroundPoster">

                    <div className="shadow">

                        <div className="head">

                            <div className="left">
                                <a className="title">{newMovie.movie}</a>
                                <a className="year">,{newMovie.yearOfRelease}</a>
                            </div>

                            <a className="duration">{this.showTime(newMovie.duration)}</a>

                        </div>

                        {/*<span className="br"></span>*/}


                        <a className="actors"><span className="br">Actors : </span>{this.showActors(newMovie.actors)}</a>

                        <div className="bottom">
                            <a className="score">&#127813; {this.showScore(newMovie.rottenTomatoesScore)}</a>
                            <a className="boxOffice"><span className="br">Box Office : </span>{this.showMoney(newMovie.boxOffice)}</a>
                        </div>

                    </div>


                </div>






            </div>





        )
    }
}