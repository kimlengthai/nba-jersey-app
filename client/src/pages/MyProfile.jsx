import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { apiUrl } from '../utils/api';
import { getUserFromLocalStorage } from '../utils/authHelpers';

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
    <div className="container mt-5">

      <h2 className="mb-4">My Profile</h2>

      {/* Personal Information */}
      <div className="card p-4 shadow-sm mb-4">
        <h3 className="mb-3 fw-bold">Personal Information</h3>

        <div className="mb-3">
          <label className="form-label fw-bold">Full Name</label>
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
          <label className="form-label fw-bold">Email</label>
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
        <h6 className="mt-4 fw-bold">Shipping Address</h6>
        {/* {["street", "city", "state", "postalCode", "country"].map((field) => (
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
        ))} */}

        <div className="mb-2">
          <label className="form-label fw-bold">Street</label>
          <input
            type="text"
            name="street"
            className="form-control"
            value={form.shippingAddress.street}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div className="mb-2">
          <label className="form-label fw-bold">City</label>
          <input
            type="text"
            name="city"
            className="form-control"
            value={form.shippingAddress.city}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div className="mb-2">
          <label className="form-label fw-bold">State</label>
          <input
            type="text"
            name="state"
            className="form-control"
            value={form.shippingAddress.state}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div className="mb-2">
          <label className="form-label fw-bold">Postcode</label>
          <input
            type="text"
            name="postalCode"
            className="form-control"
            value={form.shippingAddress.postalCode}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div className="mb-2">
          <label className="form-label fw-bold">Country</label>
          <input
            type="text"
            name="country"
            className="form-control"
            value={form.shippingAddress.country}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div className="mt-3 d-flex justify-content-between">
          {!editing ? (
            <button className="btn btn-primary" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          ) : (
            <>
            <button className="btn btn-success" onClick={handleSave}>
              Save
            </button>
            </>
          )}
          <button className="btn btn-danger ms-2" onClick={onDeleteClick}>
            Delete
          </button>
        </div>
      </div>

      { /* Confirmation Modal */ }
      <Modal 
      isOpen={showDeleteModal}
      onRequestClose={onDeleteCancel}
      contentLabel="Confirm Account Deletion"
      aria={{
        labelledby: "modal-title",
        describedby: "modal-description"
      }}
      style={{
        overlay: 
        {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        content:
        {
          width: '90%',
          maxWidth: '500px',
          maxHeight: '90%',
          margin: 'auto',
          padding: '16px',
          borderRadius: '12px',
          /* This resets the modal size for margin control */
          inset: 'auto',
          boxSizing: 'border-box'
        }
      }}>

      <h3 className="fw-bold mb-3" id="modal-title">Delete Confirmation</h3>
      <p className="bg-danger text-white rounded p-3 mb-4 text-wrap text-break ms-2" id="modal-description">Are you sure you want to delete your account? This account cannot be undone.</p>

      <div className="d-flex justify-content-between flex-column flex-sm-row gap-2 mt-4">
        <button className="btn btn-secondary ms-2" onClick={onDeleteCancel}>
        Cancel
        </button>
        <button className="btn btn-danger ms-2" onClick={onDeleteConfirm}>
        Delete
        </button>
      </div>
      </Modal>

      {/* Payment Methods */}
      <div className="card p-4 shadow-sm mb-4">
        <h5 className="mb-3">Payment Methods</h5>
        <p>Manage your saved payment options.</p>
        <Link to="/payment" className="btn btn-outline-primary">
        Manage Payments
        </Link>
      </div>

      {/* Order History */}
      <div className="card p-4 shadow-sm mb-4">
        <h5 className="mb-3">Order History</h5>
        <p>View past orders and order status.</p>
        <Link to="/orders" className="btn btn-outline-primary">
        View Orders
        </Link>
      </div>
    </div>
    </>
  );
}

export default MyProfile;