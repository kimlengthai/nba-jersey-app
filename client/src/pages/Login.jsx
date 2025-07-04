import { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { apiUrl } from '../utils/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

function Login() 
{
  // State for form inputs
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  // Handling the login process when
  // a user submit the login form
  const handleSubmit = (e) => 
    {
      // Prevent page reload
        e.preventDefault();
        // Clear existing error
        setError("");
        // Rec: Loading State
        // Rec: Consider rate limiting and CAPTCHA on the backend to prevent brute-force attacks
        // Rec: Add Remember Me option
        // Send the form data to the server using POST request
        axios.post(`${apiUrl}/login`, { email, password })
        .then(result => 
        {
          console.log(result)
          // Check if login was successful
          if (result.data.status === "Success") 
          {
            // Store user data in local storage for session persistence
            localStorage.setItem('user', JSON.stringify(result.data.user));
            navigate('/welcome');
          }
          else
          {
            // Display specific error
            setError(result.data.message);
          }
        })
        .catch(err => 
          {
            console.error(err);
            // Fallback for network/server error
            setError('Login request failed. Please try again.');
          });
    };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              className="form-control login-input"
              placeholder="Enter Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <div className="input-group">
              <input
                type={showPassword ? "password" : "text"}
                className="form-control login-input"
                placeholder="Enter Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary password-toggle-btn"
                onClick={() => setShowPassword(prev => !prev)}
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-success login-btn">Login</button>
        </form>
        <p className="mt-3">Don't have an account?</p>
        <Link to="/register" className="btn btn-outline-primary login-btn">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;