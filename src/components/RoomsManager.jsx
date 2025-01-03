import React, { useState } from 'react';
import Bookingform from './Bookingform';
import CheckavailabilityRooms from './CheckavailabilityRooms';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './Firebase';

const RoomsManager = () => {
  const [rooms, setRooms] = useState([]);

  const checkAvailability = async (checkInDate, checkOutDate) => {
    try {
      const roomsCollection = collection(db, 'accommodations');
      const roomsSnapshot = await getDocs(roomsCollection);
      const roomsList = roomsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log('All Rooms:', roomsList);

      const filteredRooms = roomsList.filter(room => {
        return room.available === true;
      });

      console.log('Filtered Rooms:', filteredRooms);

      setRooms(filteredRooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  return (
    <div>
      <Bookingform checkAvailability={checkAvailability} />
      <CheckavailabilityRooms rooms={rooms} />
    </div>
  );
};

export default RoomsManager;