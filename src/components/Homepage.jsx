import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
import Footer from "./footer";
import BookingForm from "./Bookingform";

const Homepage = () => {
  const [showAll, setShowAll] = useState(false);
  const [searchParams, setSearchParams] = useState({ guests: 1, checkIn: '', checkOut: '' });

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log("Searching for:", searchParams);
  };

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
          <p className="slogan">Luxury and Comfort</p>
          <button className="btn btn-primary">Book Now</button>
        </div>
      </header>
      
      {/* Search Form */}
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="date"
          name="checkIn"
          value={searchParams.checkIn}
          onChange={handleSearchChange}
          placeholder="Check-in Date"
        />
        <input
          type="date"
          name="checkOut"
          value={searchParams.checkOut}
          onChange={handleSearchChange}
          placeholder="Check-out Date"
        />
        <input
          type="number"
          name="guests"
          value={searchParams.guests}
          onChange={handleSearchChange}
          min="1"
          placeholder="Guests"
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      <BookingForm />

      <div className="amenities">
        <h2 className='facilities'>All of these facilities, all for you</h2>
       
        <ul className="amenities-list">
          {showAll ? (
            <>
              <li><i className="fas fa-wind"></i> Air conditioning</li>
              <li><i className="fas fa-baby"></i> Babysitting on request</li>
              <li><i className="fas fa-cocktail"></i> Bar</li>
              <li><i className="fas fa-child"></i> Services for children</li>
              <li><i className="fas fa-iron"></i> Iron</li>
              <li><i className="fas fa-handshake"></i> Meeting rooms</li>
              <li><i className="fas fa-smoking-ban"></i> 100% Non Smoking Property</li>
              <li><i className="fas fa-utensils"></i> Restaurant</li>
              <li><i className="fas fa-concierge-bell"></i> Room service</li>
              <li><i className="fas fa-tennis-ball"></i> Tennis</li>
              <li><i className="fas fa-wheelchair"></i> Wheelchair accessible hotel</li>
              <li><i className="fas fa-wifi"></i> Wi-Fi</li>
              <li><i className="fas fa-leaf"></i> Ecocertified</li>
              <li><i className="fas fa-tshirt"></i> Laundry / Valet Services</li>
              <li><i className="fas fa-shuttle-van"></i> Shuttle</li>
            </>
          ) : (
            <>
              <li><i className="fas fa-wind"></i> Air conditioning</li>
              <li><i className="fas fa-cocktail"></i> Bar</li>
              <li><i className="fas fa-utensils"></i> Restaurant</li>
              <li><i className="fas fa-wifi"></i> Wi-Fi</li>
            </>
          )}
        </ul>
        <div className="show-more" onClick={toggleShowAll}>
          <span>{showAll ? "Show Less Facilities" : "Show More Facilities"}</span>
          <i className={`fas fa-chevron-${showAll ? "up" : "down"}`}></i>
        </div>
      </div>

      {/* Room Offers */}
      <div className="container">
        <h3>Room Offers</h3>
        <div className="room-offers">
          {[
            { title: "King Suite", price: "R5000", image: "src/assets/images/Bernhardt Maxime King Upholstered Wing Panel Bed in Cream _ Wood _ Nebraska Furniture Mart.jpeg", description: "- Two bathrooms with double sink vanity\n- Flat screen TV\n- Full size sofa with lounge chairs\n- Free Uncapped wifi\n- Private Balcony" },
            { title: "Queen Suite", price: "R5100", image: "src/assets/images/Queen Size Lift Up Storage Bed Frame Upholstered Platform Bed with Gas Lift up Hydraulic Storage and Gold Stripes Headboard.jpeg", description: "- Queen size bed with plush pillows and high-quality linens\n- Spacious bathroom with separate shower and bathtub\n- Flatscreen TV with premium channels" },
            { title: "Presidential Suite", price: "R2500", image: "src/assets/images/Design firm Gettys and The Peninsula Hong Kong redefine the luxury travel experience.jpeg", description: "- Comfortable bed\n- Single vanity with high-end fixtures\n- Complimentary breakfast\n- Flat screen TV with premium channels\n- Sofa bed for extra sleep" },
          ].map((room, index) => (
            <div className="room-container" key={index}>
              <h3>{room.title}</h3>
              <img src={room.image} alt={room.title} className="room-image" />
              <p className="room-price">{room.price}</p>
              <div className="room-description">
                <p className="description">{room.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials">
        <h3>Guest Testimonials</h3>
        <p>"An amazing experience! The service was top-notch!" - Sarah</p>
        <p>"The rooms were luxurious and the amenities were fantastic!" - John</p>
      </div>

      {/* Local Attractions */}
      <div className="attractions">
        <h3>Nearby Attractions</h3>
        <ul>
          <li>Beach Park</li>
          <li>Downtown Shopping District</li>
          <li>City Museum</li>
        </ul>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
