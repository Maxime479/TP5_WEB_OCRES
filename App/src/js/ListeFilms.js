import React from 'react';
import Film from "./Film";

export default class ListeFilms extends React.Component{

    render() {

        var filmList = [];

        // for (var i = 0; i < this.props.level; i++) {
        //     filmList.push(
        //         <span className='indent' key={i}></span>
        //     );
        // }


        const extractData = this.props.caller.moviesData;

        if(extractData === undefined){
            console.log("EMPTY");

            return (
                <div>
                    Data Loading...
                </div>
            )
        }else{
            console.log("LOADED");

            for(let movieIndex=0; movieIndex<extractData.length; movieIndex++){
                filmList.push(
                    <Film
                        caller={extractData[movieIndex]}
                    />
                )

            }


            return(

                <div className="listeFilms">

                    {filmList}


                </div>

            )


        }





    }
}