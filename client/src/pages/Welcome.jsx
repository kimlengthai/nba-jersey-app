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
        <span className="navbar-brand fw-bold text-primary">NBA Jersey Shop</span>
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

      {/* Welcome Message */}
      <div className="container my-auto text-center">
        <div className="bg-light rounded p-5 shadow-sm">
          <h2 className="mb-3 text-success">Welcome, {user?.name}!</h2>
          <p className="text-muted fs-5">
            Your email is <strong>{user?.email}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;