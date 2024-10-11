import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaArrowLeft } from 'react-icons/fa'; 



const Aboutus = () => {
  return (
    <div>
      
      <Link to="/" style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <FaArrowLeft style={{ marginRight: '8px' }} /> 
        Back to Home
      </Link>

      <h2>About Us</h2>
      <p className='history'>
        [Paragon] is a premier destination for travelers seeking comfort and luxury. Our hotel offers a range of amenities to ensure a memorable stay, including [Free wifi for travellers]. Located in the heart of Brits, we are just minutes away from [Harteebeesport Dam].
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
        >
          <a href="https://www.gps.ie/">gps trackers</a>
        </iframe>
      </div>
      <p className='Address'>Address: 5 Spoorweg Street Brits 0250 South Africa</p>
    </div>
  );
};

export default Aboutus;