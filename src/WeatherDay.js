import React from 'react';
import Card from 'react-bootstrap/Card';


class WeatherDay extends React.Component {
  render() {
    return (
      <>
            <Card className="weatherDay">
                <Card.Text>Date: {this.props.day.date}</Card.Text>
                <Card.Text>Forecast: {this.props.day.description}</Card.Text>
            </Card>
      </>
    );
  }
}

export default WeatherDay;
