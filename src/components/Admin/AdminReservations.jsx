import React, { useEffect, useState } from "react";
import { db } from "../Firebase"; 
import { collection, getDocs } from "firebase/firestore"; 
import './Admin.css'


const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservationsCollection = collection(db, "bookings"); 
        const reservationsSnapshot = await getDocs(reservationsCollection);
        const reservationsList = reservationsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReservations(reservationsList);
      } catch (err) {
        setError("Failed to fetch reservations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <div>Loading reservations...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-reservations-container">
      <h1>Admin Reservations</h1>
      {reservations.length > 0 ? (
        <table className="reservations-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Check-in Date</th>
              <th>Check-out Date</th>
              <th>Room Type</th>
              <th>Number of Rooms</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation => (
              <tr key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{reservation.fullName}</td>
                <td>{reservation.checkinDate}</td>
                <td>{reservation.checkoutDate}</td>
                <td>{reservation.roomType}</td>
                <td>{reservation.numRooms}</td>
                <td>R {reservation.bookingAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reservations found.</p>
      )}
    </div>
  );
};

export default AdminReservations;
