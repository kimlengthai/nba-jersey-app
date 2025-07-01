import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { apiUrl } from '../utils/api';

const AllOrders = () => 
{
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => 
    {
        // Get currentUser from localStorage
        const storedUser = localStorage.getItem('user');
        const currentUser = storedUser ? JSON.parse(storedUser) : null;

        // Role check before fetching orders
        if (!currentUser || currentUser.role !== 'staff') 
        {
            setError('Only staff can access this page.');
            setOrders([]);
            setLoading(false);
            return; // Skip fetching
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
                        'x-user-id': currentUser._id,
                    },
                });
                setOrders(response.data);
                setError('');
            } 
            catch (err) 
            {
                console.error('Error fetching orders:', err.response?.data || err.message);
                if (err.response?.status === 403) 
                {
                    setError('Only staff can access this page.');
                } 
                else 
                {
                    setError(err.response?.data?.message || 'Failed to fetch orders.');
                }
            } 
            finally 
            {
                setLoading(false);
            }
        };

        fetchAllOrders();
    }, []);
    
    return (
        <>
        <Navbar />
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
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.userId?.name || order.userId?._id}</td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td>{order.status}</td>
                    <td>{new Date(order.orderDate).toLocaleString()}</td>
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