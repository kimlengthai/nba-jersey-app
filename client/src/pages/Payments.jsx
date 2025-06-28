import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../utils/api';
import { getUserFromLocalStorage } from '../utils/authHelpers';
import Navbar from '../components/Navbar';
import './Payments.css';

const Payments = () => 
  {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState(null);

    const user = getUserFromLocalStorage();

    useEffect(() => 
      {
        const fetchPayments = async () => 
          {
            if (!user?._id) 
            {
              setError("User not found. Please log in.");
              return;
            }
            try 
            {
              const res = await axios.get(`${apiUrl}/payments`, 
              {
                params: { userId: user._id }
              });
              setPayments(res.data);
            } 
            catch (err) 
            {
              console.error("Failed to load payments:", err);
              setError("Could not fetch payment history.");
            }
          };

          fetchPayments();
      }, [user]);

      return (
        <>
          <Navbar />
          <div className="payments-container">
            <h2 className="payments-title">Payment History</h2>

            {error && <div className="alert alert-danger text-center">{error}</div>}

            {payments.length === 0 ? (
              <p className="text-center text-muted">No payment records found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Order ID</th>
                      <th>Cardholder Name</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment._id}>
                        <td>{payment.orderId?._id || 'N/A'}</td>
                        <td>{payment.cardholderName}</td>
                        <td>${payment.orderId?.totalAmount?.toFixed(2) || 'N/A'}</td>
                        <td>{new Date(payment.createdAt).toLocaleString()}</td>
                        <td className="text-center align-middle">
                          <span className={`badge bg-${payment.status === 'Completed' ? 'success' : 'secondary'}`}>
                            {payment.status || 'Completed'}
                          </span>
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
};

export default Payments;