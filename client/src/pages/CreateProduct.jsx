import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../utils/api';
import { getUserFromLocalStorage } from '../utils/authHelpers';
import { Link } from 'react-router-dom';

const CreateProduct = () => 
{
  // Form state to hold product input data
  const [formData, setFormData] = useState(
  {
    imageBase64: '',
    imageUrl: '',
    price: '',
    team: '',
    player: '',
    
  });

  // Message to show success or error
  const [message, setMessage] = useState('');
  // Get user from local storage
  const user = getUserFromLocalStorage();

  // Handle changes for form fields
  const handleChange = (e) => 
  {
    const { name, value } = e.target;

    // Update the specific field
    setFormData(
    {
      ...formData,
      [name]: name === 'price' ? parseFloat(value) : value,
    });
  };

  // Handle file input ad convert image to Base64
  const handleImageUpload = (e) =>
  {
    // Get the uploaded file
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    // Once file is read, update formData with image
    reader.onloadend = () =>
    {
      setFormData((prev) => (
        {
          ...prev,
          imageBase64: reader.result,
          imageUrl: file.name,
        }
      ));
    };
    // Start reading file as base64
    reader.readAsDataURL(file);
  }

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
      // Send POST request to create product
      const response = await axios.post(`${apiUrl}/create-product`, formData, 
      {
        headers: 
        {
          'x-user-id': user?._id,
        },
      });

      // On success, show message and reset form
      setMessage(`✅ Product created: ${response.data.product.player} (${response.data.product.team})`);
      setFormData({
        imageBase64: '',
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

          { /* Upload Image */}
          <div className='mb-3'>
            <label className='form-label d-block'>
            Image Upload
            </label>
            <input
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            className='d-none'
            id='uploadImageInput'
            />
            <label htmlFor='uploadImageInput' className='btn btn-outline-secondary'>
            Upload Image
            </label>
            {formData.imageBase64 && (
              <div className='mt-3'>
                <img src={formData.imageBase64} alt='Preview' style={{ maxWidth: '100%', maxHeight: '200px'}}/>
              </div>
            )}
            {formData.imageUrl && (
              <div className='mt-2'>
                <strong>Selected: </strong>
                {formData.imageUrl}
              </div>
            )}
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