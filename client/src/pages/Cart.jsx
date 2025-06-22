import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import axios from 'axios';
import { imageMap } from '../assets/playerImages';
import Placeholder from '../assets/placeholder.png';
import { apiUrl } from '../utils/api';
import { getUserFromLocalStorage } from '../utils/authHelpers';
import Navbar from '../components/Navbar';

const Cart = () => 
    {
        // Get user data from localStorage
        const user = getUserFromLocalStorage();

        const userId = user?._id;
        const shippingAddress = user?.shippingAddress;

        const 
        {
            cartItems,
            removeFromCart,
            clearCart,
            increaseQuantity,
            decreaseQuantity
        } = useCart();

        const navigate = useNavigate();

        const totalQuantity = cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );

        const subtotal = cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        const handlePlaceOrder = async () => 
        {
            if (cartItems.length === 0)
                {
                    alert("Cart is empty.");
                    return;
                }
            if (!userId)
                {
                    alert("Please login to place an order.");
                    return;
                }
            if (!shippingAddress)
                {
                    alert("Shipping address is missing. Please update your profile.");
                    return;
                }
            // Format items for API
            const itemsForOrder = cartItems.map(item => (
                {
                    productId: item._id,
                    quantity: item.quantity,
                    unitPrice: item.price
                }
        )
        );

        try
        {
            const response = await axios.post(`${apiUrl}/orders`, 
                {
                    userId,  
                    items: itemsForOrder,
                    shippingAddress,
                    totalAmount: subtotal 
                });

                const orderId = response.data._id;
                clearCart();
                navigate(`/checkout/${orderId}`);
        }
        catch (error)
        {
            console.error('Failed to place order:', error);
            alert('Failed to place order. Please try again.');
        }
        }

        return (
            <>
            <Navbar />
            <div className="container py-5">
            <h2 className="text-primary fw-bold mb-4">Your Cart</h2>
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
                        <strong>Unit Price:</strong>{' '}
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
                        <button
                            onClick={handlePlaceOrder}
                            className="btn btn-success btn-cart-action btn-checkout"
                        >
                            Proceed to Checkout
                        </button>
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
                <div className="card p-4 text-center shadow-sm">
                    <p className="text-muted">
                    Your cart is empty. Browse the catalogue to add items.
                    </p>
                    <Link to="/catalogue" className="btn btn-primary">
                    Continue Shopping
                    </Link>
                </div>
                )}
            </div>
            </>
        );
};

export default Cart;