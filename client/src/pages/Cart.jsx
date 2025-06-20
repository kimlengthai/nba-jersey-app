import { useCart } from '../context/CartContext';

const Cart = () => 
{
    const { cartItems, removeFromCart, clearCart } = useCart();

    return (
        <div className='container py-5'>
            <h2>
                Your Cart
            </h2>
            {cartItems.length === 0 ? (
                <p>No items in cart.</p>
            ) : (
                cartItems.map(item => (
                    <div key={item._id} className='card mb-3 p-3'>
                        <h5>{item.player}</h5>
                        <p><strong>Team:</strong> {item.team}</p>
                        <p><strong>Price:</strong> {item.price}</p>
                        <button className='btn btn-sm btn-danger'
                         onClick={() => removeFromCart(item._id)}>
                         Remove
                         </button>
                    </div>
                ))
            )}
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