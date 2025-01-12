import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; 
import './RoomsList.css';

const RoomsList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { rooms } = location.state || { rooms: [] };

  const handleBookClick = () => {
    navigate('/checkavailabilityrooms');
  };

  return (
    <div className="rooms-list">
    
      <div className="home-arrow" onClick={() => navigate('/')}>
        <FaArrowLeft size={24} />
      </div>

      <h2>Available Rooms</h2>
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <div key={room.id} className="room-item">
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <p>Price: ${room.price}</p>
            <p>Ratings: {room.ratings}/5</p>
            <img src={room.main_image} alt={room.name} style={{ width: '100%', maxWidth: '300px' }} />
          </div>
        ))
      ) : (
        <p>No rooms available.</p>
      )}

      <button className="click-button" onClick={handleBookClick}>
        To book click here
      </button>
    </div>
  );
};

export default RoomsList;