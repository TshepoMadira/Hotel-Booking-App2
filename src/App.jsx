import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import Aboutus from './components/Aboutus';
import Contactus from './components/Contactus';
import TermsandConditions from './components/TermsandConditions';
import FAQS from './components/FAQS';
import ForgotPassword from './components/ForgotPassword';
import Gallery from './components/Gallery';
import BookingPlatform from './components/BookingPlatform';
import CheckavailabilityRooms from './components/CheckavailabilityRooms';
import ConfirmBooking from './components/ConfirmBooking';
import PayPalButton from './components/PayPalButton';
import AdminReservations from './components/Admin/AdminReservations';
import UserProfile from './components/Userprofile';




const App = () => {
  const location = useLocation();

  return (
    <>
      <Navbar isHomepage={location.pathname === '/'} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/termsandconditions" element={<TermsandConditions />} />
        <Route path="/faqs" element={<FAQS />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/bookingplatform" element={<BookingPlatform />} />
        <Route path="/checkavailabilityrooms" element={<CheckavailabilityRooms />} />
        <Route path="/confirmbooking" element={<ConfirmBooking />} />
       <Route path="/paypal" element={<PayPalButton />} />
       <Route path="/adminreservations" element={<AdminReservations />} />
       <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
      
    </>
  );
};

export default App;
