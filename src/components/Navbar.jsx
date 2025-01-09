import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/userSlice';
import { useAuth } from '../components/AuthContext';
import './navbar.css';
import { FaUser, FaSignOutAlt, FaUserCog } from 'react-icons/fa';

const Navbar = ({ isHomepage }) => {
  const [scrolling, setScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleProfileClick = () => {
    navigate('/userprofile');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isHomepage && scrolling ? 'scrolled' : ''}`}>
      <div className="nav-content">
      
       

     
        <ul className="nav-links">
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/contactus">Contact Us</Link></li>
        </ul>

    
        <div className="hamburger-container">
          <div className="hamburger" onClick={toggleMenu}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>

         
          <div className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <li>
                <button onClick={handleProfileClick} className="profile-btn">
                  <FaUser className="menu-icon" />
                  Profile
                </button>
              </li>
              <li>
                <button onClick={handleAdminClick} className="admin-btn">
                  <FaUserCog className="menu-icon" />
                  Admin
                </button>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  <FaSignOutAlt className="menu-icon" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;