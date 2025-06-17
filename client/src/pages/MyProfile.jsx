import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function MyProfile() 
{
  // Holds the full user object fetched from localStorage
  const [user, setUser] = useState(null);
  // A flag for whether the profile is in editable mode
  const [editing, setEditing] = useState(false);
  // A form state for user details
  const [form, setForm] = useState({
    name: "",
    email: "",
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: ""
    }
  });

  const navigate = useNavigate();

  useEffect(() => 
    {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        console.log("Loaded user from localStorage:", storedUser);
        // if the user data is found, set the user state
        // else, redirect to the login page
        if (storedUser) 
            {
                setUser(storedUser);
                setForm({
                    name: storedUser.name || "",
                    email: storedUser.email || "",
                    shippingAddress: storedUser.shippingAddress || {
                    street: "",
                    city: "",
                    state: "",
                    postalCode: "",
                    country: ""
                    }
                });
             }
        else
        {
            navigate('/login');
        }
    }, [navigate]);

  // Update Form Inputs 
  const handleChange = (e) => 
    {
      // Ex: e.target.name = "email"
      // Ex: e.target.value = "newemail@example.com"
        const { name, value } = e.target;

        // This block is for shipping address fields
        if (name in form.shippingAddress) 
            {
                setForm((prev) => ({
                    ...prev,
                    shippingAddress: {
                    ...prev.shippingAddress,
                    [name]: value
                    }
                }));
        } 
        // This block is for non-shipping address fields
        else 
        {
            setForm((prev) => ({
                ...prev,
                [name]: value
            }));
        }
  };

  // Save user details
  const handleSave = async () => 
    {
        try 
        {
          // Send a PUT request to update the user's data on the backend
            const res = await axios.put(`http://localhost:3001/users/${user._id}`, form);
            const updatedUser = res.data;
            // Update localStorage
            localStorage.setItem("user", JSON.stringify(updatedUser));
            // Update component state
            setUser(updatedUser);
            // Set editing mode to false
            setEditing(false);
        } catch (err) 
        {
            console.error("Failed to update user:", err);
        }
    };

  // If user data is not found, return a loading message
  if (!user) return <div>Loading...</div>;

  return (
    <>
    <Navbar />
    <div className="container mt-5">

      <h2 className="mb-4">My Profile</h2>

      {/* Personal Information */}
      <div className="card p-4 shadow-sm mb-4">
        <h5 className="mb-3">Personal Information</h5>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        {/* Shipping Address */}
        <h6 className="mt-4">Shipping Address</h6>
        {["street", "city", "state", "postalCode", "country"].map((field) => (
          <div className="mb-2" key={field}>
            <label className="form-label text-capitalize">{field}</label>
            <input
              type="text"
              name={field}
              className="form-control"
              value={form.shippingAddress[field]}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
        ))}

        <div className="mt-3">
          {!editing ? (
            <button className="btn btn-primary" onClick={() => setEditing(true)}>
              Edit
            </button>
          ) : (
            <button className="btn btn-success" onClick={handleSave}>
              Save
            </button>
          )}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="card p-4 shadow-sm mb-4">
        <h5 className="mb-3">Payment Methods</h5>
        <p>Manage your saved payment options.</p>
        <button className="btn btn-outline-primary">Manage Payments</button>
      </div>

      {/* Order History */}
      <div className="card p-4 shadow-sm mb-4">
        <h5 className="mb-3">Order History</h5>
        <p>View past orders and order status.</p>
        <button className="btn btn-outline-primary">View Orders</button>
      </div>
    </div>
    </>
  );
}

export default MyProfile;