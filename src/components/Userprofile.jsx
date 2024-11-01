import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../Redux/userSlice'; 
import { db } from './Firebase'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './UserProfile.css';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user.id) {
        console.error('User ID is null or undefined');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.id));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.name);
          setPhone(userData.phone);
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [user.id]);

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

  return (
    <div className="user-profile-container">
      <h1>User Profile</h1>
      <form onSubmit={handleUpdateProfile}>
        <label>
          Name:
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </label>
        <label>
          Email:
          <input 
            type="email" 
            value={user.email} 
            readOnly 
          />
        </label>
        <label>
          Phone Number:
          <input 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            required 
          />
        </label>
        <button type="submit">Update Profile</button>
      </form>

      <div className="booking-history">
        <h2>Booking History</h2>
      
        <p>You have no booking history.</p>
      </div>

      <div className="favorites">
        <h2>Favorite Accommodations</h2>
        <p>You have no favorite accommodations.</p>
      </div>
    </div>
  );
};

export default UserProfile;
