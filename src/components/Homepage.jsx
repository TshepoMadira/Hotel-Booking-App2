import React from 'react';
import './homepage.css';
import { Link } from 'react-router-dom';


const Homepage = () => {
  return (
    <div className="home-page">
      
      <header className="hero">
  <img src="src\assets\Unique Dubai Honeymoon Hotels For Your Bucket List!.jpeg" alt="Dreamscape Hotel" className="hero-image" />
  <div className="overlay">
    <h1>DREAMSCAPE HOTEL</h1>
    <p>Luxury and Comfort</p>
    <button className="btn btn-primary">Book Now</button>
  </div>
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
          <img src="src\assets\Photo 6 of 9 in Hotel Koé Tokyo by Dwell.jpeg" alt="Hotel Room" />
          <img src="src\assets\Hyatt Place Hotel Luoyang de BLVD _ Diseño de hoteles.jpeg" alt="Hotel Lobby" />
          <img src="src\assets\images\Free  Hotels, Doorway, Red Background Images, Atmospheric Hotel Entrance On The Red Carpet Golden Background Material Photo Background PNG and Vectors.jpeg" alt="Hotel Pool" />
          <img src="src\assets\images\Equinox Hotel New York __ Hotels in Heaven®.jpeg" alt="Hotel Restaurant" />
        </div>
      </section>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-branding">
              <h1>DREAMSCAPE HOTEL</h1>
              <p className="slogan">Luxury and Comfort</p>
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