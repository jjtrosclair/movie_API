import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, director } = this.props;

    if (!director) return null;

    return (
      <div className="director-view">
        <Container>
          <Card style={{ width: "20rem" }}>
            <Card.Body>
              <Card.Title>{director.Name}</Card.Title>
              <Card.Text>Director Bio: {director.Bio}</Card.Text>
              <Card.Text>Born: {director.Birth}</Card.Text>
              <Link to={`/`}>
                <Button variant="link">Back</Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
