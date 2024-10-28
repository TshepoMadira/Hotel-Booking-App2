import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal"; // Import the Modal component
import "./CheckavailabilityRooms.css";

const CheckavailabilityRooms = () => {
  const today = new Date().toISOString().split("T")[0];
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(today);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null); // Store the selected room for modal
  const navigate = useNavigate();

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

  const openModal = (room) => {
    setSelectedRoom(room);
  };

  const closeModal = () => {
    setSelectedRoom(null);
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

        <button
          className="check-availability-button"
          onClick={() =>
            alert(
              `Checking availability for ${checkInDate} to ${checkOutDate}`
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
                {room.main_image && <img src={room.main_image} alt={room.name} />}
                <h3>{room.name}</h3>
                <p>Price: R {room.price}</p>
                <p>Available: {room.available ? "Yes" : "No"}</p>
                <p>{room.description}</p>

                <button
                  className="show-more-button"
                  onClick={() => openModal(room)} 
                >
                  Show Details
                </button>

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

      {/* Modal for displaying room details */}
      <Modal isOpen={!!selectedRoom} onClose={closeModal} room={selectedRoom} />
    </div>
  );
};

export default CheckavailabilityRooms;
