import React, { useState } from 'react';
import './Bookingform.css';

const BookingForm = () => {
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => {
    if (value > 0) setter(value - 1);
  };

 
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="booking-form">
      <div className="date-picker">
        <label className='label-Check-In'>
          Check-In:
          <input 
            type="date" 
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            min={today} 
          />
        </label>
        <label className='label-Check-Out'>
          Check-Out:
          <input 
            type="date" 
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            min={checkInDate || today}
          />
        </label>
      </div>
      <div className="guests-container">
        <div className="guests">
          <div className="guest-group">
            <label className="Label">Adults</label>
            <button onClick={() => decrement(setNumAdults, numAdults)}>-</button>
            <span className="number">{numAdults}</span>
            <button onClick={() => increment(setNumAdults, numAdults)}>+</button>
          </div>
          <div className="guest-group">
            <label className="Label">Children</label>
            <button onClick={() => decrement(setNumChildren, numChildren)}>-</button>
            <span className="number">{numChildren}</span>
            <button onClick={() => increment(setNumChildren, numChildren)}>+</button>
          </div>
        </div>
      </div>
      
      <button className="check-availability-button">Check Availability</button>
    </div>
  );
};

export default BookingForm;
