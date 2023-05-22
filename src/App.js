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
      movieData: [],
    }
  }

  handleCitySubmit = async (event) => {
    event.preventDefault();

    //What does try do?
    try {
      //this is the url to grab the data from location IQ
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`;

      console.log('the url', url)

      //if URL is address, axios is the mailman. in the url above we are requesting data. Specifically we are requesting data about the city we are passing in (json data). axios is waiting for response to get the data to bring back to us.
      //Have to use the .data to drill down and get the data from the api
      let city = await axios.get(url);
      this.setState({
        cityData: city.data[0],
        error: false,
        haveCityData: true,
        lat: city.data[0].lat,
        lon: city.data[0].lon
      });
      //invokeing getWeather
      //had to add lat & lon so that get weather has access to the values. (couldnt use values in state yet bc they werent there yet)
      this.getWeather(city.data[0].lat, city.data[0].lon);
      this.getMovie();
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
  //we are saying there is going to be a lat & lon when we invoke
  getWeather = async (lat, lon) => {
    try {
      //react_app_server is key that stands for the url of the server. THIS IS WHERE THE SERVER IS CONNECTED. (localhost3001 prior to deploying site) when we deploy it will be on render.
      let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.cityName}&lat=${lat}&lon=${lon}`;

      console.log('the weather url', weatherUrl);
      let weatherResponse = await axios.get(weatherUrl);
      let weatherData = weatherResponse.data;
      console.log(weatherData);
      this.setState({
        //This updating state so we can use the data we got back from the server to use on our page
        weatherData: weatherData
      })
    } catch (error) {
      console.log('Weather Feature Down ', error);
    }
  };

  getMovie = async () => {
    let movieURL = `${process.env.REACT_APP_SERVER}/movies?cityName=${this.state.cityName}`;

    try {
      let movieResponse = await axios.get(movieURL);


      this.setState({
        movieData: movieResponse.data
      })

    } catch (error) {
      console.log('Error getting movie: ', error);
    }
  };

  changeCityInput = (event) => {
    //event.target is talking about where the event happened in our html.
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
            {/* control takes the input and listens for change. When there is a change then this.changeCityInput happens */}
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
                {/* .length refers to the length of the array. if the array is not empty then we want to make a weather component */}
                {this.state.weatherData.length > 0 &&
                  <Weather
                    weatherData={this.state.weatherData}
                    cityName={this.state.cityName}
                  />
                    }
                  {this.state.movieData.length > 0 &&
                  <Movie
                    movieData={this.state.movieData}
                  />
                  }
              </Card.Body>
              <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12`} alt="{this.state.cityData.display_name}" />
              <Card>
                <Card.Title>{this.props.cityName} Movies</Card.Title>
                <Card.Text>Title: {movie.title}</Card.Text>
              </Card>

            </Card>

        }
      </>
    );
  }

}

export default App;
