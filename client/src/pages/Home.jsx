import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center mt-5">
      <h2>NBA Jersey eCommerce</h2>
      <Link to="/register" className="btn btn-primary m-2">Register</Link>
      <Link to="/login" className="btn btn-secondary m-2">Login</Link>
    </div>
  );
}

export default Home;