import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./BookingPlatform.css";

const BookingPlatform = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const roomId = queryParams.get('roomId');
  const checkIn = queryParams.get('checkIn');
  const checkOut = queryParams.get('checkOut');
  const [adults, setAdults] = useState(Number(queryParams.get('adults')) || 1);
  const [children, setChildren] = useState(Number(queryParams.get('children')) || 0);
  
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rooms, setRooms] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please fill out all fields correctly.');
      return;
    }

    const bookingDetails = {
      fullName: `${name} ${surname}`,
      checkinDate: checkIn,
      checkoutDate: checkOut,
      roomType: roomId, 
      numRooms: rooms,
      numAdults: adults,
      numChildren: children,
      bookingAmount: calculateBookingAmount(rooms, adults, children), 
    };

    navigate('/confirmbooking', { state: bookingDetails });
  };

  const calculateBookingAmount = (rooms, adults, children) => {
    const basePrice = 100; 
    const adultSurcharge = 20; 
    return basePrice * rooms + (adultSurcharge * adults);
  };

  const validateForm = () => {
    return name && surname && email && phone;
  };

  return (
    <div className="booking-container">
      <h1>Booking Form</h1>
      <form onSubmit={handleSubmit}>
        <p>Room ID: {roomId}</p>
        <p>Check-in Date: {checkIn}</p>
        <p>Check-out Date: {checkOut}</p>
        
        <label>
          First Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Surname:
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Phone Number:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
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

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingPlatform;
