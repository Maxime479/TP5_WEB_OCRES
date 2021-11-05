import React from 'react';

export default class Film extends React.Component{

    constructor(props){
        super(props);

        // this.state = {
        //
        // }
    }

    showActors = (actors) => {

        let i = 1;
        let arra = []
        arra = actors;
        const len = arra.length;

        let stringActors = actors.toString();

        if(stringActors.includes("Unkn")){
            return "Unk";
        }

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

        if(minutes)

            return hours + "h" + minutes
    }

    showMoney = (money) => {

        let stringMoney = money.toString();

        let length = stringMoney.length;
        let newMoney = "";

        let addDigit = length % 3;


        if(length === 1){
            return "Unk";
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




    render() {

        let newMovie = this.props.caller;


        return(

            <div className="propFilm" style={{backgroundImage: 'url("' + newMovie.poster + '")'}}>

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
                            <a className="score">&#127813; {newMovie.rottenTomatoesScore}%</a>
                            <a className="boxOffice"><span className="br">Box Office : </span>{this.showMoney(newMovie.boxOffice)}</a>
                        </div>

                    </div>


                </div>






            </div>





        )
    }
}