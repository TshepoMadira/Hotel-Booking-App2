import React, { useState } from 'react';
import { auth, db } from '../components/Firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.email !== form.confirmEmail) {
      setError('Email and confirm email do not match.');
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
    <div className='Signup-Container'>
      <h1 className='signup'>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="firstNamee">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="lastNamee">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="emaill">Email:</label>
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
          <label className="confirmEmaill">Confirm Email:</label>
          <input
            type="email"
            id="confirmEmail"
            name="confirmEmail"
            value={form.confirmEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="passssword">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {passwordStrength && <p style={{ color: passwordStrength === 'Strong password' ? 'green' : 'red' }}>{passwordStrength}</p>}
        </div>
        <button type="submit-btnn">Enter</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <div style={{ marginTop: '10px' }}>
        <a className='forgot-password-link'href="/forgot-password">Forgot Password?</a>
      </div>
    </div>
  );
};

export default Signup;