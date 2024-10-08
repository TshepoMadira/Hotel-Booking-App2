
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-branding">
            <h1>Paragon Hotel</h1>
            <p className="slogan">Model of Excellence and Perfection</p>
          </div>
        </div>
        <div className="footer-links">
          <div className="center-links">
            <Link to="/aboutus">About Us</Link>
            <br />
            <Link to="/contactus">Contact Us</Link>
            <br />
            <Link to="/faqs">FAQs</Link>
            <br />
            <Link to="/termsandconditions">Terms and Conditions</Link>
          </div>
        </div>
        <div className="social-media-links">
          <div className="social-media-line"></div>
          <a href="https://twitter.com/YourHotelHandle" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://facebook.com/YourHotelPage" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://instagram.com/YourHotelHandle" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://youtube.com/YourHotelChannel" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
        <p className="pp">© 2024 Paragon International Limited. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;