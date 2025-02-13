import React, { useEffect, useState } from "react";
import { db } from "../Firebase"; 
import { collection, getDocs } from "firebase/firestore"; 
import { auth } from "../Firebase"; 
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"; 
import './Admin.css';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); 
  const [userLoading, setUserLoading] = useState(true); 

  const navigate = useNavigate(); 

  useEffect(() => {
    const checkAdminRole = async (user) => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      try {
        
        const usersCollection = collection(db, "users");
        const querySnapshot = await getDocs(usersCollection);

        let isAdminUser = false;
        querySnapshot.forEach((doc) => {
          if (doc.id === user.uid && doc.data().role === "admin") {
            isAdminUser = true;
          }
        });

        if (isAdminUser) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          setError("You are not authorized to access this page. Only admins can view reservations.");
        }
      } catch (err) {
        console.error("Error checking admin role:", err);
        setIsAdmin(false);
        setError("Failed to verify your admin status. Please try again later.");
      } finally {
        setUserLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        checkAdminRole(user);
      } else {
        
        setIsAdmin(false);
        setError("Please log in to access this page.");
        setUserLoading(false);
        navigate("/"); 
      }
    });

    return () => unsubscribe(); 
  }, [navigate]);

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

    if (isAdmin) {
      fetchReservations();
    }
  }, [isAdmin]);

  if (userLoading) {
    return <div className="loading-message">Checking your credentials...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Access Denied</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/")}>Go Back to Home</button>
      </div>
    );
  }

  if (loading) {
    return <div className="loading-message">Loading reservations...</div>;
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