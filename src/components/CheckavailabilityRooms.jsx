import React, { useState, useEffect } from "react";
import { db } from "./Firebase";
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../Redux/Favoriteslice.js';
import "./CheckavailabilityRooms.css";


const Star = ({ filled }) => (
  <span style={{ color: filled ? '#FFD700' : '#ccc' }}>&#9733;</span>
);

const CheckavailabilityRooms = () => {
  const today = new Date().toISOString().split("T")[0];
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(today);
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoomPrice, setSelectedRoomPrice] = useState(null); 
  const favoriteRoomIds = useSelector((state) => state.Favorite.favoriteRoomIds); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsCollection = collection(db, "accommodations");
      const q = query(roomsCollection, where("isAvailable", "==", true)); 
      const roomsSnapshot = await getDocs(q);
      const roomsList = roomsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomsList);
    };
    fetchRooms();
  }, []);

  const handleBooking = (roomId, roomPrice) => {
    setSelectedRoomPrice(roomPrice); 
    const bookingPath = `/bookingplatform?roomId=${roomId}&checkIn=${checkInDate}&checkOut=${checkOutDate}&roomPrice=${roomPrice}`;
    navigate(bookingPath);
  };

  const handleToggleFavorite = (roomId) => {
    dispatch(toggleFavorite(roomId)); 
  };

  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            alert(`Checking availability for ${checkInDate} to ${checkOutDate}`)
          }
        >
          Check Availability
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by room name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rooms-list">
        <h2>Available Rooms</h2>
        <div className="rooms-grid">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => {
              const roomRating = room.ratings ?? 0;

              return (
                <div key={room.id} className="room-card">
                  {room.main_image && <img src={room.main_image} alt={room.name} />}
                  <h3>{room.name}</h3>
                  <p>Price: R {room.price}</p>
                  <p>Available: {room.isAvailable ? "Yes" : "No"}</p>
                  <p>{room.description}</p>

                
                  <div className="rating">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} filled={index < Math.floor(roomRating)} />
                    ))}
                    <span>{roomRating.toFixed(1)}</span> 
                  </div>

                  <button
                    className="book-button"
                    onClick={() => handleBooking(room.id, room.price)} 
                  >
                    Book Now
                  </button>

                  <button
                    className={`favorite-button ${favoriteRoomIds.includes(room.id) ? 'favorited' : ''}`}
                    onClick={() => handleToggleFavorite(room.id)}
                  >
                    {favoriteRoomIds.includes(room.id) ? "Remove from Favorites" : "Add to Favorites"}
                  </button>
                </div>
              );
            })
          ) : (
            <p>No rooms available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckavailabilityRooms;
