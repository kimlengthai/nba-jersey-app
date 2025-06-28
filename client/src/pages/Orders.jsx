import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { apiUrl } from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import { getUserFromLocalStorage } from '../utils/authHelpers';
import Navbar from '../components/Navbar';
import './Orders.css';

const Orders = () => 
{
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    const user = getUserFromLocalStorage();
    const userId = user?._id;

    useEffect(() => 
    {
        if (!userId)
        {
            setError("User not found. Please login.");
            return;
        }

        const fetchOrders = async () => 
        {
            try
            {
                const response = await axios.get(`${apiUrl}/orders`, 
                    {
                        params: { userId }
                    }
                );
                setOrders(response.data);
            }
            catch (err)
            {
                console.error("Failed to fatch orders:", err);
                setError("Failed to load orders. Please try again later.");
            }
        };

        fetchOrders();
    }, [userId]);

    if (error)
    {
        return <div className='alert alert-danger mt-5 text-center'>{error}</div>;
    }

    // Delete user's order
    const handleDelete = async (orderId) => 
    {
        try 
        {
            // Send a DELETE request to delete the user's order on the backend
            await axios.delete(`${apiUrl}/orders/${orderId}`);
            // Remove the deleted order from UI
            setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
            // Redirect to the orders page
            navigate("/orders");
        } catch (err) 
        {
            console.error("Failed to delete user's order:", err);
        }
      
    };

    // Function for status coloring
    const getStatusBadgeClass = (status) => 
    {
        switch (status) 
        {
            case 'Completed': return 'success';
            case 'Pending': return 'warning';
            case 'Cancelled': return 'danger';
            default: return 'secondary';
        };
    }; 
    
    return (
        <>
        <Navbar />
        <div className="orders-container">
            <h2 className="orders-title">Your Orders</h2>

            {error && (
            <div className="alert alert-danger text-center mt-4">{error}</div>
            )}

            {orders.length === 0 ? (
            <p className="orders-empty">You have no orders yet.</p>
            ) : (
            <div className="table-responsive">
                <table className="table table-bordered align-middle">
                <thead className="table-light">
                    <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Details</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{new Date(order.orderDate).toLocaleString()}</td>
                        <td>${order.totalAmount.toFixed(2)}</td>
                        <td className="text-center">
                        <span className={`badge bg-${getStatusBadgeClass(order.status)}`}>
                            {order.status}
                        </span>
                        </td>
                        <td>
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => navigate(`/checkout/${order._id}`)}
                        >
                            View Details
                        </button>
                        </td>
                        <td>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(order._id)}
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </div>
        </>
    );
}

export default Orders;