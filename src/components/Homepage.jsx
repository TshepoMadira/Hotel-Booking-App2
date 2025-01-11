import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./homepage.css";
import Footer from "./footer";
import BookingForm from "./Bookingform";

const Homepage = () => {
  const navigate = useNavigate();

  const testimonials = [
    {
      name: "Lucky Dlamini",
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
      name: "Tshepo Le Roux",
      text: "An unforgettable experience! The staff were incredibly welcoming and attentive.",
    },
  ];

  const handleBookNow = () => {
    navigate("/checkavailabilityrooms");
  };

  const roomOffers = [
    {
      title: "King Suite",
      image: "src/assets/images/Bernhardt Maxime King Upholstered Wing Panel Bed in Cream _ Wood _ Nebraska Furniture Mart.jpeg",
      
    },
    {
      title: "Queen Suite",
      image: "src/assets/images/Queen Size Lift Up Storage Bed Frame Upholstered Platform Bed with Gas Lift up Hydraulic Storage and Gold Stripes Headboard.jpeg",
     
    },
    {
      title: "Presidential Suite",
      image: "src/assets/images/Design firm Gettys and The Peninsula Hong Kong redefine the luxury travel experience.jpeg",
    
    },
    {
      title: "Luxury Suite",
      image: "src/assets/images/Luxury Bedroom Interior Design Projects.jpeg",
    },
    {
      title: "Villa",
      image: "src/assets/images/L U X U R I O U S.jpeg",
    },
    {
      title: "Mountain View Room",
      image: "src/assets/images/Mountain Retreat.jpeg",
    },
    {
      title: "Honeymoon Suite",
      image: "src/assets/images/5f3d5ed3-d71e-463f-9048-03f9a79372de.jpeg",
    },
    {
      title: "Pool Area",
      image: "src/assets/images/WELLNESS&POOL MIX Ceramic Pool liner By Appiani.jpeg",
    },
    {
      title: "Gym Area",
      image: "src/assets/images/Launch — Vida Design.jpeg",
    },
    {
      title: "Spa",
      image: "src/assets/images/Love the idea of having showers in the room to….jpeg",
    }, 
  ];

  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", borderRadius: "50%" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", borderRadius: "50%" }}
        onClick={onClick}
      />
    );
  }

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
          <button onClick={handleBookNow} className="book-button">Book</button>
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

      <div className="welcome-section">
        <div className="welcome-message">
          <h2>Welcome To DreamScape Hotel</h2>
          <p className="tagline">Luxury & Comfort</p>
          <hr className="welcome-line" />
          <p className="location-description">
            Located just 120 km from Pretoria on the Platinum Freeway, tucked away in the heart of the Harteebeespoort Dam, the Dreamscape Hotel offers 5-star luxury hotel accommodation on the outskirts of Brits, flanked by the scenic Bojanala Region in the east, and endless savannahs that border the distant Magaliesberg mountain range.
          </p>
        </div>

        <div className="right-content">
          <h1>The DreamScape Hotel</h1>
          <iframe
            className="youtube-video"
              src="https://www.youtube.com/embed/qemqQHaeCYo"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="container">
  <h3 className='luxurius'>Our Luxurious Rooms</h3>
  <Slider {...settings}>
    {roomOffers.map((room, index) => (
      <div className="room-container" key={index}>
        <h3>{room.title}</h3>
        <img src={room.image} alt={room.title} className="room-image" />
        <div className="room-description">
          
        </div>
      </div>
    ))}
  </Slider>
</div>

<div className="testimonials">
  <h2 className="testimonials-heading">What Our Guests Say</h2>
  <div className="testimonial-container">
    <div className="testimonial-list">
      {testimonials.map((testimonial, index) => (
        <div className="testimonial" key={index}>
          <div className="testimonial-content">
            
            <i className="fas fa-quote-left testimonial-quote"></i>
            <p className="testimonial-text">{testimonial.text}</p>
            
            <i className="fas fa-quote-right testimonial-quote"></i>
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