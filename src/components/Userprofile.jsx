import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../Redux/userSlice'; 
import { db } from './Firebase'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './UserProfile.css';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    console.log('Current user state:', state.user); 
    return state.user;
  });

  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log('User ID:', user.id); 
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
      alert('Error updating profile. Please try again.');
    }
  };

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
            value={user.email} 
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
    </div>
  );
};

export default UserProfile;