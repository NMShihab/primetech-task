import React, { useState, useContext } from "react";
import { Form, Button, Container, Link } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./login.css";
import { UserContext } from "../Context/UserContext";
const Login = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useContext(UserContext);
  let navigate = useNavigate();

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log(name, password);
    const headers = {
      "Content-Type": "application/json",
    };

    const data = {
      username: name,
      password: password,
      twoFactorCode: null,
    };
    try {
      const res = await axios.post(
        "https://webhooktest61.advanceprotech.com/api/Authenticate/login",
        data,
        { headers: headers }
      );
      console.log(res.data.successResonse.token);
      setToken(res.data.successResonse.token);
      localStorage.setItem(
        "token",
        JSON.stringify(res.data.successResonse.token)
      );
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="login-card">
      <Form onSubmit={loginHandler} className="my-4 m-4">
        <Form.Group controlId="formBasicName" className="my-2">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={name}
            onChange={nameHandler}
            type="text"
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={passwordHandler}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button className="my-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
