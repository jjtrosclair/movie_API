import React, { useState } from "react";
import "./login-view.scss";

import { Button, Form, Row, Col, Container } from "react-bootstrap";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form className="login-form">
            <Form.Group controlId="formBasicUSername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password: </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="btn-lg btn-dark btn-block"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
