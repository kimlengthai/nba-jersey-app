import { Link, useNavigate } from "react-router-dom";
import './Home.css';
// import Navbar from "../components/Navbar";

function Home() 
{
  const navigate = useNavigate();
  return (
    <div className="home-wrapper">
      {/* <Navbar /> */}
      <nav className="navbar navbar-expand-lg home-navbar">
      <Link to="/" className="navbar-brand"
      onClick={() => 
      {
        localStorage.removeItem('user');
        navigate('/');
      }}>
        NBA Jersey Shop
      </Link>
      <>
      <div className="home-actions">
          <Link to="/register" className="btn btn-outline-primary btn-sm px-3">
            Register
          </Link>
          <Link to="/login" className="btn btn-outline-secondary btn-sm px-3">
            Login
          </Link>
        </div>
      </>
      </nav>

      {/* Page Content */}
      <div className="home-content">
        <div className="home-box">
          <h1>Welcome to NBA Jersey eCommerce</h1>
          <p>Explore and order your favorite NBA jerseys with ease.</p>
          <div>
            <Link to="/register" className="btn btn-primary btn-lg px-4">
              Register
            </Link>
            <Link to="/login" className="btn btn-outline-secondary btn-lg px-4">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;