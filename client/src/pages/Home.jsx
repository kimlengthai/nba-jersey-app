import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() 
{
  return (
    <div className="vh-100 d-flex flex-column bg-light">
      <Navbar />

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