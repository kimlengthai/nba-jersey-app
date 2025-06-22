import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../utils/api';
import Navbar from '../components/Navbar';

const Checkout = () => 
  {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => 
      {
        if (!id || id.length !== 24) 
          {
            setError("Invalid order ID.");
            return;
        }

    const fetchOrder = async () => 
      {
        try 
        {
          const response = await axios.get(`${apiUrl}/orders/${id}`);
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
    <div className="container py-5">
      <div className="mb-4 text-center">
        <h2 className="text-primary fw-bold">Order Confirmation</h2>
        <p className="text-muted">Thank you for your order!</p>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
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

      <div className="card shadow-sm">
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
                  <td colSpan="3" className="text-end fw-bold">Total:</td>
                  <td className="text-end fw-bold">${totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mt-4">
        <button onClick={() => navigate('/orders')} className="btn btn-outline-primary w-100 w-md-auto">
          Back to Orders
        </button>
        <button className="btn btn-success w-100 w-md-auto">
          Pay for this Order
        </button>
      </div>
    </div>
    </>
  );
};

export default Checkout;