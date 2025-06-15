import { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

function Login() 
{
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => 
    {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
        .then(result => {console.log(result)
            if (result.data === "Success") 
            {
                navigate('/welcome');
            }
        })
        .catch(err => 
            {
                console.error(err);
                setError('Login request failed. Please try again.');
            });
    };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-secondary">
      <div className="bg-white p-4 rounded w-50">
        <h2 className="mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              className="form-control rounded-0"
              placeholder="Enter Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              className="form-control rounded-0"
              placeholder="Enter Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
        </form>
        <p className="mt-3">Don't have an account?</p>
        <Link to="/register" className="btn btn-outline-primary w-100 rounded-0">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;