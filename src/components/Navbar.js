import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to='/' className="brand-logo">Home</Link>
        <ul className="right">
          <li><NavLink to='/signup'>Sign up</NavLink></li>
          <li><NavLink to='/signin'>Sign in</NavLink></li>
          <li><NavLink to='/todolist'>TodoList</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
