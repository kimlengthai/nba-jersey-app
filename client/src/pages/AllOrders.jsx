import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/orders/all');
        console.log('All orders:', response.data);
        setOrders(response.data);
        setError('');  // Clear any previous error
      } catch (err) {
        console.error('Error fetching orders:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Failed to fetch orders.');
      }
    };

    fetchAllOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>All Orders (Staff Only)</h2>
        {error ? (
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