import React from "react";
import WeatherDay from "./WeatherDay";
import { Card } from "react-bootstrap";


class Weather extends React.Component {
  render() {

    return (
      <>

        <Card.Title>Forcast for: {this.props.cityName}!</Card.Title>
        {/* this is the array of all of the weather. (came from app js if it exists) */}
        {/* && allows us to do an if statement without an else */}
        {this.props.weatherData && (

          this.props.weatherData.map((day, idx) => {
            return <WeatherDay day={day} />;
          })
          )
        };
      </>
    )
  }
}


export default Weather
