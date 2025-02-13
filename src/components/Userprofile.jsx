import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../Redux/userSlice';
import { setFavorites } from '../Redux/Favoriteslice';
import { db } from './Firebase';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { FaArrowLeft } from 'react-icons/fa'; 
import './UserProfile.css';

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites?.favoriteRoomIds || []);
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [loading, setLoading] = useState(true);
  const [favoriteRooms, setFavoriteRooms] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user.id) {
        console.error('User ID is null or undefined');
        setLoading(false);
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, 'users', user.id));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFirstName(userData.firstName || '');
          setLastName(userData.lastName || '');
          setPhone(userData.phone || '');
          if (userData.favoriteRoomIds) {
            dispatch(setFavorites(userData.favoriteRoomIds));
            fetchFavoriteRooms(userData.favoriteRoomIds);
          }
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchFavoriteRooms = async (roomIds) => {
      try {
        const accommodationsCollection = collection(db, 'accommodations');
        const roomsData = [];
        for (const roomId of roomIds) {
          const roomDoc = await getDoc(doc(accommodationsCollection, roomId));
          if (roomDoc.exists()) {
            roomsData.push({ id: roomDoc.id, ...roomDoc.data() });
          }
        }
        console.log('Favorite Rooms Data:', roomsData);
        setFavoriteRooms(roomsData);
      } catch (error) {
        console.error('Error fetching favorite rooms:', error);
      }
    };

    const fetchBookingHistory = async () => {
      if (!user.email) {
        console.error('User email is null or undefined');
        return;
      }
      try {
        const bookingsCollection = collection(db, 'bookings');
        const normalizedUserEmail = user.email.trim().toLowerCase();
        const q = query(bookingsCollection, where('email', '==', normalizedUserEmail));
        const bookingsSnapshot = await getDocs(q);
        const bookingsData = bookingsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Booking History Data:', bookingsData);
        setBookingHistory(bookingsData);
      } catch (error) {
        console.error('Error fetching booking history:', error);
      }
    };

    fetchUserProfile();
    fetchBookingHistory();
  }, [user.id, user.email, dispatch]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user.id) {
      console.error('User ID is null or undefined during update');
      alert('Error: User ID is not available. Please log in again.');
      return;
    }
    dispatch(updateUserProfile({ firstName, lastName, phone }));
    try {
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        firstName,
        lastName,
        phone,
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="home-arrow" onClick={() => navigate('/confirmbooking')}>
        <FaArrowLeft size={24} />
      </div>
      <h1 className="user-profile-title">User Profile</h1>
      <form className="user-profile-form" onSubmit={handleUpdateProfile}>
        <label className="user-profile-label">
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="user-profile-input"
            required
          />
        </label>
        <label className="user-profile-label">
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="user-profile-input"
            required
          />
        </label>
        <label className="user-profile-label">
          Email:
          <input
            type="email"
            value={user.email || ''}
            className="user-profile-input"
            readOnly
          />
        </label>
        <label className="user-profile-label">
          Phone Number:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="user-profile-input"
            required
          />
        </label>
        <button className="user-profile-button" type="submit">Update Profile</button>
      </form>
      <div className="booking-history">
        <h2>Booking History</h2>
        {bookingHistory.length > 0 ? (
          bookingHistory.map((booking) => (
            <div key={booking.id} className="booking-item">
              <h3>Booking ID: {booking.id}</h3>
              <p>Check-In: {booking.checkinDate}</p>
              <p>Check-Out: {booking.checkoutDate}</p>
              <p>Amount: R{booking.bookingAmount}</p>
              <p>Rooms: {booking.numRooms}</p>
              <p>Adults: {booking.numAdults}</p>
              <p>Children: {booking.numChildren}</p>
            </div>
          ))
        ) : (
          <p>You have no booking history.</p>
        )}
      </div>
      <div className="room-favorites">
        <h2>Favorite Accommodations</h2>
        {favoriteRooms.length > 0 ? (
          favoriteRooms.map((room) => (
            <div key={room.id} className="favorite-room">
              <div className="favorite-room-image-container">
                <img
                  src={room.main_image || 'https://via.placeholder.com/150'}
                  alt={room.name}
                  className="favorite-room-image"
                />
              </div>
              <div className="favorite-room-details">
                <h3>{room.name}</h3>
                <p>{room.description}</p>
                <p>Price: R{room.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>You have no favorite accommodations.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
