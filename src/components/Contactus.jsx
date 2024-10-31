import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


const Contactus = () => {
  const navigate = useNavigate(); 

  const handleBackHome = () => {
    navigate('/'); 
  };

  return (
    <div className="container">
      <h2 className="heading">Contact Us</h2>
      
      <div className="contactItem">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
        <div className="contactInfo">
          <h3 className="title">Find Us Here</h3>
          <p>5 Spoorweg Street, Brits, 0250 South Africa</p>
        </div>
      </div>

      <div className="contactItem">
        <FontAwesomeIcon icon={faPhone} className="icon" />
        <div className="contactInfo">
          <h3 className="title">Call Us On</h3>
          <p>079 123 4567</p>
        </div>
      </div>

      <div className="contactItem">
        <FontAwesomeIcon icon={faEnvelope} className="icon" />
        <div className="contactInfo">
          <h3 className="title">Write To Us</h3>
          <p>info@example.com</p>
        </div>
      </div>

      <button className="backButton" onClick={handleBackHome}>
        Back to Home
      </button>
    </div>
  );
};

export default Contactus;
