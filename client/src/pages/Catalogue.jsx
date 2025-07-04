import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './Catalogue.css';
import { useCart } from '../context/CartContext';
import Placeholder from '../assets/jerseyCollection/placeholder.png';
import { apiUrl } from '../utils/api';
// Mapping of player names to images
import { imageMap } from '../assets/playerImages';

// Team arrays for dropdown navigation
const easternTeams = 
[
  "Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls",
  "Cleveland Cavaliers", "Detroit Pistons", "Indiana Pacers", "Miami Heat", "Milwaukee Bucks",
  "New York Knicks", "Orlando Magic", "Philadelphia 76ers", "Toronto Raptors", "Washington Wizards"
];

const westernTeams = 
[
  "Dallas Mavericks", "Denver Nuggets", "Golden State Warriors", "Houston Rockets", "Los Angeles Clippers",
  "Los Angeles Lakers", "Memphis Grizzlies", "Minnesota Timberwolves", "New Orleans Pelicans",
  "Oklahoma City Thunder", "Phoenix Suns", "Portland Trail Blazers", "Sacramento Kings",
  "San Antonio Spurs", "Utah Jazz"
];

/* Create a helper function to extract the query parameters from the URL */
const useQuery = () => new URLSearchParams(useLocation().search);

const Catalogue = () => 
{
  // Store all products
  const [products, setProducts] = useState([]);
  // Toggle team dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Reference for detecting outside clicks
  const dropdownRef = useRef();

  // Fetch products from API on initial mount
  useEffect(() => 
  {
    axios.get(`${apiUrl}/products`)
    .then(res => setProducts(res.data))
    .catch(err => console.error("Failed to load products:", err));
  }, []);

  // Close dropdown menu on outside click
  useEffect(() => 
  {
    const handleClickOutside = (event) => 
    {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) 
      {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Access cart functionality and state
  const { addToCart, cartItems } = useCart();

  // Add a product to the shopping cart
  const handleAddToCart = (product) => 
  {
    addToCart(product);
    console.log("Add to cart:", product);
  };

  // Access query parameters from the URL
  const query = useQuery();
  // Get selected team (if any)
  const selectedTeam = query.get('team');

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
                className="nav-item dropdown teams-nav-item"
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
                {/* Show cart count if items exist */}
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

      {selectedTeam && (
        <h5 className='text-secondary mb-4 text-center'>
          Showing products for: <strong>{selectedTeam}</strong>
        </h5>
      )}

      {selectedTeam && (
        <div className='text-center mb-4'>
          <Link to="/catalogue" className='btn btn-outline-primary btn-sm rounded-pill px-4'>
            Show All NBA Jerseys
          </Link>
        </div>
      )}

      {/* Product Grid */}
      <div className="row">
        {products
        // Filter by team
        .filter(product => !selectedTeam || product.team == selectedTeam)
        .map(product => (
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

      {/* Back Button - Only shown if no team is selected */}
      {!selectedTeam && (
        <div className="text-left">
        <Link to="/welcome" className="btn btn-primary mt-4">
          Back
        </Link>
      </div>
      )}
    </div>
  );
};

export default Catalogue;

/* Optional */
// Add loading spinner while fetching products
// Add search functionality for players or teams
// Use modals or toasts for confirm cart additions
// Add pagination for large product collections