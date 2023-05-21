import React from "react";
import axios from "axios";
import { Alert, Form, Button, Card } from "react-bootstrap"; 
import Weather from "./Weather.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityData: {},
      error: false,
      errorMessage: '',
      weatherData: [],
    }
  }


  handleCitySubmit = async (event) => {
    event.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`;

      console.log ('the url', url)

      let cityData = await axios.get(url);

      this.setState({
        //Passing in the the first object in the array. 
        cityData: cityData.data[0]
      });
    }

    catch (error) {
      console.log('error', error);
      console.log('error.message: ', error.message);
      this.setState({
        error: true,
        errorMessage: `An error occured: ${error.response.status}`
      });
    };
  }

    getWeather = async (lat, lon) => {
    try {
      let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?cityData=${this.state.cityName}&lat=${lat}&lon=${lon}`;

      console.log('the weather url', weatherUrl);
      let weatherResponse = await axios.get(weatherUrl);
      let weatherData = weatherResponse.data;
      this.setState({
        weatherData
      })
    } catch (error) {
      console.log('Weather Feature Down ', error);
    }
  };

  changeCityInput = (event) => {
    this.setState({
      cityName: event.target.value
    });
  }

  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <Form onSubmit={this.handleCitySubmit}>
          <Form.Label>Search for a City:
            <Form.Control onChange={this.changeCityInput} />
          </Form.Label>
          <Button type="submit">Explore!</Button>
        </Form>
        {
          this.state.error
            ? <Alert>{this.state.errorMessage}</Alert>
            : <Card>
              <Card.Title>{this.state.cityData.display_name}</Card.Title>
              <Card.Body>
                <Card.Text>Latitude: {this.state.cityData.lat}</Card.Text>
                <Card.Text>Longitude: {this.state.cityData.lon} </Card.Text>
                   {this.state.weatherData.length > 0 &&

                  <Weather
                    weatherData={this.state.weatherData}
                    cityName={this.state.cityName}
                  />}
              </Card.Body>
              <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12`} alt="{this.state.cityData.display_name}" />

              <h3> {`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12`}</h3>
            </Card>
        }
      </>
    );
  }

}

export default App;
