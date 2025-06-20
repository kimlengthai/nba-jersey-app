import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Catalogue.css';
import { useCart } from '../context/CartContext';
import James from '../assets/James.png';
import Curry from '../assets/Curry.png';
import Ball from '../assets/Ball.png';
import Banchero from '../assets/Banchero.png';
import Barnes from '../assets/Barnes.png';
import Bridges from '../assets/Bridges.png';
import Brunson from '../assets/Brunson.png';
import Butler from '../assets/Butler.png';
import Cade from '../assets/Cade.png';
import Durant from '../assets/Durant.png';
import Edwards from '../assets/Edwards.png';
import Embiid from '../assets/Embiid.png';
import Fox from '../assets/Fox.png';
import Giannis from '../assets/Giannis.png';
import Green from '../assets/Green.png';
import Hali from '../assets/Hali.png';
import Ja from '../assets/Ja.png';
import Jokic from '../assets/Jokic.png';
import Kawhi from '../assets/Kawhi.png';
import Kuzma from '../assets/Kuzma.png';
import Lauri from '../assets/Lauri.png';
import Lavine from '../assets/Lavine.png';
import Luka from '../assets/Luka.png';
import Mitchell from '../assets/Mitchell.png';
import SGA from '../assets/SGA.png';
import Simons from '../assets/Simons.png';
import Tatum from '../assets/Tatum.png';
import Wemby from '../assets/Wemby.png';
import Young from '../assets/Young.png';
import Zion from '../assets/Zion.png';
import Placeholder from '../assets/placeholder.png';

const imageMap = {
  "James.png": James,
  "Curry.png": Curry,
  "Ball.png": Ball,
  "Banchero.png": Banchero,
  "Barnes.png": Barnes,
  "Bridges.png": Bridges,
  "Brunson.png": Brunson,
  "Butler.png": Butler,
  "Cade.png": Cade,
  "Durant.png": Durant,
  "Edwards.png": Edwards,
  "Embiid.png": Embiid,
  "Fox.png": Fox,
  "Giannis.png": Giannis,
  "Green.png": Green,
  "Hali.png": Hali,
  "Ja.png": Ja,
  "Jokic.png": Jokic,
  "Kawhi.png": Kawhi,
  "Kuzma.png": Kuzma,
  "Lauri.png": Lauri,
  "Lavine.png": Lavine,
  "Luka.png": Luka,
  "Mitchell.png": Mitchell,
  "SGA.png": SGA,
  "Simons.png": Simons,
  "Tatum.png": Tatum,
  "Wemby.png": Wemby,
  "Young.png": Young,
  "Zion.png": Zion
}

const easternTeams = [
  "Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls",
  "Cleveland Cavaliers", "Detroit Pistons", "Indiana Pacers", "Miami Heat", "Milwaukee Bucks",
  "New York Knicks", "Orlando Magic", "Philadelphia 76ers", "Toronto Raptors", "Washington Wizards"
];

const westernTeams = [
  "Dallas Mavericks", "Denver Nuggets", "Golden State Warriors", "Houston Rockets", "Los Angeles Clippers",
  "Los Angeles Lakers", "Memphis Grizzlies", "Minnesota Timberwolves", "New Orleans Pelicans",
  "Oklahoma City Thunder", "Phoenix Suns", "Portland Trail Blazers", "Sacramento Kings",
  "San Antonio Spurs", "Utah Jazz"
];

const Catalogue = () => {
  const [products, setProducts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to load products:", err));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { addToCart } = useCart();

  const handleAddToCart = (product) => 
  {
    addToCart(product);
    console.log("Add to cart:", product);
  };

  const { cartItems } = useCart();

  return (
    <div className="container py-5">
      {/* Responsive Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 mb-4">
        <Link to="/welcome" className="navbar-brand fw-bold text-primary fs-4">
          NBA Jersey Shop
        </Link>

        {/* Hamburger */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse w-100" id="navbarContent">
            <ul className="navbar-nav ms-auto align-items-lg-center text-lg-end">
            {/* Teams Dropdown */}
            <li
                className="nav-item dropdown"
                style={{ position: 'relative' }}
                ref={dropdownRef}
                >
                <span
                    className="nav-link fw-semibold text-primary"
                    style={{ cursor: 'pointer', marginRight: '20px' }}
                    onClick={() => setDropdownOpen(prev => !prev)}
                >
                    Teams
                </span>
                {dropdownOpen && (
                    <div
                    className="dropdown-menu p-3 shadow"
                    style={{
                        width: '240px',
                        maxWidth: '95vw',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '2rem',
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        borderRadius: '0 0 0.5rem 0.5rem',
                        backgroundColor: 'white',
                        zIndex: 1100,
                    }}
                    >
                    <div>
                        <h6 className="dropdown-header text-primary">Eastern Conference</h6>
                        {easternTeams.map(team => (
                        <Link
                            key={team}
                            to={`/catalogue?team=${encodeURIComponent(team)}`}
                            className="dropdown-item"
                            onClick={() => setDropdownOpen(false)}
                        >
                            {team}
                        </Link>
                        ))}
                    </div>
                    <div>
                        <h6 className="dropdown-header text-primary">Western Conference</h6>
                        {westernTeams.map(team => (
                        <Link
                            key={team}
                            to={`/catalogue?team=${encodeURIComponent(team)}`}
                            className="dropdown-item"
                            onClick={() => setDropdownOpen(false)}
                        >
                            {team}
                        </Link>
                        ))}
                    </div>
                    </div>
                )}
            </li>

            {/* Cart Icon */}
            <li className="nav-item ms-3 position-relative">
              <Link
                to="/cart"
                className="nav-link text-primary fs-5"
                title="View Cart"
              >
                <i className="fas fa-shopping-cart"></i>
                {cartItems.length > 0 && (
                <span 
                className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'
                style={{ fontSize: '0.6rem' }}>
                {cartItems.length}
                </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Catalogue Heading */}
      <h2 className="text-center mb-4">NBA Jersey Catalogue</h2>

      {/* Product Grid */}
      <div className="row">
        {products.map(product => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm hover-shadow border-0 product-card">
              <img
                src={imageMap[product.imageUrl] || Placeholder}
                className="img-fluid"
                alt={`${product.player} Jersey`}
              />
              <div className="card-body d-flex flex-column justify-content-between">
              <div>
              <h5 className="card-title">{product.player}</h5>
              <p className="card-text"><strong>Team:</strong> {product.team}</p>
                <p className="card-text">
                    <strong>Price:</strong>{" "}
                    {new Intl.NumberFormat('en-AU', {
                    style: 'currency',
                    currency: 'AUD'
                    }).format(product.price)}
                </p>
              </div>
                <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="text-left">
        <Link to="/welcome" className="btn btn-primary mt-4">
          Back
        </Link>
      </div>
    </div>
  );
};

export default Catalogue;