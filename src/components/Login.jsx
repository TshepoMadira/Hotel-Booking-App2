import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 


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

    try {
     
      console.log('User logged in:', form);

     
     
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <div className="login-container">
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
          <button className='login-btn'type="submit">Login</button>
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