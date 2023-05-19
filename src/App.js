import React from "react";
import axios from "axios";
import { Form, Button, Card,} from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityData: {}
    }
  }

  handleCitySubmit = async (event) => {
    event.preventDefault();

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`;

    let cityData = await axios.get(url);

    this.setState({
        //Passing in the the first object in the array. 
        cityData: cityData.data[0]
    })

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
          <Form.Control onChange={this.changeCityInput}/>
        </Form.Label>
        <Button type="submit">Explore!</Button>
      </Form> 
      <Card>
      <Card.Body>
          <Card.Title>{this.state.cityData.display_name}</Card.Title>
          <Card.Text>Latitude: {this.state.cityData.lat}</Card.Text>
          <Card.Text>Longitude: {this.state.cityData.lon} </Card.Text>
        </Card.Body>
        <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12`} alt="{this.state.cityData.display_name}"/>
      </Card>
    </>
    );
  }
}

export default App;
