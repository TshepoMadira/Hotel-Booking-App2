import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../Redux/userSlice';
import { setFavorites } from '../Redux/Favoriteslice';
import { db } from './Firebase';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import './UserProfile.css';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites?.favoriteRoomIds || []); // Fallback value
  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [loading, setLoading] = useState(true);
  const [favoriteRooms, setFavoriteRooms] = useState([]);

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
          setName(userData.name || `${userData.firstName} ${userData.lastName}`);
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
        const roomsCollection = collection(db, 'rooms'); 
        const roomsQuery = query(roomsCollection, where('__name__', 'in', roomIds));
        const roomsSnapshot = await getDocs(roomsQuery);
        const roomsData = roomsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFavoriteRooms(roomsData);
      } catch (error) {
        console.error('Error fetching favorite rooms:', error);
      }
    };

    fetchUserProfile();
  }, [user.id, dispatch]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!user.id) {
      console.error('User ID is null or undefined during update');
      alert('Error: User ID is not available. Please log in again.');
      return;
    }

    dispatch(updateUserProfile({ name, phone }));

    try {
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        name,
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
      <h1 className="user-profile-title">User Profile</h1>
      <form className="user-profile-form" onSubmit={handleUpdateProfile}>
        <label className="user-profile-label">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <p>You have no booking history.</p>
      </div>

      <div className="favorites">
        <h2>Favorite Accommodations</h2>
        {favoriteRooms.length > 0 ? (
          favoriteRooms.map((room) => (
            <div key={room.id} className="favorite-room">
              <h3>{room.name}</h3>
              <p>{room.description}</p>
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