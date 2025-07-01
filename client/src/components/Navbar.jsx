import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getUserFromLocalStorage } from '../utils/authHelpers';
import './Navbar.css';

function Navbar() 
{
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => 
    {
        localStorage.removeItem('user');
        navigate('/');
    };

  const user = getUserFromLocalStorage();

  const isCheckoutPage = user && /^\/checkout\/[a-f\d]{24}$/.test(location.pathname);

  return (
    <nav className="custom-navbar navbar navbar-expand-lg bg-white shadow-sm px-4">
      <Link to="/welcome" className="navbar-brand fw-bold text-primary">
        NBA Jersey Shop
      </Link>

      <div className="navbar-links ms-auto d-flex align-items-center gap-3">
        {user ? 
        (
          isCheckoutPage ? 
          (
            <>
              <Link to="/catalogue" className="nav-btn btn btn-outline-primary btn-sm">
                Browse NBA Jerseys
              </Link>
              <Link to="/orders" className="nav-btn btn btn-outline-primary btn-sm">
                My Orders
              </Link>
              <Link to="/payments" className="nav-btn btn btn-outline-primary btn-sm">
                View Payments
              </Link>
              <Link to="/profile" className="nav-btn btn btn-outline-primary btn-sm">
                My Profile
              </Link>
            </>
          ) : location.pathname === '/profile' ? (
            <>
              <Link to="/welcome" className="nav-btn btn btn-outline-primary btn-sm">
                Home
              </Link>
            </>
          ) : location.pathname === '/orders' ? (
            <>
              <Link to="/catalogue" className="nav-btn btn btn-outline-primary btn-sm">
                Browse NBA Jerseys
              </Link>
              <Link to="/payments" className="nav-btn btn btn-outline-primary btn-sm">
                View Payments
              </Link>
              <Link to="/profile" className="nav-btn btn btn-outline-primary btn-sm">
                My Profile
              </Link>
            </>
          ) : location.pathname === '/payments' ? (
            <>
              <Link to="/catalogue" className="nav-btn btn btn-outline-primary btn-sm">
                Browse NBA Jerseys
              </Link>
              <Link to="/orders" className="nav-btn btn btn-outline-primary btn-sm">
                View Orders
              </Link>
              <Link to="/profile" className="nav-btn btn btn-outline-primary btn-sm">
                My Profile
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="nav-btn btn btn-outline-primary btn-sm">
                My Profile
              </Link>
              <Link to="/catalogue" className="nav-btn btn btn-outline-primary btn-sm">
                Browse NBA Jerseys
              </Link>
              {/* Show Home link only if user is staff and path is /orders/all */}
              {user.role === 'staff' && location.pathname === '/orders/all' && (
                <Link to="/welcome" className="nav-btn btn btn-outline-primary btn-sm">
                  Home
                </Link>
              )}
              <button
                className="btn btn-danger btn-sm px-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
        )
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;