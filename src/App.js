import React from "react";
import axios from "axios";
import { Alert, Form, Button, Card, } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityData: {},
      error: false,
      errorMessage: ''
    }
  }


  handleCitySubmit = async (event) => {
    event.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`;

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
              </Card.Body>
              <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12`} alt="{this.state.cityData.display_name}" />
            </Card>
        }
      </>
    );
  }

}

export default App;
