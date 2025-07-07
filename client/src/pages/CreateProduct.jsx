import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../utils/api';
import { getUserFromLocalStorage } from '../utils/authHelpers';
import { Link } from 'react-router-dom';

const CreateProduct = () => 
{
  const [formData, setFormData] = useState(
  {
    imageUrl: '',
    price: '',
    team: '',
    player: '',
    
  });

  const [message, setMessage] = useState('');
  const user = getUserFromLocalStorage();

  const handleChange = (e) => 
  {
    const { name, value } = e.target;

    setFormData(
    {
      ...formData,
      [name]: name === 'price' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();

    // Validate all fields
    const { imageUrl, price, team, player } = formData;
    if (!imageUrl || !price || !team || !player) 
    {
      setMessage('All fields are required.');
      return;
    }

    try 
    {
      const response = await axios.post(`${apiUrl}/create-product`, formData, 
      {
        headers: 
        {
          'x-user-id': user?._id,
        },
      });

      setMessage(`✅ Product created: ${response.data.product.player} (${response.data.product.team})`);
      setFormData({
        imageUrl: '',
        price: '',
        team: '',
        player: '',
      });
    } 
    catch (error) 
    {
      console.error(error);
      setMessage(error.response?.data?.message || 'Error creating product.');
    }
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
      <div className="container mt-5">
        <h2>Create New Product</h2>
        {message && <div className="alert alert-info mt-3">{message}</div>}

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              className="form-control"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price ($)</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
              min="1"
              step="0.01"
              placeholder="e.g., 129.99"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Team</label>
            <input
              type="text"
              name="team"
              className="form-control"
              value={formData.team}
              onChange={handleChange}
              placeholder="e.g., Lakers"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Player</label>
            <input
              type="text"
              name="player"
              className="form-control"
              value={formData.player}
              onChange={handleChange}
              placeholder="e.g., LeBron James"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Create Product
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;