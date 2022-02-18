import React from "react";
import { Navbar, Container } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand href="#home"></Navbar.Brand>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default Header;
