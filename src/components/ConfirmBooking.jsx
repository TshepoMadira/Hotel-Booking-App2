import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton';
import { db } from './Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { FaArrowLeft, FaUser, FaCalendarCheck, FaBed, FaUsers, FaChild, FaMoneyBillAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

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
    };
  
    try {
      const bookingsCollection = collection(db, 'bookings');
      await addDoc(bookingsCollection, bookingData);
      console.log('Booking successfully saved to Firebase:', bookingData);
  
      toast.success('Thanks for paying here at DreamScape Hotel!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
  
      setShowReviewForm(true);
    } catch (error) {
      console.error('Error saving booking to Firebase:', error);
      toast.error('Error saving booking. Please try again.', {
        position: 'top-center',
      });
    }
  };

  const handleBack = () => {
    navigate('/bookingplatform');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      fullName,
      review,
      rating,
      date: new Date().toISOString(),
    };

    try {
      const reviewsCollection = collection(db, 'reviews');
      await addDoc(reviewsCollection, reviewData);
      console.log('Review successfully saved to Firebase:', reviewData);

      toast.success('Review Submitted!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      
      setTimeout(() => {
        navigate('/userprofile');
      }, 3000);
    } catch (error) {
      console.error('Error saving review to Firebase:', error);
      toast.error('Error submitting review. Please try again.', {
        position: 'top-center',
      });
    }
  };

  if (!location.state) {
    return <p>No booking details available.</p>;
  }

  return (
    <div className="confirmation-container">
      <div className="home-arrow" onClick={handleBack}>
        <FaArrowLeft size={24} />
      </div>
      <h2>Confirm Booking</h2>

      <div className="booking-card">
        <div className="wave-container">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="wave-svg">
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

      {!showReviewForm && !toast.isActive('payment-success') && (
        <PayPalButton amount={bookingAmount.toFixed(2)} onSuccess={handleSuccess} />
      )}

      {showReviewForm && (
        <div className="review-form">
          <h3>Leave a Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <div className="form-group">
              <label htmlFor="review">Your Review:</label>
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
              >
                <option value={0}>Select Rating</option>
                <option value={1}>1 - Poor</option>
                <option value={2}>2 - Fair</option>
                <option value={3}>3 - Good</option>
                <option value={4}>4 - Very Good</option>
                <option value={5}>5 - Excellent</option>
              </select>
            </div>
            <button type="submit" className="submit-review-btn">
              Submit Review
            </button>
          </form>
        </div>
      )}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default ConfirmBooking;