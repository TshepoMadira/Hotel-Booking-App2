import React, { useState, useEffect } from "react";
import { db } from "./Firebase";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../Redux/Favoriteslice.js";
import "./CheckavailabilityRooms.css";

const Star = ({ filled }) => (
  <span style={{ color: filled ? '#FFD700' : '#ccc' }}>&#9733;</span>
);

const CheckavailabilityRooms = () => {
  const today = new Date().toISOString().split("T")[0];
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(today);
  const [rooms, setRooms] = useState([]);
  const [selectedRoomPrice, setSelectedRoomPrice] = useState(null);

  const favoriteRoomIds = useSelector((state) => {
    console.log("Redux State:", state); 
    return state.favorites.favoriteRoomIds || [];
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsCollection = collection(db, "accommodations");
      const q = query(roomsCollection, where("available", "==", true));
      const roomsSnapshot = await getDocs(q);
      const roomsList = roomsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomsList);
    };
    fetchRooms();
  }, []);

  const handleBooking = async (roomId, roomPrice) => {
    try {
      const roomRef = doc(db, "accommodations", roomId);
      await updateDoc(roomRef, {
        available: false,
      });

      setSelectedRoomPrice(roomPrice);
      const bookingPath = `/bookingplatform?roomId=${roomId}&checkIn=${checkInDate}&checkOut=${checkOutDate}&roomPrice=${roomPrice}`;
      navigate(bookingPath);

      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === roomId ? { ...room, available: false } : room
        )
      );
    } catch (error) {
      console.error("Error updating room availability:", error);
    }
  };

  const handleToggleFavorite = async (roomId) => {
    try {
      // Dispatch the Redux action to toggle the favorite
      dispatch(toggleFavorite(roomId));

      // Get the updated favoriteRoomIds from Redux state
      const updatedFavoriteRoomIds = favoriteRoomIds.includes(roomId)
        ? favoriteRoomIds.filter((id) => id !== roomId) // Remove if already favorited
        : [...favoriteRoomIds, roomId]; // Add if not favorited

      // Update Firestore with the new favoriteRoomIds
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        favoriteRoomIds: updatedFavoriteRoomIds,
      });

      console.log('Favorite accommodations updated in Firestore.');
    } catch (error) {
      console.error('Error updating favorite accommodations:', error);
    }
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
            alert(`Checking availability for ${checkInDate} to ${checkOutDate}`)
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
                <div className="room-image-container">
                  <img src={room.main_image} alt={room.name} className="room-image" />
                  <button
                    className={`favorite-icon ${favoriteRoomIds.includes(room.id) ? "favorited" : ""}`}
                    onClick={() => handleToggleFavorite(room.id)}
                  >
                    {favoriteRoomIds.includes(room.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className="room-details">
                  <h3>{room.name}</h3>
                  <p className="room-description">{room.description}</p>
                  <p className="room-price">Price: R{room.price}</p> 
                  <button
                    className="book-button"
                    onClick={() => handleBooking(room.id, room.price)}
                  >
                    Book Now
                  </button>
                </div>
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