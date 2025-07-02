import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../utils/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUserFromLocalStorage } from '../utils/authHelpers';

const AllOrders = () => 
{
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => 
    {
        const storedUser = getUserFromLocalStorage();
        setUser(storedUser);
    }, []);

    useEffect(() => 
    {
        if (!user) return;

        if (user.role !== 'staff')
        {
            setError('Only staff can access this page.');
            setOrders([]);
            /* Skip Fetching */
            return;
        }

        const fetchAllOrders = async () => 
        {
            setLoading(true);
            try 
            {
                const response = await axios.get(`${apiUrl}/orders/all`, 
                {
                    headers: 
                    {
                        'x-user-id': user._id,
                    },
                });
                setOrders(response.data);
                setError('');
            } 
            catch (err) 
            {
                console.error('Error fetching orders:', err.response?.data || err.message);
                setError(err.response?.status === 403 ? 'Only staff can access this page.' : 'Failed to fetch orders.');
            } 
            finally 
            {
                setLoading(false);
            }
        };

        fetchAllOrders();
    }, [user]);

    /* Delete user's order in /orders/all route */
    const handleDelete = async (orderId) => 
    {
        try 
        {
            // Send a DELETE request to delete the user's order on the backend
            await axios.delete(`${apiUrl}/orders/all/${orderId}`, 
                {
                    headers: 
                    {
                        'x-user-id' : user?._id
                    }
                }
            );
            // Remove the deleted order from UI
            setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
            // Redirect to the orders all page
            navigate("/orders/all");
        } catch (err) 
        {
            console.error("Failed to delete user's order:", err);
        }
      
    };

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
        <nav className="custom-navbar navbar navbar-expand-lg bg-white shadow-sm px-4">
            <Link to="/welcome" className="navbar-brand fw-bold text-primary">
                NBA Jersey Shop
            </Link>
            <div className='ms-auto'>
            <Link to="/welcome" className="nav-btn btn btn-outline-primary btn-sm">
                Home
            </Link>
            </div>
        </nav>
        <div className="container mt-4">
            <h2>All Orders (Staff Only)</h2>
            {loading ? (
            <p>Loading orders...</p>
            ) : error ? (
            <p className="text-danger">{error}</p>
            ) : (
            <table className="table table-bordered mt-3">
                <thead className="table-light">
                <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.userId?.name || order.userId?._id}</td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td className='text-center'>
                        <span className={`badge bg-${getStatusBadgeClass(order.status)}`}>{order.status}</span>
                    </td>
                    <td>{new Date(order.orderDate).toLocaleString()}</td>
                    <td>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(order._id)}>
                            Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
        </div>
        </>
    );
};

export default AllOrders;