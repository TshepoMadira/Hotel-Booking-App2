import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./CheckavailabilityRooms.css";

const CheckavailabilityRooms = () => {
  const today = new Date().toISOString().split("T")[0];
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(today);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => {
    if (value > 0) setter(value - 1);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsCollection = collection(db, "accommodations");
      const roomsSnapshot = await getDocs(roomsCollection);
      const roomsList = roomsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomsList);
    };

    fetchRooms();
  }, []);

  const handleBooking = (roomId) => {
    const bookingPath = `/bookingplatform?roomId=${roomId}&checkIn=${checkInDate}&checkOut=${checkOutDate}`;
    navigate(bookingPath);
  };

  return (
    <div className="container">
      <div className="booking-form">
        <div className="date-picker">
          <label className="label-Check-In">
            Check-In:
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => {
                setCheckInDate(e.target.value);
                if (e.target.value > checkOutDate) {
                  setCheckOutDate(e.target.value);
                }
              }}
              min={today}
            />
          </label>
          <label className="label-Check-Out">
            Check-Out:
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              min={checkInDate}
            />
          </label>
        </div>
        {/* <div className="guests-container">
          <div className="guests">
            <div className="guest-group">
              <label className="Label">Adults</label>
              <button onClick={() => decrement(setNumAdults, numAdults)}>
                -
              </button>
              <span className="number">{numAdults}</span>
              <button onClick={() => increment(setNumAdults, numAdults)}>
                +
              </button>
            </div>
            <div className="guest-group">
              <label className="Label">Children</label>
              <button onClick={() => decrement(setNumChildren, numChildren)}>
                -
              </button>
              <span className="number">{numChildren}</span>
              <button onClick={() => increment(setNumChildren, numChildren)}>
                +
              </button>
            </div>
          </div>
        </div> */}

        <button
          className="check-availability-button"
          onClick={() =>
            alert(
              `Checking availability for  ${checkInDate} to ${checkOutDate}`
            )
          }
        >
          Check Availability
        </button>
      </div>

      <div className="rooms-list">
        <h2>Available Rooms</h2>
        <div className="rooms-grid">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <div key={room.id} className="room-card">
                <h3>{room.name}</h3>
                <p>Price: R {room.price}</p>
                <p>Available: {room.available}</p>
                <p>{room.description}</p>
                <button
                  className="book-button"
                  onClick={() => handleBooking(room.id)}
                >
                  Book Now
                </button>
              </div>
            ))
          ) : (
            <p>No rooms available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckavailabilityRooms;
