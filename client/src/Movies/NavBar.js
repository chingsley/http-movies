import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="navs">
      <NavLink exact className="nav-links" to="/">Home</NavLink>{' '}
      <NavLink exact className="nav-links" to="/add-movie">Add Movie</NavLink>
    </div>
  );
};

export default NavBar;
