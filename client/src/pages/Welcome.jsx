import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { getUserFromLocalStorage } from '../utils/authHelpers';
import './Welcome.css';

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
    <div className="welcome-page">
      <Navbar />

      <div className="container welcome-container">
        <div className="row g-4">
          {/* Welcome Message */}
          <div className="col-md-6 col-lg-4">
            <div className="card welcome-card text-center">
              <h2 className="welcome-title">Welcome, {user?.name}</h2>
              <p className="welcome-subtitle">
                Your email is <strong>{user?.email}</strong>.
              </p>
            </div>
          </div>

          {/* Account Summary */}
          <div className="col-md-6 col-lg-4">
            <div className="card welcome-card">
              <h5 className="card-title">Account Summary</h5>
              <p><strong>Name:</strong> {user?.name || "Loading..."}</p>
              <p><strong>Email:</strong> {user?.email || "Loading..."}</p>
            </div>
          </div>

          {/* Order History */}
          <div className="col-md-6 col-lg-4">
            <div className="card welcome-card action-card">
              <h5 className="card-title">Order History</h5>
              <p>View and manage your orders.</p>
              <Link to="/orders" className="btn btn-primary mt-3">Go to Orders</Link>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="col-md-6 col-lg-4">
            <div className="card welcome-card action-card">
              <h5 className="card-title">Payment Methods</h5>
              <p>Manage payment info and view payment history.</p>
              <Link to="/payments" className="btn btn-primary mt-3">Manage Payments</Link>
            </div>
          </div>

          {/* Shopping Cart */}
          <div className="col-md-6 col-lg-4">
            <div className="card welcome-card action-card">
              <h5 className="card-title">Shopping Cart</h5>
              <p>Review and modify items in your cart.</p>
              <Link to="/cart" className="btn btn-primary mt-3">View Cart</Link>
            </div>
          </div>

          {/* Staff Only: View All Orders */}
          {user?.role === 'staff' && (
            <div className="col-md-6 col-lg-4">
              <div className="card welcome-card action-card">
                <h5 className="card-title">All Users' Orders</h5>
                <p>View and manage all users' orders (staff only).</p>
                <Link to="/orders/all" className="btn btn-danger mt-3">View All Orders</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Welcome;