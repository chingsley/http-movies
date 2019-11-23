import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const NavBar = () => {
  return (
    <div className="navs">
      <Container>
        <Row>
          <Col className="navs-contents">
            <div className="nav-home">
             <NavLink exact className="nav-links" to="/">Home</NavLink>{' '}
            </div>
            <div className="nav-others">
             <NavLink exact className="nav-links" to="/add-movie">Add Movie</NavLink>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NavBar;
