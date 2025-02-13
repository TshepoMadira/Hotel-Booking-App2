import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux'; 
import { setUser } from '../Redux/userSlice';
import { useAuth } from '../components/AuthContext';
import './Login.css';


import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const db = getFirestore();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        dispatch(setUser({
          id: user.uid,
          email: user.email,
          name: userData.name,
          phone: userData.phone,
        }));

        login();

        if (userData.role === 'admin') {
          toast.success('Login successful! Redirecting to Admin Dashboard.');
          navigate('/adminreservations');
        } else {
          toast.success('Login successful! Redirecting to Room Availability.');
          navigate('/checkavailabilityrooms');
        }
      } else {
        setError('User document does not exist.');
        toast.error('User document does not exist.');
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);  
    }
  };

  return (
    <div className="login-container">
      <h1 className='login-heading'>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <button className='login-button' type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <div className="forgot-password-container">
        <a className='forgot-password-link' href="/forgotpassword">Forgot Password?</a>
      </div>
      <div className="signup-link-container">
        <a className='signup-link' href="/signup">Need an account? Sign Up</a>
      </div>

     
      <ToastContainer />
    </div>
  );
};

export default Login;
