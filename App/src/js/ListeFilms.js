import React from 'react';
import Film from "./Film";

export default class ListeFilms extends React.Component{

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.setDefaultTranslation(this.props.context)
        }
    }

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

            let i= 0;

            for(let movieIndex=0; movieIndex<extractData.length; movieIndex++){

                console.log("_____LISTE______");
                i++;
                console.log(i);
                console.log(extractData[movieIndex]);
                console.log("_____LISTE______");

                filmList.push(
                    <Film
                        caller={extractData[movieIndex]}
                    />
                )

            }


            return(

                <div className="listeFilms">

                    {filmList}

                    {/*<Film*/}
                    {/*    caller={extractData[2]}*/}
                    {/*/>*/}


                </div>

            )


        }





    }
}