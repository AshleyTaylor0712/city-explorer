import React from "react";
import axios from "axios";
import { Form, Button } from 'react-boostrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: ''
    }
  }

  handleCitySubmit = (event) => {
    event.preventDefault();
    
   
  }

  changeCityInput = (event) => {
    this.setState({
      cityName: event.target.value
    });
  }
 
  render() {
    return (
    <>
      <h1>City Explorer</h1>;
      <Form onSubmit={this.handleCitySubmit}>
        <Form.Label>Search for a City:
          <Form.Control onChange={this.changeCityInput}/>
        </Form.Label>
        <
      </Form>
    </>
    );
  }
}

export default App;
