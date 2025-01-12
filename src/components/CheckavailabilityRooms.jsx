import React, { useState, useEffect } from "react";
import { db } from "./Firebase";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../Redux/Favoriteslice.js";
import { setRating, initializeRatings } from "../Redux/ratingSlice.js";
import Rating from "../components/Rating";
import "./CheckavailabilityRooms.css";

import { FaWifi, FaSwimmingPool, FaParking, FaUtensils, FaTv } from "react-icons/fa";

const CheckavailabilityRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomPrice, setSelectedRoomPrice] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

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
    if (!checkInDate || !checkOutDate) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

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

  const getRoomAmenities = (roomId) => {
    const amenities = [
      { icon: <FaWifi />, label: "Free Wi-Fi" },
      { icon: <FaSwimmingPool />, label: "Pool" },
      { icon: <FaParking />, label: "Parking" },
      { icon: <FaUtensils />, label: "Restaurant" },
      { icon: <FaTv />, label: "TV" },
    ];
    return amenities;
  };

  return (
    <div className="checkavailability-container">
      <div className="rooms-list">
        <h2>Available Rooms</h2>
        <div className="date-pickers">
          <label>
            Check-in Date:
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]} 
            />
          </label>
          <label>
            Check-out Date:
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              min={checkInDate || new Date().toISOString().split("T")[0]} 
            />
          </label>
        </div>
        <div>
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <div key={room.id} className="rooms-card">
                <div className="rooms-image-container">
                  <img src={room.main_image} alt={room.name} className="rooms-image" />
                  <button
                    className={`favorite-icon ${favoriteRoomIds.includes(room.id) ? "favorited" : ""}`}
                    onClick={() => handleToggleFavorite(room.id)}
                  >
                    {favoriteRoomIds.includes(room.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className="rooms-details">
                  <h3>{room.name}</h3>
                  <p className="rooms-description">{room.description}</p>
                  <p className="rooms-price">Price: R{room.price}</p>
                  <div className="amenities-hotel">
                    {getRoomAmenities(room.id).map((amenity, index) => (
                      <div key={index} className="amenity-item">
                        {amenity.icon}
                        <span>{amenity.label}</span>
                      </div>
                    ))}
                  </div>
                  <Rating
                    roomId={room.id}
                    initialRating={ratings[room.id] || 0}
                    onRatingChange={handleRatingChange}
                    className="ratings-stars"
                  />
                  <button
                    className="booknow-button"
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