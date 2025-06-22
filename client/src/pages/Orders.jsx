import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { apiUrl } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { getUserFromLocalStorage } from '../utils/authHelpers';
import Navbar from '../components/Navbar';

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
    
    return (
        <>
        <Navbar />
        <div className="container py-5">
            <h2 className="mb-4 text-primary fw-bold text-center">Your Orders</h2>

            {orders.length === 0 ? (
                <p className="text-center text-muted">You have no orders yet.</p>
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
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{new Date(order.orderDate).toLocaleString()}</td>
                        <td>${order.totalAmount.toFixed(2)}</td>
                        <td>{order.status}</td>
                        <td>
                            <button
                            className="btn btn-sm btn-primary"
                            onClick={() => navigate(`/checkout/${order._id}`)}
                            >
                            View Details
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