import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => 
{
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => 
    {
        setCartItems(prevItems => 
        {
            const existingItem = prevItems.find(item => item._id === product._id);
            if (existingItem) 
            {
                return prevItems.map(item =>
                    item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            } else 
            {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => 
    {
        setCartItems(prev => prev.filter(item => item._id !== productId));
    };

    const clearCart = () => setCartItems([]);

    const increaseQuantity = (id) => 
    {
        setCartItems(prevItems =>
            prevItems.map(item =>
            item._id === id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
            )
        );
    };

    const decreaseQuantity = (id) => 
    {
        setCartItems(prevItems =>
            prevItems.map(item =>
            item._id === id 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
            )
            .filter(item => item.quantity > 0)
        );
    };

    return (
        <CartContext.Provider value={{ 
            cartItems, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};