import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { getUserFromLocalStorage } from '../utils/authHelpers';

function Welcome() 
{
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => 
  {
    const storedUser = getUserFromLocalStorage();
    // Checks if a user is logged in using localStorage
    // If not logged in, redirects to login page
    if (!storedUser) 
    {
      navigate('/login');
    } else 
    {
      setUser(storedUser);
    }
  }, [navigate]);

  return (
    <div className="vh-100 d-flex flex-column">
      <Navbar />

      {/* Tiles Container */}
      <div className="container my-5">
        <div className="row g-4">
        {/* Welcome Message Tile */}
        <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm h-100 text-center p-4">
            <h2 className="text-success mb-3">Welcome, {user?.name}</h2>
            <p className="text-muted fs-5">
            Your email is <strong>{user?.email}</strong>.
            </p>
            </div>
        </div>

        { /* Account Summary */}
        <div className="col-md-6 col-lg-4">
        <div className="card shadow-sm h-100 p-4">
        <h5 className="card-title mb-3">
        Account Summary
        </h5>
        <p>
            <strong>Name:</strong> {user?.name || "Loading..."}
        </p>
        <p>
            <strong>Email:</strong> {user?.email || "Loading..."}
        </p>
        </div>
        </div>

        {/* Order History */}
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm h-100 p-4 d-flex flex-column justify-content-between">
              <h5 className="card-title mb-3">Order History</h5>
              <p className="flex-grow-1">View and manage your orders.</p>
              <Link to="/orders" className="btn btn-primary mt-3">
                Go to Orders
              </Link>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm h-100 p-4 d-flex flex-column justify-content-between">
              <h5 className="card-title mb-3">Payment Methods</h5>
              <p className="flex-grow-1">
                Manage payment info and view payment history.
              </p>
              <Link to="/payments" className="btn btn-primary mt-3">
                Manage Payments
              </Link>
            </div>
          </div>

          {/* Shopping Cart */}
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm h-100 p-4 d-flex flex-column justify-content-between">
              <h5 className="card-title mb-3">Shopping Cart</h5>
              <p className="flex-grow-1">Review and modify items in your cart.</p>
              <Link to="/cart" className="btn btn-primary mt-3">
                View Cart
              </Link>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default Welcome;