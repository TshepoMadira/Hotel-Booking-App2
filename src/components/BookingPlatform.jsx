import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingDetails } from '../Redux/bookingSlice';
import { db } from './Firebase';
import { doc, getDoc } from 'firebase/firestore';
import "./BookingPlatform.css";

const BookingPlatform = () => {
  const dispatch = useDispatch();
  const bookingDetails = useSelector((state) => state.booking);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const roomId = queryParams.get('roomId');
  const checkIn = queryParams.get('checkIn');
  const checkOut = queryParams.get('checkOut');
  const roomPrice = parseFloat(queryParams.get('roomPrice')) || 0;

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rooms, setRooms] = useState(1); 
  const [adults, setAdults] = useState(bookingDetails.adults || 1); 
  const [children, setChildren] = useState(bookingDetails.children || 0);
  const [roomDetails, setRoomDetails] = useState(null); 
 
  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (roomId) {
        const roomRef = doc(db, "accommodations", roomId);
        const roomSnap = await getDoc(roomRef);
        if (roomSnap.exists()) {
          setRoomDetails({ id: roomSnap.id, ...roomSnap.data() });
        }
      }
    };
    fetchRoomDetails();
  }, [roomId]);

  const calculateBookingAmount = (rooms, roomPrice) => {
    return roomPrice * rooms; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please fill out all fields correctly.');
      return;
    }

    const bookingAmount = calculateBookingAmount(rooms, roomPrice);
    console.log("Rooms:", rooms, "Booking Amount:", bookingAmount);

    const bookingData = {
      fullName: `${name} ${surname}`,
      checkinDate: checkIn,
      checkoutDate: checkOut,
      roomType: roomId,
      numRooms: rooms,
      numAdults: adults,
      numChildren: children,
      bookingAmount: bookingAmount,
    };
    
    dispatch(setBookingDetails({ roomId, checkIn, checkOut, adults, children }));
    navigate('/confirmbooking', { state: bookingData });
  };

  const validateForm = () => {
    return name && surname && email && phone;
  };

  return (
    <div className="booking-container">
      <h1>Booking Form</h1>

     
      {roomDetails && (
        <div className="room-detailss">
          <h2>Room Details</h2>
          <div className="room-image-containers">
            <img src={roomDetails.main_image} alt={roomDetails.name} className="room-images" />
          </div>
          <h3>{roomDetails.name}</h3>
          <p className="room-descriptions">{roomDetails.description}</p>
          <p className="room-prices">Price: R{roomDetails.price}</p>
        </div>
      )}

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

        <button className="confirm-booking" type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingPlatform;