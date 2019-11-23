import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const NavBar = () => {
  return (
    <div className="navs">
      <Container>
        <Row>
          <Col>
            <NavLink exact className="nav-links" to="/">Home</NavLink>{' '}
            <NavLink exact className="nav-links" to="/add-movie">Add Movie</NavLink>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NavBar;
