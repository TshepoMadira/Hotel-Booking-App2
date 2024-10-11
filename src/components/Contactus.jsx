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
    <div className={styles.container}>
      <h2 className={styles.heading}>Contact Us</h2>
      
      <div className={styles.contactItem}>
        <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
        <div className={styles.contactInfo}>
          <h3 className={styles.title}>Find Us Here</h3>
          <p>5 Spoorweg Street, Brits, 0250 South Africa</p>
        </div>
      </div>

      <div className={styles.contactItem}>
        <FontAwesomeIcon icon={faPhone} className={styles.icon} />
        <div className={styles.contactInfo}>
          <h3 className={styles.title}>Call Us On</h3>
          <p>079 123 4567</p>
        </div>
      </div>

      <div className={styles.contactItem}>
        <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
        <div className={styles.contactInfo}>
          <h3 className={styles.title}>Write To Us</h3>
          <p>info@example.com</p>
        </div>
      </div>

     
      <button className={styles.backButton} onClick={handleBackHome}>
        Back to Home
      </button>
    </div>
  );
};

export default Contactus;