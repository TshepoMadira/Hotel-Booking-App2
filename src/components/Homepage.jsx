import React from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";
import Footer from "./footer";
import BookingForm from "./Bookingform";

const Homepage = () => {
  const navigate = useNavigate();

  const testimonials = [
    {
      name: "Alice Johnson",
      text: "This is a lovely hotel in all sense of the word. Our room was very comfortable and the view was stunning.",
    },
    {
      name: "Tebogo Jack",
      text: "From the initial contact to the moment we left, we could not fault this small friendly hotel.",
    },
    {
      name: "Jane Khumalo",
      text: "Luxurious rooms and a stunning view. Highly recommend the King Suite!",
    },
    {
      name: "Michael Smith",
      text: "An unforgettable experience! The staff were incredibly welcoming and attentive.",
    },
  ];

  const handleBookNow = () => {
    navigate("/checkavailabilityrooms"); 
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
          <button onClick={handleBookNow} className="book-now-btn">Book</button> 
        </div>
      </header>

      <BookingForm />

      <div className="amenities">
        <h2 className='facilities'>All of these facilities, all for you</h2>
        <ul className="amenities-list">
          <li><i className="fas fa-wind"></i> Air conditioning</li>
          <li><i className="fas fa-cocktail"></i> Bar</li>
          <li><i className="fas fa-child"></i> Services for children</li>
          <li><i className="fas fa-handshake"></i> Meeting rooms</li>
          
          <li><i className="fas fa-utensils"></i> Restaurant</li>
          <li><i className="fas fa-concierge-bell"></i> Room service</li>
          <li><i className="fas fa-tennis-ball"></i> Tennis</li>
        
          <li><i className="fas fa-wifi"></i> Wi-Fi</li>
     
          <li><i className="fas fa-tshirt"></i> Laundry / Valet Services</li>
          
        </ul>
      </div>

      <div className="container">
        <h3>Our Luxurious Rooms</h3>
        <div className="room-offers">
          {[ 
            { title: "King Suite", image: "src/assets/images/Bernhardt Maxime King Upholstered Wing Panel Bed in Cream _ Wood _ Nebraska Furniture Mart.jpeg", description: "- Two bathrooms with double sink vanity\n- Flat screen TV\n- Full size sofa with lounge chairs\n- Free Uncapped wifi\n- Private Balcony" },
            { title: "Queen Suite", image: "src/assets/images/Queen Size Lift Up Storage Bed Frame Upholstered Platform Bed with Gas Lift up Hydraulic Storage and Gold Stripes Headboard.jpeg", description: "- Queen size bed with plush pillows and high-quality linens\n- Spacious bathroom with separate shower and bathtub\n- Flatscreen TV with premium channels" },
            { title: "Presidential Suite", image: "src/assets/images/Design firm Gettys and The Peninsula Hong Kong redefine the luxury travel experience.jpeg", description: "- Comfortable bed\n- Single vanity with high-end fixtures\n- Complimentary breakfast\n- Flat screen TV with premium channels\n- Sofa bed for extra sleep" },
            { title: "Luxury Suite", image: "src/assets/images/Luxury Bedroom Interior Design Projects.jpeg" },
            { title: "Villa", image: "src/assets/images/L U X U R I O U S.jpeg" },
            { title: "Mountain View Room", image: "src/assets/images/Mountain Retreat.jpeg" },
            { title: "Honeymoon Suite", image: "src/assets/images/5f3d5ed3-d71e-463f-9048-03f9a79372de.jpeg" }
          ].map((room, index) => (
            <div className="room-container" key={index}>
              <h3>{room.title}</h3>
              <img src={room.image} alt={room.title} className="room-image" />
              <div className="room-description">
              
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonials">
        <h2>What Our Guests Say</h2>
        <div className="testimonial-container"> 
          <div className="testimonial-list">
            {testimonials.map((testimonial, index) => (
              <div className="testimonial" key={index}>
                <div className="testimonial-content">
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <p className="testimonial-name">- {testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
