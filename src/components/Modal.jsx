
import React from "react";
import "./Modal.css"; 
const Modal = ({ isOpen, onClose, room }) => {
  if (!isOpen || !room) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{room.name}</h3>
        {room.main_image && <img src={room.main_image} alt={room.name} />}
        <p>Price: R {room.price}</p>
        <p>Available: {room.available ? "Yes" : "No"}</p>
        <p>{room.description}</p>
        <h4>Amenities:</h4>
        <ul>
          {room.amenities && room.amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
