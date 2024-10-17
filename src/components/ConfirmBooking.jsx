import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton';

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

  const handleConfirm = () => {
    console.log("Booking confirmed!");
   
    navigate('/paypal'); 
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

      <button className='enter-btn' onClick={handleConfirm}>Proceed to Payment</button>

      {/* Include PayPalButton here if you want to render it directly */}
      <PayPalButton amount={bookingAmount} onSuccess={handleSuccess} />
    </div>
  );
}

export default ConfirmBooking;
