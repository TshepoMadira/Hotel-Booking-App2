import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton';
import { db } from './Firebase'; 
import { collection, addDoc } from 'firebase/firestore';

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

  if (!location.state) {
    return <p>No booking details available.</p>; 
  }

  return (
    <div className="confirmation">
      <h2>Confirm Booking</h2>
      <p><strong>Full Name:</strong> {fullName}</p>
      <p><strong>Check-in Date:</strong> {checkinDate}</p>
      <p><strong>Check-out Date:</strong> {checkoutDate}</p>
      <p><strong>Room Type:</strong> {roomType}</p>
      <p><strong>Number of Rooms:</strong> {numRooms}</p>
      <p><strong>Number of Adults:</strong> {numAdults}</p>
      <p><strong>Number of Children:</strong> {numChildren}</p>
      <p><strong>Total Amount:</strong> R{bookingAmount}</p>

      <PayPalButton amount={bookingAmount.toFixed(2)} onSuccess={handleSuccess} />
    </div>
  );
}

export default ConfirmBooking;
