
import React, { useState } from 'react';
import "./BookingPlatform.css";

const BookingPlatform = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingDetails = {
      name,
      email,
      checkin,
      checkout,
      rooms,
      adults,
      children,
    };
    console.log('Booking Details:', bookingDetails);
    
  };

  return (
    <div className="booking-container">
      <h1>Booking Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Check-in Date:
          <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} required />
        </label>
        <label>
          Check-out Date:
          <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} required />
        </label>
        <label>
          Number of Rooms:
          <button type="button" onClick={() => setRooms(Math.max(1, rooms + 1))}>+</button>
          <span>{rooms}</span>
          <button type="button" onClick={() => setRooms(Math.max(1, rooms - 1))}>-</button>
        </label>
        <label>
          Number of Adults:
          <button type="button" onClick={() => setAdults(Math.max(1, adults + 1))}>+</button>
          <span>{adults}</span>
          <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
        </label>
        <label>
          Number of Children:
          <button type="button" onClick={() => setChildren(Math.max(0, children + 1))}>+</button>
          <span>{children}</span>
          <button type="button" onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
        </label>
        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
};

export default BookingPlatform;
