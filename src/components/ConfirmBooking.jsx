import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton';
import { db } from './Firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
    bookingAmount 
  } = location.state || {};

  const [review, setReview] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleSuccess = async (details) => {
    console.log("Payment successful!", details);

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
          bookingAmount 
        } 
      });
      console.log('Review submitted:', review);
      setReviewSubmitted(true);
      setReview(''); 
    } catch (error) {
      console.error('Error saving review to Firestore:', error);
    }
  };

  const handleBack = () => {
    navigate('/bookingplatform'); // Adjust this path as needed
  };

  if (!location.state) {
    return <p>No booking details available.</p>; 
  }

  return (
    <div className="confirmation">
      <button className="back-button" onClick={handleBack}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      <h2>Confirm Booking</h2>
      <p><strong>Full Name:</strong> {fullName}</p>
      <p><strong>Check-in Date:</strong> {checkinDate}</p>
      <p><strong>Check-out Date:</strong> {checkoutDate}</p>
      <p><strong>Room Type:</strong> {roomType}</p>
      <p><strong>Number of Rooms:</strong> {numRooms}</p>
      <p><strong>Number of Adults:</strong> {numAdults}</p>
      <p><strong>Number of Children:</strong> {numChildren}</p>
      <p><strong>Total Amount:</strong> R{bookingAmount}</p>

      <form onSubmit={handleReviewSubmit}>
        <h3>Leave a Review</h3>
        <textarea 
          value={review}
          onChange={handleReviewChange}
          placeholder="Write your review here..."
          rows="4"
          required
        />
        <button className="submit-buttonn" type="submit">Submit Review</button>
      </form>

      {reviewSubmitted && <p>Thank you for your review!</p>}

      <PayPalButton amount={bookingAmount.toFixed(2)} onSuccess={handleSuccess} />
    </div>
  );
}

export default ConfirmBooking;
