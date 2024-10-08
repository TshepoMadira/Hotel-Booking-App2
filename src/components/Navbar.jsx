import React from 'react';
import './navbar.css';

const navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#">Signup</a></li>
        <li><a href="#">Gallery</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact Us</a></li>
        <li><a href="#" className="btn btn-primary">Book Now</a></li>
      </ul>
    </nav>
  );
};

export default navbar;