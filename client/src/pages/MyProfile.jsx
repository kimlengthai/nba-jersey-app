import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { apiUrl } from '../utils/api';
import { getUserFromLocalStorage } from '../utils/authHelpers';
import './MyProfile.css';

Modal.setAppElement('#root');

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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => 
    {
        const storedUser = getUserFromLocalStorage();
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

    const notify = () => toast.success('Profile updated successfully!', 
      {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
      });

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
            const res = await axios.put(`${apiUrl}/users/${user._id}`, form);
            const updatedUser = res.data;
            // Update localStorage
            localStorage.setItem("user", JSON.stringify(updatedUser));
            // Update component state
            setUser(updatedUser);
            // Set editing mode to false
            setEditing(false);
            // Show success message
            notify();
        } catch (err) 
        {
            console.error("Failed to update user:", err);
        }
    };

    // Delete user details
    const handleDelete = async () => 
    {
        try 
        {
            // Send a DELETE request to delete the user's data on the backend
            await axios.delete(`${apiUrl}/users/${user._id}`);
            // Remove user data from localStorage
            localStorage.removeItem("user");
            // Redirect to the home page
            navigate("/");
        } catch (err) 
        {
            console.error("Failed to delete user:", err);
        }
      
    };

    // When user clicks Delete button, show modal
    const onDeleteClick = () =>
    {
      setShowDeleteModal(true);
    };

    // Cancel deletion
    const onDeleteCancel = () =>
    {
      setShowDeleteModal(false);
    };

    // Ok to delete
    const onDeleteConfirm = () =>
    {
      setShowDeleteModal(false);
      handleDelete();
    };

  // If user data is not found, return a loading message
  if (!user) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container profile-container">
        <h2 className="mb-4">My Profile</h2>

        {/* Personal Info */}
        <div className="profile-section">
          <h3>Personal Information</h3>

          <div className="mb-3">
            <label className="form-label">Full Name</label>
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

          {/* Address */}
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

          <div className="profile-actions">
            {!editing ? (
              <button className="btn btn-primary" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            ) : (
              <button className="btn btn-success" onClick={handleSave}>
                Save
              </button>
            )}
            <button className="btn btn-danger" onClick={onDeleteClick}>
              Delete
            </button>
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={showDeleteModal}
          onRequestClose={onDeleteCancel}
          contentLabel="Confirm Account Deletion"
        >
          <h3 className="fw-bold mb-3" id="modal-title">Delete Confirmation</h3>
          <p className="modal-warning-text" id="modal-description">
            Are you sure you want to delete your account? This account cannot be undone.
          </p>

          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={onDeleteCancel}>Cancel</button>
            <button className="btn btn-danger" onClick={onDeleteConfirm}>Delete</button>
          </div>
        </Modal>

        {/* Payment */}
        <div className="profile-section">
          <h5>Payment Methods</h5>
          <p>Manage your saved payment options.</p>
          <Link to="/payments" className="btn btn-outline-primary">
            Manage Payments
          </Link>
        </div>

        {/* Orders */}
        <div className="profile-section">
          <h5>Order History</h5>
          <p>View past orders and order status.</p>
          <Link to="/orders" className="btn btn-outline-primary">
            View All Orders
          </Link>
        </div>
      </div>
    </>
  );
}

export default MyProfile;