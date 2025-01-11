import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './About.css';

const Aboutus = () => {
  const navigate = useNavigate();

  return (
    <div>
      
      <div className="home-arrow" onClick={() => navigate("/")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </div>

      <h2>About Us</h2>
      <p className='history'>
        Dreamscape is a premier destination for travelers seeking comfort and luxury. Our hotel offers a range of amenities to ensure a memorable stay, including free Wi-Fi for travelers. Located in the heart of Brits, we are just minutes away from Hartebeespoort Dam.
      </p>

      <div>
        <iframe
          width="500"
          height="600"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=03%20Spoorweg%20Brits+(Paragon%20Hotel)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          title="Location Map"
        >
          <a href="https://www.gps.ie/">gps trackers</a>
        </iframe>
      </div>

      <p className='Address'>Address: 5 Spoorweg Street, Brits 0250, South Africa</p>

     
     
    </div>
  );
};

export default Aboutus;