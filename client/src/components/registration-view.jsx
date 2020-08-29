import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, createUsername] = useState("");
  const [password, createPassword] = useState("");
  const [email, createEmail] = useState("");
  const [birthday, createBirthday] = useState("");
}

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(username, password, email, birthday);
  /* Send a request to the server for authentication */
  /* then call props.onLoggedIn(username) */
  props.onLoggedIn(username);

  return (
    <Container>
      <Row>
        <Col>
          <Form className="registration-form">
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => createUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => createPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => createEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicDate">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                placeholder="1/1/1991"
                onChange={(e) => createBirthday(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="btn-lg btn-dark btn-block"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
