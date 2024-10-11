import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaArrowLeft } from 'react-icons/fa';


const FAQS = () => {
  return (
    <div className="faqs-container">
      
      <Link to="/" className="back-home-link">
        <FaArrowLeft className="back-arrow-icon" />
        Back to Home
      </Link>

      <h2 className="faqs-heading">Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3 className="faq-question">What time is check-in and check-out?</h3>
        <p className="faq-answer">Check-in time is typically from 3 PM, and check-out time is usually by 11 AM. However, these times can vary by hotel, so it’s always a good idea to confirm with the specific hotel.</p>
      </div>
      <div className="faq-item">
        <h3 className="faq-question">Do you offer airport transfers?</h3>
        <p className="faq-answer">Yes, we do offer our guests airport transfers, but there is a fee to pay.</p>
      </div>
      <div className="faq-item">
        <h3 className="faq-question">Is Wi-Fi available?</h3>
        <p className="faq-answer">Unlimited Wi-Fi is available at the hotel, and you don’t have to pay for it.</p>
      </div>
      <div className="faq-item">
        <h3 className="faq-question">What is your cancellation policy?</h3>
        <p className="faq-answer">You will be charged 50% of the total price if you cancel after reservation and the total price of the reservation if you cancel within 30 days before arrival.</p>
      </div>
      <div className="faq-item">
        <h3 className="faq-question">Are pets allowed?</h3>
        <p className="faq-answer">Pets are allowed. Note: Dangerous dogs, like pitbulls, are not allowed and you’ll be fined if you bring them.</p>
      </div>
      <div className="faq-item">
        <h3 className="faq-question">Do you have on-site parking?</h3>
        <p className="faq-answer">On-site parking is available for only R30 per night with maximum security.</p>
      </div>
    </div>
  );
};

export default FAQS;