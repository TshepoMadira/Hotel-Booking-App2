
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
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
import Footer from './components/footer';




function App() {
  

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/termsandconditions" element={<TermsandConditions />} />
        <Route path="/faqs" element={<FAQS/>} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/footer" element={<Footer />} />
        

     

        

      </Routes>
    </Router>
  )
}

export default App
