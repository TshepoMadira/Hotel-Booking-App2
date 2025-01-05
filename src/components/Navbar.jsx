import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/userSlice'; 
import { useAuth } from '../components/AuthContext';
import './navbar.css';

const Navbar = ({ isHomepage }) => {
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useAuth(); 

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

  const handleLogout = () => {
    logout(); 
    dispatch(logoutUser()); 
    localStorage.removeItem('userToken');
    navigate('/');
  };

  const handleAdminClick = () => {
    navigate('/adminreservations');
  };

  return (
    <nav className={`navbar ${isHomepage && scrolling ? 'scrolled' : ''}`}>
      <ul>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>
        <li><Link to="/contactus">Contact Us</Link></li>
        <li>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </li>
        <li>
          <button onClick={handleAdminClick} className="admin-btn">Admin</button> 
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;