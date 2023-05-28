import React from "react";
import { Card } from "react-bootstrap";
import MovieDay from "./MovieDay";

class Movie extends React.Component {
  render() {

    return (
      <>
        <Card>
          <Card.Title>Movies for {this.props.cityName}!</Card.Title>
          {/* this is the array of all of the weather. (came from app js if it exists) */}
          {/* && allows us to do an if statement without an else */}
          {this.props.movieData && (

            this.props.movieData.map((eachMovie, idx) => {
              return <MovieDay eachMovie={eachMovie} />;
            })
          )
          };
        </Card>
      </>
    )
  }
}


export default Movie
