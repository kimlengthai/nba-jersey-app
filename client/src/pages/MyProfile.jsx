import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function MyProfile() 
{
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
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

  const handleChange = (e) => 
    {
        const { name, value } = e.target;

        if (name in form.shippingAddress) 
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

  const handleSave = async () => 
    {
        try 
        {
            const res = await axios.put(`http://localhost:3001/users/${user._id}`, form);
            const updatedUser = res.data;
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            setEditing(false);
        } catch (err) 
        {
            console.error("Failed to update user:", err);
        }
    };

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