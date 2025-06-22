import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getUserFromLocalStorage } from '../utils/authHelpers';

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

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <Link to="/" className="navbar-brand fw-bold text-primary"
      onClick={() => 
      {
        localStorage.removeItem('user');
        navigate('/');
      }}>
        NBA Jersey Shop
      </Link>

      <div className="ms-auto d-flex align-items-center gap-3">
        {user ? 
           location.pathname === '/profile' ? (
          <>
            <Link to="/welcome" className="btn btn-outline-primary btn-sm px-3">
              Home
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="btn btn-outline-primary btn-sm px-3">
              My Profile
            </Link>
            <Link to="/catalogue" className="btn btn-outline-primary btn-sm px-3">
              Browse NBA Jerseys
            </Link>
            <button
              className="btn btn-danger btn-sm px-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;