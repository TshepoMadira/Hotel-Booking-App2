import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton';
import { db } from './Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { FaArrowLeft, FaUser, FaCalendarCheck, FaBed, FaUsers, FaChild, FaMoneyBillAlt } from 'react-icons/fa';
import './ConfirmBooking.css';

function ConfirmBooking() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    fullName,
    checkinDate,
    checkoutDate,
    roomType,
    numRooms,
    numAdults,
    numChildren,
    bookingAmount,
  } = location.state || {};

  const [review, setReview] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleSuccess = async (details) => {
    console.log('Payment successful!', details);

    const bookingData = {
      fullName,
      checkinDate,
      checkoutDate,
      roomType,
      numRooms,
      numAdults,
      numChildren,
      bookingAmount,
      paymentDetails: details,
      review: reviewSubmitted ? review : null,
    };

    try {
      const bookingsCollection = collection(db, 'bookings');
      await addDoc(bookingsCollection, bookingData);
      console.log('Booking successfully saved to Firebase:', bookingData);
      navigate('/userprofile');
    } catch (error) {
      console.error('Error saving booking to Firebase:', error);
    }
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const reviewsCollection = collection(db, 'reviews');
      await addDoc(reviewsCollection, {
        review,
        fullName,
        bookingDetails: {
          checkinDate,
          checkoutDate,
          roomType,
          numRooms,
          numAdults,
          numChildren,
          bookingAmount,
        },
      });
      console.log('Review submitted:', review);
      setReviewSubmitted(true);
      setReview('');
    } catch (error) {
      console.error('Error saving review to Firestore:', error);
    }
  };

  const handleBack = () => {
    navigate('/bookingplatform');
  };

  if (!location.state) {
    return <p>No booking details available.</p>;
  }

  return (
    <div className="confirmation-container">
    
      <div className="home-arrow" onClick={() => navigate('/checkavailabilityrooms')}>
        <FaArrowLeft size={24} />
      </div>

      <h2>Confirm Booking</h2>

      
      <div className="booking-card">
      
        <div className="wave-container">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            className="wave-svg"
          >
            <path
              d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
              className="wave-path"
            ></path>
          </svg>
        </div>

      
        <div className="booking-details">
          <div className="detail-item">
            <FaUser className="detail-icon" />
            <p><strong>Full Name:</strong> {fullName}</p>
          </div>
          <div className="detail-item">
            <FaCalendarCheck className="detail-icon" />
            <p><strong>Check-in Date:</strong> {checkinDate}</p>
          </div>
          <div className="detail-item">
            <FaCalendarCheck className="detail-icon" />
            <p><strong>Check-out Date:</strong> {checkoutDate}</p>
          </div>
          <div className="detail-item">
            <FaBed className="detail-icon" />
            <p><strong>Room Type:</strong> {roomType}</p>
          </div>
          <div className="detail-item">
            <FaBed className="detail-icon" />
            <p><strong>Number of Rooms:</strong> {numRooms}</p>
          </div>
          <div className="detail-item">
            <FaUsers className="detail-icon" />
            <p><strong>Number of Adults:</strong> {numAdults}</p>
          </div>
          <div className="detail-item">
            <FaChild className="detail-icon" />
            <p><strong>Number of Children:</strong> {numChildren}</p>
          </div>
          <div className="detail-item">
            <FaMoneyBillAlt className="detail-icon" />
            <p><strong>Total Amount:</strong> R{bookingAmount}</p>
          </div>
        </div>
      </div>


      <form onSubmit={handleReviewSubmit} className="review-form">
        <h3>Leave a Review</h3>
        <textarea
          value={review}
          onChange={handleReviewChange}
          placeholder="Write your review here..."
          rows="4"
          required
        />
        <button className="submit-review" type="submit">
          Submit Review
        </button>
      </form>

      {reviewSubmitted && <p className="review-success">Thank you for your review!</p>}

      
      <PayPalButton amount={bookingAmount.toFixed(2)} onSuccess={handleSuccess} />
    </div>
  );
}

export default ConfirmBooking;