import React from 'react';
import './homepage.css';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <header className="hero">
        <h1>Welcome to Our Hotel</h1>
        <p>Experience the best of hospitality with us</p>
        <button className="btn btn-primary">Book Now</button>
      </header>
      <section className="features">
        <h2>Our Amenities</h2>
        <ul>
          <li>
            <i className="fas fa-wifi"></i>
            <p>Free Wi-Fi</p>
          </li>
          <li>
            <i className="fas fa-pool"></i>
            <p>Outdoor Pool</p>
          </li>
          <li>
            <i className="fas fa-gym"></i>
            <p>Fitness Center</p>
          </li>
          <li>
            <i className="fas fa-restaurant"></i>
            <p>On-Site Restaurant</p>
          </li>
        </ul>
      </section>
      <section className="gallery">
        <h2>Our Gallery</h2>
        <div className="gallery-grid">
          <img src="image1.jpg" alt="Hotel Room" />
          <img src="image2.jpg" alt="Hotel Lobby" />
          <img src="image3.jpg" alt="Hotel Pool" />
          <img src="image4.jpg" alt="Hotel Restaurant" />
        </div>
      </section>
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
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://facebook.com/YourHotelPage" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com/YourHotelHandle" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://youtube.com/YourHotelChannel" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
          <p className="pp">© 2024 Paragon International Limited. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;