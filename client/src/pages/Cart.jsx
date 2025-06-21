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
import { Link } from 'react-router-dom';
import './Cart.css';

const imageMap = 
{
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

const Cart = () => 
{
    const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

    return (
        <div className='container py-5'>
            <h2>
                Your Cart
            </h2>
            {cartItems.map(item => (
            <div key={item._id} className='card mb-3 p-3'>
                <div className='row g-3 align-items-center'>
                    {/* Image on the left */}
                    <div className="col-md-3">
                        <img
                        src={imageMap[item.imageUrl] || Placeholder}
                        alt={item.player}
                        className="img-fluid rounded"
                        style={{ maxHeight: '120px', objectFit: 'contain' }}
                        />
                    </div>

                    {/* Details on the right */}
                    <div className="col-md-9">
                        <h5>{item.player}</h5>
                        <p><strong>Team:</strong> {item.team}</p>
                        <p><strong>Price:</strong> {new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(item.price)}</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                        <p><strong>Total:</strong> {new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(item.price * item.quantity)}</p>
                        <div className="d-flex flex-wrap gap-2 mt-2">
                            <button
                                className='btn btn-sm btn-outline-secondary'
                                onClick={() => decreaseQuantity(item._id)}
                            >
                                -
                            </button>
                            <button
                                className='btn btn-sm btn-outline-secondary'
                                onClick={() => increaseQuantity(item._id)}
                            >
                                +
                            </button>
                            <button
                                className='btn btn-sm btn-danger'
                                onClick={() => removeFromCart(item._id)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            ))}
            {cartItems.length > 0 && (
                <button
                className='btn btn-warning mt-3'
                onClick={clearCart}>
                Clear Cart
                </button>
            )}
            {cartItems.length === 0 && (
                <p className='text-muted mt-3'>Your cart is empty. Browse the catalogue to add items.</p>
            )}
            {/* Button that navigates to the catalogue */}
            <div className="text-center">
                <Link to="/catalogue" className="btn btn-primary mt-4">
                Go to Catalogue
                </Link>
            </div>

            
        </div>
    )
}

export default Cart;