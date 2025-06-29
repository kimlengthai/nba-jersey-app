import { Link, useNavigate } from "react-router-dom";
import './Home.css';
import trophyImage from '../assets/nba-trophy.png';
// import Navbar from "../components/Navbar";

function Home() 
{
  const navigate = useNavigate();
  return (
    <div className="home-wrapper">
      {/* <Navbar /> */}
      <img 
      src={trophyImage} 
      alt="NBA Trophy" 
      className="nba-trophy-bg" 
      />
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
      <div className="home-hero">
        <div className="home-box shadow-lg">
          <h1 className="display-5">Step Into the Game</h1>
          <p className="lead mb-4">Explore officially licensed NBA jerseys and shop your favourite teams today.</p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/register" className="btn btn-primary btn-lg px-4">
              Get Started
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