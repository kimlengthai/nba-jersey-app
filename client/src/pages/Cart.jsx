import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

import { imageMap } from '../assets/playerImages';
import Placeholder from '../assets/placeholder.png';

const Cart = () => 
    {
        const 
        {
            cartItems,
            removeFromCart,
            clearCart,
            increaseQuantity,
            decreaseQuantity
        } = useCart();

        const totalQuantity = cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );

        const subtotal = cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        return (
            <div className="container py-5">
            <h2>Your Cart</h2>

            {cartItems.map((item) => (
                <div key={item._id} className="card mb-3 p-3">
                <div className="row g-3 align-items-center">
                    <div className="col-md-3">
                    <img
                        src={imageMap[item.imageUrl] || Placeholder}
                        alt={item.player}
                        className="img-fluid rounded"
                        style={{ maxHeight: '120px', objectFit: 'contain' }}
                    />
                    </div>

                    <div className="col-md-9">
                    <h5>{item.player}</h5>
                    <p>
                        <strong>Team:</strong> {item.team}
                    </p>
                    <p>
                        <strong>Price:</strong>{' '}
                        {new Intl.NumberFormat('en-AU', {
                        style: 'currency',
                        currency: 'AUD'
                        }).format(item.price)}
                    </p>
                    <p>
                        <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p>
                        <strong>Total:</strong>{' '}
                        {new Intl.NumberFormat('en-AU', {
                        style: 'currency',
                        currency: 'AUD'
                        }).format(item.price * item.quantity)}
                    </p>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                        <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => decreaseQuantity(item._id)}
                        >
                        -
                        </button>
                        <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => increaseQuantity(item._id)}
                        >
                        +
                        </button>
                        <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeFromCart(item._id)}
                        >
                        Delete
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            ))}

            {cartItems.length > 0 && (
                <>
                <button className="btn btn-warning mt-3" onClick={clearCart}>
                    Clear Cart
                </button>

                <div className="cart-summary-box mt-4">
                    <h3>
                    Subtotal ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}):{' '}
                    <strong>
                        {new Intl.NumberFormat('en-AU', {
                        style: 'currency',
                        currency: 'AUD'
                        }).format(subtotal)}
                    </strong>
                    </h3>

                    <div className="cart-action-buttons">
                    <Link
                        to="/checkout"
                        className="btn btn-success btn-cart-action btn-checkout"
                    >
                        Proceed to Checkout
                    </Link>
                    <Link
                        to="/catalogue"
                        className="btn btn-outline-primary btn-cart-action btn-continue"
                    >
                        Continue Shopping
                    </Link>
                    </div>
                </div>
                </>
            )}

            {cartItems.length === 0 && (
                <>
                <p className="text-muted mt-3">
                    Your cart is empty. Browse the catalogue to add items.
                </p>
                <div className="text-center">
                    <Link to="/catalogue" className="btn btn-primary">
                    Continue Shopping
                    </Link>
                </div>
                </>
            )}
            </div>
        );
};

export default Cart;