import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 
import { getFirestore, doc, getDoc } from 'firebase/firestore'; 
import './Login.css'; 

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

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
    const db = getFirestore(); // Initialize Firestore

    try {
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      // Get the user's document from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Check if the user is an admin
        if (userData.role === 'admin') {
          navigate('/adminreservations');
        } else {
          navigate('/checkavailabilityrooms');
        }
      } else {
        setError('User document does not exist.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-pagee">
      <div className="login-image-container">
        {/* Optional: Add a login image here */}
      </div>
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className='login-btnn' type="submit">Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <div style={{ marginTop: '10px' }}>
          <a href="/forgotpassword" style={{ color: '#af960c' }}>Forgot Password?</a>
        </div>
        <div style={{ marginTop: '10px' }}>
          <a href="/signup" style={{ color: '#af960c' }}>Need an account? Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
