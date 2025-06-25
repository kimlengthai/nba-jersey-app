import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../utils/api';
import Navbar from '../components/Navbar';
import { getUserFromLocalStorage } from '../utils/authHelpers';

const Payment = () => 
  {
    const { id } = useParams(); // order ID from URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
      {
        cardholder: '',
        cardNumber: '',
        expiration: '',
        cvv: ''
      });

      const [errors, setErrors] = useState({});

      const validate = () => 
        {
          const newErrors = {};
          const nameRegex = /^[A-Za-z\s]+$/;
          const cardRegex = /^\d{16}$/;
          const cvvRegex = /^\d{3}$/;
          const expRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

          if (!nameRegex.test(formData.cardholder)) 
          {
            newErrors.cardholder = 'Cardholder name must contain letters only.';
          }

          if (!cardRegex.test(formData.cardNumber)) 
          {
            newErrors.cardNumber = 'Card number must be 16 digits.';
          }

          if (!expRegex.test(formData.expiration)) 
          {
            newErrors.expiration = 'Expiration must be in MM/YY format.';
          } 
          else 
          {
            const [month, year] = formData.expiration.split('/').map(Number);
            const now = new Date();
            const expDate = new Date(`20${year}`, month - 1);
            if (expDate < now) 
            {
              newErrors.expiration = 'Expiration date must be in the future.';
            }
          }

          if (!cvvRegex.test(formData.cvv)) 
          {
            newErrors.cvv = 'CVV must be 3 digits.';
          }

          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
        };

      const handleSubmit = async (e) => 
        {
          const user = getUserFromLocalStorage();
          const [expiryMonth, expiryYear] = formData.expiration.split('/');
          e.preventDefault();
          if (!validate()) return;

          try 
          {
            await axios.post(`${apiUrl}/payment`, 
              {
                orderId: id,
                userId: user._id,
                cardholderName: formData.cardholder,
                cardNumber: formData.cardNumber,
                expiryMonth,
                expiryYear,
                cvv: formData.cvv
              });
              navigate(`/checkout/${id}`);
          } 
          catch (err) 
          {
            console.error('Payment failed:', err.response?.data || err.message);
            alert(err.response?.data?.message || 'Payment failed. Please try again.');
          }
        };

    return (
      <>
        <Navbar />
        <div className="container py-5">
          <h2 className="mb-4 text-center text-success fw-bold">Make a Payment</h2>
          <form className="card p-4 mx-auto" style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Cardholder's Name</label>
              <input
                type="text"
                className={`form-control ${errors.cardholder ? 'is-invalid' : ''}`}
                value={formData.cardholder}
                onChange={(e) => setFormData({ ...formData, cardholder: e.target.value })}
              />
              {errors.cardholder && <div className="invalid-feedback">{errors.cardholder}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                maxLength="16"
                className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              />
              {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Expiration Date (MM/YY)</label>
              <input
                type="text"
                className={`form-control ${errors.expiration ? 'is-invalid' : ''}`}
                value={formData.expiration}
                onChange={(e) => setFormData({ ...formData, expiration: e.target.value })}
              />
              {errors.expiration && <div className="invalid-feedback">{errors.expiration}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">CVV</label>
              <input
                type="text"
                maxLength="3"
                className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
              />
              {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
            </div>

            <button type="submit" className="btn btn-success w-100"
            >
              Submit Payment
            </button>
          </form>
        </div>
      </>
    );
  };

export default Payment;