import { createContext, useContext, useState } from 'react';
// CartContext - container that holds my cart data and functions.
const CartContext = createContext();
// useCart - hook to access the cart data and functions.
export const useCart = () => useContext(CartContext);

// CartProvider - component that provides 
// the cart data and functions to its children.
export const CartProvider = ({ children }) => 
{
    // cartItems - holds the current items in the cart (an array)
    // setCartItems - function to update the cart items
    const [cartItems, setCartItems] = useState([]);

    // addToCart - function to add an item to the cart
    // product is passed in when addToCart is called
    // prevItems contains all the items currently in the cart
    // I use .find() to see if product._id already exists in prevItems
    // If it does, increase the quantity
    // If not, add the item to the cart with quantity: 1
    const addToCart = (product) => 
    {
        setCartItems(prevItems => 
        {
            // Check if the item is already in the cart using .find()
            const existingItem = prevItems.find(item => item._id === product._id);
            // If it is, increase the quantity
            if (existingItem) 
            {
                // item is each product currently in the cart
                /* Let's say your cart currently looks like this:
                const prevItems = [
                { _id: '123', name: 'Shirt', price: 20, quantity: 2 },
                { _id: '456', name: 'Shoes', price: 50, quantity: 1 }
                ];
                 */

                /*
                When you write:
                prevItems.map(item => {
                // do something with item
                });
                It means item will take on these values one at a time during the loop:
                { _id: '123', name: 'Shirt', price: 20, quantity: 2 }
                { _id: '456', name: 'Shoes', price: 50, quantity: 1 }
                */
                return prevItems.map(item =>
                    item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            } 
            // If not, add the item to the cart with quantity: 1
            else 
            {
                // ...prevItems - copies the prevItems array
                // It means keep the current cart items ^^
                // ...product - copies product properties into a new object
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // removeFromCart - function to remove an item from the cart by its _id
    const removeFromCart = (productId) => 
    {
        // Use .filter() to remove the item
        // It returns a new array excluding the item with the matching _id
        setCartItems(prev => prev.filter(item => item._id !== productId));
    };

    // clearCart - function to clear the cart
    const clearCart = () => setCartItems([]);

    // increaseQuantity - function to increase the quantity of an item
    const increaseQuantity = (id) => 
    {
        // Use .map() to update the quantity
        // if item._id matches id, increase the quantity (quantity + 1)
        // otherwise, return the item unchanged
        setCartItems(prevItems =>
            prevItems.map(item =>
            item._id === id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
            )
        );
    };

    // decreaseQuantity - function to decrease the quantity of an item
    const decreaseQuantity = (id) => 
    {
        // Use .map() to update the quantity
        // if item._id matches id, decrease the quantity (quantity - 1)
        // otherwise, return the item unchanged
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