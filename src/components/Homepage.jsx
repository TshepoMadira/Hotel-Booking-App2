import React from 'react';
import './homepage.css';


const Homepage = () => {
  return (
    <div className="home-page">
      
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
    </div>
  );
};

export default Homepage;