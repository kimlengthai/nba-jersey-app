import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Welcome() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="vh-100 d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <Link to="/" className="navbar-brand fw-bold text-primary text-decoration-none">
            NBA Jersey Shop
        </Link>
        <div className="ms-auto d-flex align-items-center gap-3">
          <Link to="/profile" className="btn btn-outline-primary btn-sm px-3">
            My Profile
          </Link>
          <Link to="/catalogue" className="btn btn-outline-primary btn-sm px-3">
            Browse NBA Jerseys
          </Link>
          <button className="btn btn-danger btn-sm px-3" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

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