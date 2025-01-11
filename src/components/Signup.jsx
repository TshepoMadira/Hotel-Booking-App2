import React, { useState } from 'react';
import { auth, db } from '../components/Firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    const lengthRequirement = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    if (!lengthRequirement) {
      setPasswordStrength('Password must be at least 8 characters.');
    } else if (!hasUppercase) {
      setPasswordStrength('Password must contain at least one uppercase letter.');
    } else if (!hasLowercase) {
      setPasswordStrength('Password must contain at least one lowercase letter.');
    } else if (!hasNumber) {
      setPasswordStrength('Password must contain at least one number.');
    } else if (!hasSpecialChar) {
      setPasswordStrength('Password must contain at least one special character.');
    } else {
      setPasswordStrength('Strong password');
    }
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      setError('Password and confirm password do not match.');
      return;
    }

    if (passwordStrength !== 'Strong password') {
      setError('Please enter a stronger password.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email
      });

      console.log('User registered and details stored:', form);
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1 className='register'>Sign Up</h1>
      <div className="input-container">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          className="input-field"
          required
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          className="input-field"
          required
        />
      </div>
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
        {passwordStrength && (
          <p className={`password-strength ${passwordStrength === 'Strong password' ? 'strong' : 'weak'}`}>
            {passwordStrength}
          </p>
        )}
      </div>
      <div className="input-container">
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="input-field"
          required
        />
      </div>
      <button className='enterr-button' onClick={handleSubmit}>Enter</button>
      {error && <p className="error-message">{error}</p>}
      <div className="forgot-password-container">
        <a className='forgot-password-link' href="/forgotpassword">Forgot Password?</a>
      </div>
    </div>
  );
};

export default Signup;