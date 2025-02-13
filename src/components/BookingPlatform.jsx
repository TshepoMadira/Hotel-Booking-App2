import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingDetails } from '../Redux/bookingSlice';
import { FaArrowLeft, FaWifi, FaSwimmingPool, FaParking, FaUtensils, FaTv } from 'react-icons/fa';
import { db, auth } from './Firebase'; // Import auth from Firebase
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './BookingPlatform.css';

const BookingPlatform = () => {
  const dispatch = useDispatch();
  const bookingDetails = useSelector((state) => state.booking);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const roomId = queryParams.get('roomId');
  const checkIn = queryParams.get('checkIn');
  const checkOut = queryParams.get('checkOut');
  const roomPrice = parseFloat(queryParams.get('roomPrice')) || 0;

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(bookingDetails.adults || 1);
  const [children, setChildren] = useState(bookingDetails.children || 0);
  const [roomDetails, setRoomDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setName(userData.firstName); // Set first name
            setSurname(userData.lastName); // Set last name
            setEmail(userData.email); // Set email
          } else {
            console.log('User data not found in Firestore.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        // Redirect to login if user is not authenticated
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  // Fetch room details
  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (roomId) {
        const roomRef = doc(db, 'accommodations', roomId);
        const roomSnap = await getDoc(roomRef);
        if (roomSnap.exists()) {
          setRoomDetails({ id: roomSnap.id, ...roomSnap.data() });
        }
      }
    };
    fetchRoomDetails();
  }, [roomId]);

  const calculateBookingAmount = (rooms, roomPrice) => {
    return roomPrice * rooms;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please fill out all fields correctly.');
      return;
    }

    const bookingAmount = calculateBookingAmount(rooms, roomPrice);
    console.log('Rooms:', rooms, 'Booking Amount:', bookingAmount);

    const bookingData = {
      fullName: `${name} ${surname}`,
      checkinDate: checkIn,
      checkoutDate: checkOut,
      roomType: roomId,
      numRooms: rooms,
      numAdults: adults,
      numChildren: children,
      bookingAmount: bookingAmount,
    };

    dispatch(setBookingDetails({ roomId, checkIn, checkOut, adults, children }));
    navigate('/confirmbooking', { state: bookingData });
  };

  const validateForm = () => {
    return name && surname && email && phone;
  };

  const getRoomAmenities = () => {
    const amenities = [
      { icon: <FaWifi />, label: 'Free Wi-Fi' },
      { icon: <FaSwimmingPool />, label: 'Pool' },
      { icon: <FaParking />, label: 'Parking' },
      { icon: <FaUtensils />, label: 'Restaurant' },
      { icon: <FaTv />, label: 'TV' },
    ];
    return amenities;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bookingplatform-container">
      <div className="home-arrow" onClick={() => navigate('/checkavailabilityrooms')}>
        <FaArrowLeft size={24} />
      </div>

      <h1>Booking Form</h1>

      {roomDetails && (
        <div className="rooms-card">
          <div className="rooms-image-container">
            <img src={roomDetails.main_image} alt={roomDetails.name} className="rooms-image" />
          </div>
          <div className="rooms-details">
            <h3>{roomDetails.name}</h3>
            <p className="rooms-description">{roomDetails.description}</p>
            <p className="rooms-price">Price: R{roomDetails.price}</p>
            <div className="amenities-hotel">
              {getRoomAmenities().map((amenity, index) => (
                <div key={index} className="amenity-item">
                  {amenity.icon}
                  <span>{amenity.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <p>Check-in Date: {checkIn}</p>
        <p>Check-out Date: {checkOut}</p>

        <label>
          First Name:
          <input
            type="text"
            value={name}
            readOnly // Make the field read-only
          />
        </label>
        <label>
          Surname:
          <input
            type="text"
            value={surname}
            readOnly // Make the field read-only
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            readOnly // Make the field read-only
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

        <label>
          Number of Rooms:
          <button
            type="button"
            className="quantity-button"
            onClick={() => setRooms(Math.max(1, rooms - 1))}
          >
            -
          </button>
          <span className="quantity-value">{rooms}</span>
          <button
            type="button"
            className="quantity-button"
            onClick={() => setRooms(rooms + 1)}
          >
            +
          </button>
        </label>

        <label>
          Number of Adults:
          <button
            type="button"
            className="quantity-button"
            onClick={() => setAdults(Math.max(1, adults - 1))}
          >
            -
          </button>
          <span className="quantity-value">{adults}</span>
          <button
            type="button"
            className="quantity-button"
            onClick={() => setAdults(adults + 1)}
          >
            +
          </button>
        </label>

        <label>
          Number of Children:
          <button
            type="button"
            className="quantity-button"
            onClick={() => setChildren(Math.max(0, children - 1))}
          >
            -
          </button>
          <span className="quantity-value">{children}</span>
          <button
            type="button"
            className="quantity-button"
            onClick={() => setChildren(children + 1)}
          >
            +
          </button>
        </label>

        <button className="confirm-bookingplatfrom" type="submit">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingPlatform;