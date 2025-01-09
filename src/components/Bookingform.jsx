import React, { useState } from 'react';
import './Bookingform.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const BookingForm = () => {
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [rooms, setRooms] = useState([]);

  const today = new Date().toISOString().split('T')[0];

  const checkAvailability = async () => {
    const roomsCollection = collection(db, 'accommodations');
    const roomsSnapshot = await getDocs(roomsCollection);
    const roomsList = roomsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log('All Rooms:', roomsList);

    const filteredRooms = roomsList.filter((room) => {
      return room.available === true;
    });

    console.log('Filtered Rooms:', filteredRooms);

    setRooms(filteredRooms);
  };

  return (
    <div className="booking-form">
  
      <div className="date-picker">
        <label className="date-label">Check-In</label>
        <div className="date-input-container">
          <FontAwesomeIcon icon={faCalendarAlt} className="date-icon" /> 
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            min={today}
            className="date-input"
          />
        </div>
        <label className="date-label">Check-Out</label>
        <div className="date-input-container">
          <FontAwesomeIcon icon={faCalendarAlt} className="date-icon" /> 
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            min={checkInDate || today}
            className="date-input"
          />
        </div>
      </div>

     
      <div className="guests-container">
        <div className="guest-group">
          <label className="guest-label">Adults</label>
          <select
            value={numAdults}
            onChange={(e) => setNumAdults(Number(e.target.value))}
            className="guest-select"
          >
            {[...Array(6).keys()].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="guest-group">
          <label className="guest-label">Children</label>
          <select
            value={numChildren}
            onChange={(e) => setNumChildren(Number(e.target.value))}
            className="guest-select"
          >
            {[...Array(6).keys()].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      
      <button className="checck-availabilityy" onClick={checkAvailability}>
        Check Availability
      </button>

   
      <div className="rooms-list">
        {rooms.map((room) => (
          <div key={room.id} className="room-item">
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <p>Price: ${room.price}</p>
            <p>Ratings: {room.ratings}/5</p>
            <img src={room.main_image} alt={room.name} style={{ width: '100%', maxWidth: '300px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingForm;