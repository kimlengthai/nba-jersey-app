import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from '../utils/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Register.css';

function Register() 
{
  const [showPassword, setShowPassword] = useState(false);

  // A form state for user details
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    }
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => 
    {
      // Ex: e.target.name = "email"
      // Ex: e.target.value = "newemail@example.com"
        const { name, value } = e.target;

        if (['street', 'city', 'state', 'postalCode', 'country'].includes(name)) 
            {
                setForm((prev) => ({
                ...prev,
                shippingAddress: {
                    ...prev.shippingAddress,
                    [name]: value
                }
                }));
            } else 
            {
                setForm((prev) => ({
                ...prev,
                [name]: value
                }));
            }

            // Clear error for this field
            setErrors(prev => ({ ...prev, [name]: ''}));
  };

  const validation = () =>
  {
    const newErrors = {};
    const alphaRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const streetRegex = /^[0-9A-Za-z\s]+$/;
    const postalCodeRegex = /^\d{4}$/;

    if (!form.name.trim()) newErrors.name = 'Full name is required.';
    else if (!alphaRegex.test(form.name)) newErrors.name = 'Full name must contain letters only.';

    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!emailRegex.test(form.email)) newErrors.email = 'Email is invalid.';

    if (!form.password) newErrors.password = 'Password is required.';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 5 characters.';

    const { street, city, state, postalCode, country } = form.shippingAddress;

    if (!street.trim()) newErrors.street = 'Street is required.';
    else if (!streetRegex.test(street)) newErrors.street = 'Street can contain letters and numbers only.';

    if (!city.trim()) newErrors.city = 'City is required.';
    else if (!alphaRegex.test(city)) newErrors.city = 'City must contain letters only.';

    if (!state.trim()) newErrors.state = 'State is required.';
    else if (!alphaRegex.test(state)) newErrors.state = 'State must contain letters only.';

    if (!postalCode.trim()) newErrors.postalCode = 'Postal code is required.';
    else if (!postalCodeRegex.test(postalCode)) newErrors.postalCode = 'Postal code must be exactly 4 digits';

    if (!country.trim()) newErrors.country = 'Country is required.';
    else if (!alphaRegex.test(country)) newErrors.country = 'Country must contain letters only.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => 
    {
        e.preventDefault();

        if (!validation()) return;

        axios.post(`${apiUrl}/register`, form)
        .then(res => 
        {
            console.log(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
            navigate('/welcome');
        })
        .catch(err => 
        {
          console.error(err);
          alert("Registration failed. Please try again.")
        });
    };

  return (
    <div className="register-container">
      <div className="register-card" style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
        <h2 className="register-title">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="form-label">Full Name</label>
            <input 
              type="text"
              name="name"
              placeholder="John Doe"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              onChange={handleChange}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Email Address</label>
            <input 
              type="email"
              name="email"
              placeholder="example@email.com"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              onChange={handleChange}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
            <input 
              type="password"
              name="password"
              placeholder="Password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              onChange={handleChange}
            />
            <button
              type="button"
              className='btn btn-outline-secondary'
              onClick={() => setShowPassword(prev => !prev)}
              tabIndex={-1}
              >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            </div>
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>

          <h5 className="mt-4 mb-3">Shipping Address</h5>

          <div className="form-group mb-2">
            <label className="form-label">Street</label>
            <input
              type="text"
              name="street"
              placeholder="Street"
              className={`form-control ${errors.street ? 'is-invalid' : ''}`}
              onChange={handleChange}
            />
            {errors.street && <div className="text-danger">{errors.street}</div>}
          </div>

          <div className="form-group mb-2">
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              className={`form-control ${errors.city ? 'is-invalid' : ''}`}
              onChange={handleChange}
            />
            {errors.city && <div className="text-danger">{errors.city}</div>}
          </div>

          <div className="form-group mb-2">
            <label className="form-label">State</label>
            <input
              type="text"
              name="state"
              placeholder="State"
              className={`form-control ${errors.state ? 'is-invalid' : ''}`}
              onChange={handleChange}
            />
            {errors.state && <div className="text-danger">{errors.state}</div>}
          </div>

          <div className="form-group mb-2">
            <label className="form-label">Postcode</label>
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
              onChange={handleChange}
            />
            {errors.postalCode && <div className="text-danger">{errors.postalCode}</div>}
          </div>

          <div className="form-group mb-4">
            <label className="form-label">Country</label>
            <input
              type="text"
              name="country"
              placeholder="Country"
              className={`form-control ${errors.country ? 'is-invalid' : ''}`}
              onChange={handleChange}
            />
            {errors.country && <div className="text-danger">{errors.country}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-2">Register</button>

          <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="register-login-link">
            Login
          </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;