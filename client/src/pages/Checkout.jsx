import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../utils/api';
import Navbar from '../components/Navbar';
import './Checkout.css';

const Checkout = () => 
  {
    // Get the order ID from the URL parameter
    const { id } = useParams();
    const navigate = useNavigate();
    // State to store fetched order
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    // Fetch order details when component loads
    // or when `id` changes
    useEffect(() => 
      {
        // Check if order ID is valid
        if (!id || id.length !== 24) 
          {
            setError("Invalid order ID.");
            return;
        }

    const fetchOrder = async () => 
      {
        try 
        {
          // Make GET request to fetch order details from the backend
          const response = await axios.get(`${apiUrl}/orders/${id}`);
          // Save order details in state
          setOrder(response.data);
        } 
        catch (err) 
        {
          console.error("Failed to fetch order:", err);
          setError("Failed to load order details. Please try again later.");
        }
    };

    fetchOrder();
  }, [id]);

  if (!order) return <div className="alert alert-danger mt-5 text-center">{error}</div>;

  // Destructure order details for easier use
  const 
  {
    _id,
    orderDate,
    totalAmount,
    status,
    shippingAddress,
    items
  } = order;

  return (
    <>
    <Navbar />
    <div className="container checkout-container">

      <div className="checkout-header">
        <h2>Order Confirmation</h2>
        <p>Thank you for your order!</p>
      </div>

      <div className="card checkout-card">
        <div className="card-body order-summary">
          <h5 className="mb-3">Order Summary</h5>
          <p><strong>Order ID:</strong> {_id}</p>
          <p><strong>Order Date:</strong> {new Date(orderDate).toLocaleString()}</p>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</p>
          <p>
            <strong>Shipping Address:</strong><br />
            {`${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postalCode}, ${shippingAddress.country}`}
          </p>
        </div>
      </div>

      <div className="card checkout-card">
        <div className="card-body">
          <h5 className="mb-3">Order Items</h5>
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>NBA Jersey</th>
                  <th className="text-end">Unit Price</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-end">Subtotal</th>
                </tr>
              </thead>
              <tbody>
              {/* Render each item in the order */}
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.productId?.player || 'Unnamed Product'}</td>
                    <td className="text-end">${item.unitPrice.toFixed(2)}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-end">${(item.unitPrice * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-end">Total:</td>
                  <td className="text-end">${totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <div className="checkout-buttons">
        <button onClick={() => navigate('/orders')} className="btn btn-outline-primary">
          View All Orders
        </button>
        {status !== 'Completed' && (
          <button onClick={() => navigate(`/payment/${id}`)} className="btn btn-success">
            Make a Payment
          </button>
        )}
      </div>
    </div>
    </>
  );
};

export default Checkout;

// Rec: Loader while order data is being fetched
// Download invoice (PDF)
// Toast notification
// Order not found page if 404 is returned by backend