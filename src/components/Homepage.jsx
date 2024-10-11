import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
import Footer from "./footer";

const Homepage = () => {
  return (
    <div className="home-page">
      <header className="hero">
        <img
          src="src/assets/images/pexels-rickyrecap-1802255.jpg"
          alt="Dreamscape Hotel"
          className="hero-image"
        />
        <div className="overlay">
          <h1>DREAMSCAPE HOTEL</h1>
          <p>Luxury and Comfort</p>
          <button className="btn btn-primary">Book Now</button>
        </div>
      </header>

      <div className="container">
        <div className="room-offers">
          <h2>Room Offers</h2>
            <div className="room-card">
              <h3>King Suite</h3>
              <img
                src="src/assets/images/Fitted Wardrobe Design Ideas for a Clutter Free Bedroom.jpeg"
                alt="King Suite"
                className="room-image"
              />
              <p className="room-price">R5000</p>
              <div className='room-description-container'>
                <p className="room-description">
                  -Two bathrooms with double sink vanity<br />
                  -Flat screen TV<br />
                  -Full size sofa with lounge chairs<br />
                  -Free Uncapped wifi<br />
                  -Private Balcony
                </p>
              </div>
            </div>
          
          <div className="room-card">
            <h3>Queen Suite</h3>
            <img
              src="src/assets/images/Queen Size Lift Up Storage Bed Frame Upholstered Platform Bed with Gas Lift up Hydraulic Storage and Gold Stripes Headboard.jpeg"
              alt="Queen Suite"
              className="room-image"
            />
            <p className="room-price">R5100</p>
            <div className='room-description-container'>
              <p className="room-description">
                -Queen size bed with plus pillows and high-quality linens<br />
                -Spacious bathroom with separate shower and bathtub<br />
                -Flatscreen TV with premium channels
              </p>
            </div>
          </div>
        
          <div className="room-card">
            <h3>Presidential Suite</h3>
            <img
              src="src/assets/images/Design firm Gettys and The Peninsula Hong Kong redefine the luxury travel experience.jpeg"
              alt="Guest Room"
              className="room-image"
            />
            <p className="room-price">R2500</p>
            <div className="room-description-container">
              <p className="room-description">
                - Comfortable bed<br />
                - Single vanity with high-end fixtures<br />
                - Complimentary breakfast<br />
                - Flat screen TV with premium channels<br />
                - Sofa bed for extra sleep
              </p>
            </div>
          </div>
        </div>
        </div>
        


      <Footer />
    </div>
  );
};

export default Homepage;
