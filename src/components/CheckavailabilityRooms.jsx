import React, { useState, useEffect } from "react";
import { db } from "./Firebase";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../Redux/Favoriteslice.js";
import { setRating, initializeRatings } from "../Redux/ratingSlice.js";
import Rating from "../components/Rating";
import "./CheckavailabilityRooms.css";

const CheckavailabilityRooms = () => {
  const today = new Date().toISOString().split("T")[0];
  const [rooms, setRooms] = useState([]);
  const [selectedRoomPrice, setSelectedRoomPrice] = useState(null);

  const favoriteRoomIds = useSelector((state) => state.favorites.favoriteRoomIds || []);
  const ratings = useSelector((state) => state.ratings.ratings);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchRoomsAndRatings = async () => {
     
      const roomsCollection = collection(db, "accommodations");
      const q = query(roomsCollection, where("available", "==", true));
      const roomsSnapshot = await getDocs(q);
      const roomsList = roomsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomsList);

      
      const ratingsSnapshot = await getDocs(collection(db, "ratings"));
      const ratingsData = {};
      ratingsSnapshot.forEach((doc) => {
        ratingsData[doc.id] = doc.data().rating;
      });
      dispatch(initializeRatings(ratingsData)); 
    };

    fetchRoomsAndRatings();
  }, [dispatch]);

  const handleBooking = async (roomId, roomPrice) => {
    try {
      const roomRef = doc(db, "accommodations", roomId);
      await updateDoc(roomRef, {
        available: false,
      });

      setSelectedRoomPrice(roomPrice);
      const bookingPath = `/bookingplatform?roomId=${roomId}&checkIn=${today}&checkOut=${today}&roomPrice=${roomPrice}`;
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
      dispatch(toggleFavorite(roomId));

      const updatedFavoriteRoomIds = favoriteRoomIds.includes(roomId)
        ? favoriteRoomIds.filter((id) => id !== roomId)
        : [...favoriteRoomIds, roomId];

      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, {
        favoriteRoomIds: updatedFavoriteRoomIds,
      });

      console.log("Favorite accommodations updated in Firestore.");
    } catch (error) {
      console.error("Error updating favorite accommodations:", error);
    }
  };

  const handleRatingChange = async (roomId, newRating) => {
    try {
     
      dispatch(setRating({ roomId, rating: newRating }));

      
      const ratingRef = doc(db, "ratings", roomId);
      await updateDoc(ratingRef, {
        rating: newRating,
      });

      console.log("Rating updated in Firestore and Redux.");
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  return (
    <div className="container">
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
                  <Rating
                    roomId={room.id}
                    initialRating={ratings[room.id] || 0}
                    onRatingChange={handleRatingChange}
                  />
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