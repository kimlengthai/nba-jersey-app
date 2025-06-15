import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() 
{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => 
    {
        e.preventDefault();
        axios.post('http://localhost:3001/register', { name, email, password })
        .then(res => {
            console.log(res.data);
            navigate('/welcome');
        })
        .catch(err => console.error(err));
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="bg-white p-4 rounded w-50">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" className="form-control mb-3" onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" className="form-control mb-3" onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" className="form-control mb-3" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className="btn btn-success w-100">Register</button>
            </form>
        </div>
        </div>
    );
}

export default Register;