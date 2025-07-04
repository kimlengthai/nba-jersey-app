import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../utils/api';
import Navbar from '../components/Navbar';
import { getUserFromLocalStorage } from '../utils/authHelpers';
import './Payment.css';

const Payment = () => 
  {
    const { id } = useParams(); // order ID from URL
    const navigate = useNavigate();
    // State variable to hold the card number
    const [cardNumber, setCardNumber] = useState('');
    // State variable to hold the expiration date
    const [expirationDate, setExpirationDate] = useState('');

    // Unified form state for all fields
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
          // Extract the month and year from the expiration date
          const [expiryMonth, expiryYear] = formData.expiration.split('/');
          e.preventDefault();
          if (!validate()) return;

          try 
          {
            // Send the payment details to the backend
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

        const formatAndSetCcNumber = e => 
        {
          // Remove all the empty spaces in the input
          const inputValue = e.target.value.replace(/ /g, "");
          // Get only digits
          let inputNumbersOnly = inputValue.replace(/\D/g, "");

          if (inputNumbersOnly.length > 16)
          {
            // If more than 16 digits, get the first 16
            inputNumbersOnly = inputNumbersOnly.substr(0, 16);
          }
          // Get an array of 4 digits per an element EX: ["1234", "5678", "9012",  ...]
          const splits = inputNumbersOnly.match(/.{1,4}/g);

          let spacedNumber = "";
          if (splits)
          {
            // Join all the splits with an empty space
            spacedNumber = splits.join(" ");
          }
          // Set the new CardNumber
          setCardNumber(spacedNumber);
          // Unformatted digits
          setFormData(prev => ({ ...prev, cardNumber: inputNumbersOnly }));
        }

        const formatAndSetExpirationDate = e => 
        {
          const inputValue = e.target.value;
          // Remove all the empty spaces in the input
          const inputWithoutSpaces = inputValue.replace(/ /g, "");
          // Get only digits
          let inputDigitsOnly = inputWithoutSpaces.replace(/\D/g, "");
          if (inputDigitsOnly.length > 4)
          {
            // If more than 4 digits, get the first 4
            inputDigitsOnly = inputDigitsOnly.substr(0, 4);
          }
          // Get an array of 2 digits per an element EX: ["01", "23", "45",  ...]
          const splits = inputDigitsOnly.match(/.{1,2}/g);

          let spacedDate = "";
          if (splits)
          {
            // Join all the splits with an empty space
            spacedDate = splits.join("/");
            // Set the new ExpirationDate
            setExpirationDate(spacedDate);
          }
          setExpirationDate(spacedDate);
          // Formatted as MM/YY
          setFormData(prev => ({ ...prev, expiration: spacedDate }));
        }

    return (
      <>
      <Navbar />
      <div className="payment-container">
        <h2 className="payment-title">Make a Payment</h2>
        <form className="payment-form" onSubmit={handleSubmit}>
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
              className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
              value={cardNumber}
              onChange={formatAndSetCcNumber}
            />
            {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Expiration Date (MM/YY)</label>
            <input
              type="text"
              className={`form-control ${errors.expiration ? 'is-invalid' : ''}`}
              value={expirationDate}
              onChange={formatAndSetExpirationDate}
            />
            {errors.expiration && <div className="invalid-feedback">{errors.expiration}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">CVV</label>
            <input
              type="password"
              maxLength="3"
              className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
              value={formData.cvv}
              onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
            />
            {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
          </div>

          <button type="submit" className="btn btn-success w-100">
            Submit Payment
          </button>
        </form>
      </div>
    </>
    );
  };

export default Payment;