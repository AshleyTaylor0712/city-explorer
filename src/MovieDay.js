import React from 'react';
import Card from 'react-bootstrap/Card';


class MovieDay extends React.Component {
  render() {
    console.log(this.props.eachMovie);
    return (
      <>
            <Card className="movieDay">
                <Card.Text>Title: {this.props.eachMovie.title}</Card.Text>
                <Card.Img src={this.props.eachMovie.image_url} alt={this.props.eachMovie.title} borderRadius='5px' width='max-content' margin='auto' padding='5px'/>
            </Card>

      </>
    );
  }
}

export default MovieDay;
