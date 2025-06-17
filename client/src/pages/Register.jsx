import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() 
{
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
  };

  const handleSubmit = (e) => 
    {
        e.preventDefault();
        axios.post('http://localhost:3001/register', form)
        .then(res => 
        {
            console.log(res.data);
            navigate('/welcome');
        })
        .catch(err => console.error(err));
    };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="bg-white p-5 rounded shadow w-50">
        <h2 className="text-center mb-4 text-primary">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" placeholder="John Doe" className="form-control" onChange={handleChange} required />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" placeholder="example@email.com" className="form-control" onChange={handleChange} required />
          </div>
          <div className="form-group mb-4">
            <label className="form-label">Password</label>
            <input type="password" name="password" placeholder="Password" className="form-control" onChange={handleChange} required />
          </div>
          {/* Shipping Address */}
            <h5 className="mt-3">Shipping Address</h5>
            <input type="text" name="street" placeholder="Street" className="form-control mb-2" onChange={handleChange} required />
            <input type="text" name="city" placeholder="City" className="form-control mb-2" onChange={handleChange} required />
            <input type="text" name="state" placeholder="State" className="form-control mb-2" onChange={handleChange} required />
            <input type="text" name="postalCode" placeholder="Postal Code" className="form-control mb-2" onChange={handleChange} required />
            <input type="text" name="country" placeholder="Country" className="form-control mb-4" onChange={handleChange} required />

          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;