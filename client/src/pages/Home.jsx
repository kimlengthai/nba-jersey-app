import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

function Home() 
{
  const navigate = useNavigate();
  return (
    <div className="vh-100 d-flex flex-column bg-light">
      {/* <Navbar /> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <Link to="/" className="navbar-brand fw-bold text-primary"
      onClick={() => 
      {
        localStorage.removeItem('user');
        navigate('/');
      }}>
        NBA Jersey Shop
      </Link>
      <>
      <div className="ms-auto d-flex align-items-center gap-3">
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
      <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <div className="text-center bg-white p-5 rounded shadow-sm">
          <h1 className="mb-4 text-primary fw-bold">Welcome to NBA Jersey eCommerce</h1>
          <p className="mb-4 text-muted fs-5">
            Explore and order your favorite NBA jerseys with ease.
          </p>
          <div>
            <Link to="/register" className="btn btn-primary btn-lg me-3 px-4">
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