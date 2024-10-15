
import React, { useEffect, useState } from 'react';
import './navbar.css';

const Navbar = ({ isHomepage }) => {
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    if (isHomepage) {
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (isHomepage) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isHomepage]);

  return (
    <nav className={`navbar ${isHomepage && scrolling ? 'scrolled' : ''}`}>
      <ul>
        <li><a href="#">Signup</a></li>
        <li><a href="#">Gallery</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact Us</a></li>
        <li><a href="#" className="book-now-btn">Book Now</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
