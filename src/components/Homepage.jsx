import React from 'react';
import './homepage.css';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="home-page">
      <header className="hero">
        <img src="src\assets\Landmarks in America.jpeg" alt="Dreamscape Hotel" className="hero-image" />
        <div className="overlay">
          <h1>DREAMSCAPE HOTEL</h1>
          <p>Luxury and Comfort</p>
          <button className="btn btn-primary">Book Now</button>
        </div>
      </header>

      <section className="features">
        <h2>Our Amenities</h2>
        <ul>
          <li><i className="fas fa-wifi"></i><p>Free Wi-Fi</p></li>
          <li><i className="fas fa-pool"></i><p>Outdoor Pool</p></li>
          <li><i className="fas fa-gym"></i><p>Fitness Center</p></li>
          <li><i className="fas fa-restaurant"></i><p>On-Site Restaurant</p></li>
        </ul>
      </section>

      <section className="gallery">
        <h2>Our Gallery</h2>
        <div className="gallery-grid">
          <img src="src/assets/Photo 6 of 9 in Hotel Koé Tokyo by Dwell.jpeg" alt="Hotel Room" />
          <img src="src/assets/Hyatt Place Hotel Luoyang de BLVD _ Diseño de hoteles.jpeg" alt="Hotel Lobby" />
          <img src="src\assets\QuartzScapes Regular Series Mariner Blue _ NPT Pool Finishes.jpeg" alt="Hotel Pool" />
          <img src="src/assets/images/Equinox Hotel New York __ Hotels in Heaven®.jpeg" alt="Hotel Restaurant" />
        </div>
      </section>

      {/* New Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Guests Say</h2>
        <div className="testimonial-carousel">
          <blockquote>
            "An amazing experience! The staff were incredibly friendly."
            <cite>— Jane Doe</cite>
          </blockquote>
          <blockquote>
            "The best hotel stay I’ve ever had. Will definitely return!"
            <cite>— John Smith</cite>
          </blockquote>
        </div>
      </section>

      {/* New Special Offers Section */}
      <section className="special-offers">
        <h2>Special Offers</h2>
        <div className="offer-cards">
          <div className="offer-card">
            <h3>Honeymoon Package</h3>
            <p>Enjoy a romantic getaway with our exclusive package.</p>
            <button className="btn btn-secondary">Learn More</button>
          </div>
          <div className="offer-card">
            <h3>Weekend Getaway</h3>
            <p>Special rates for weekend stays. Book now!</p>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* New Location Highlights Section */}
      <section className="location-highlights">
        <h2>Explore the Area</h2>
        <p>Discover local attractions and activities near Dreamscape Hotel.</p>
        <ul>
          <li>Visit the Dubai Mall</li>
          <li>Explore the Burj Khalifa</li>
          <li>Relax at Jumeirah Beach</li>
        </ul>
      </section>

      {/* New Booking Section */}
      <section className="booking-section">
        <h2>Book Your Stay</h2>
        <p>Ready to experience luxury and comfort? Book your stay today!</p>
        <button className="btn btn-primary">Book Now</button>
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
