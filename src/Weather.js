import React from "react";
import WeatherDay from "./WeatherDay";
import { Card } from "react-bootstrap";


class Weather extends React.Component {
  render() {

    return (
      <>
          <WeatherDay weatherData = {this.props.weatherData}/>
      <Card.Title>Forcast for: {this.props.cityName}!</Card.Title>
      </>


    )
  }
}


export default Weather
