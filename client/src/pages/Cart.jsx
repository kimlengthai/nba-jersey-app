import { useCart } from '../context/CartContext';

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
                <h5>{item.player}</h5>
                <p><strong>Team:</strong> {item.team}</p>
                <p><strong>Price:</strong> ${item.price}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Total:</strong> ${(item.price * item.quantity).toFixed(2)}</p>
                <div className="d-flex gap-2">
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
            ))}
            {cartItems.length > 0 && (
                <button
                className='btn btn-warning mt-3'
                onClick={clearCart}>
                Clear Cart
                </button>
            )}
        </div>
    )
}

export default Cart;