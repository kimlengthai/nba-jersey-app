import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { getUserFromLocalStorage } from '../utils/authHelpers';
import './Welcome.css';

function Welcome() 
{
  // Holds current logged-in user
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState('Hello');
  const navigate = useNavigate();

  useEffect(() => 
  {
    try
    {
      // Attemp to get user from localStorage
      const storedUser = getUserFromLocalStorage();
      // Checks if a user is logged in using localStorage
      // If not logged in, redirects to login page
      if (!storedUser ||
        typeof storedUser !== 'object' ||
        !storedUser._id ||
        !storedUser.name ||
        !storedUser.email ||
        !storedUser.role
      )
      {
        throw new Error("Invalid user object");
      } 
      setUser(storedUser);

      // Time-based greeting
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 18) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
      }
      catch (err)
      {
        console.error("User data error:", err.message);
        navigate('/login');
      }
  }, [navigate]); // Re-runs when navigate function changes

  return (
    <div className="welcome-page">
      <Navbar />

      <div className="container welcome-container">
        <div className="row g-4">
          {/* Welcome Message */}
          <div className="col-md-6 col-lg-4">
            <div className="card welcome-card text-center">
              <h2 className="welcome-title">{greeting}, {user?.name}</h2>
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

          {/* Staff Only: Create Product */}
          {user?.role === 'staff' && (
            <div>
              <div className="col-md-6 col-lg-4">
                <div className="card welcome-card action-card">
                  <h5 className="card-title">Create Product</h5>
                  <p>Create a new product (staff only).</p>
                  <Link to="/create-product" className="btn btn-warning mt-3">Create Product</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Welcome;

// Rec: Loading State
// Rec: Error Handling: Handle corrupt or missing localStorage data
// Rec: Greeting Personalisation: Consider a time-based greeting