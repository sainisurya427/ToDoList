// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file if needed

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/todo">Todo List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
