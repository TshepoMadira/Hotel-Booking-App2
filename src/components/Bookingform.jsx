import React, { useState } from 'react';
import './Bookingform.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './Firebase'; 

const BookingForm = () => {
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [rooms, setRooms] = useState([]);

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => {
    if (value > 0) setter(value - 1);
  };

  const today = new Date().toISOString().split('T')[0];

  const checkAvailability = async () => {
    const roomsCollection = collection(db, 'accommodations');
    const roomsSnapshot = await getDocs(roomsCollection);
    const roomsList = roomsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log('All Rooms:', roomsList); 

    const filteredRooms = roomsList.filter(room => {
      return room.available === true; 
    });

    console.log('Filtered Rooms:', filteredRooms); 

    setRooms(filteredRooms);
  };

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
      
      <button className="check-availability-button" onClick={checkAvailability}>
        Check Availability
      </button>
      <div className="rooms-list">
        {rooms.map(room => (
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