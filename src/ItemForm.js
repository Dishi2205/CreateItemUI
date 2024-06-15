import React, { useState } from 'react';
import axios from 'axios';
import './ItemForm.css'; // Import the CSS file

const ItemForm = ({ onItemCreated }) => {
  const [formData, setFormData] = useState({
    actualPrice: '',
    comment: '',
    eventVenuesID: '',
    imageUrl: '',
    listingPrice: '',
    ordersID: '',
    sellerID: '',
    sellingPrice: '',
    status: '',
    type: '',
    validatedOn: '',
    verified: true,
    lock: true
  });

  const [imageUrlError, setImageUrlError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (['actualPrice', 'listingPrice', 'sellingPrice'].includes(name) && value.length > 4) {
      alert('Cannot enter more than 4 digits');
      return;
    }

    if (name === 'imageUrl') {
      const imagePattern = /\.(jpg|jpeg|png|gif)$/i;
      if (!imagePattern.test(value)) {
        setImageUrlError('Please enter a valid image URL (jpg, jpeg, png, gif)');
      } else {
        setImageUrlError('');
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (imageUrlError) {
      alert('Please correct the errors before submitting.');
      return;
    }

    axios.post('http://localhost:5000/cart/tickets', formData)
      .then(response => {
        alert('Item created successfully');
        onItemCreated(); // Fetch updated item list
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>Create a New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group-inline">
            <div>
              <label>Actual Price:</label>
              <input
                type="number"
                name="actualPrice"
                value={formData.actualPrice}
                onChange={handleChange}
                maxLength="4"
                required
              />
            </div>
            <div>
              <label>Listing Price:</label>
              <input
                type="number"
                name="listingPrice"
                value={formData.listingPrice}
                onChange={handleChange}
                maxLength="4"
                required
              />
            </div>
          </div>
          <div className="form-group-inline">
            <div>
              <label>Selling Price:</label>
              <input
                type="number"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleChange}
                maxLength="4"
                required
              />
            </div>
            <div>
              <label>Event Venues ID:</label>
              <input
                type="number"
                name="eventVenuesID"
                value={formData.eventVenuesID}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group-inline">
            <div>
              <label>Orders ID:</label>
              <input
                type="number"
                name="ordersID"
                value={formData.ordersID}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Seller ID:</label>
              <input
                type="number"
                name="sellerID"
                value={formData.sellerID}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group-inline">
            <div>
              <label>Image URL:</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
              />
              {imageUrlError && <p className="error">{imageUrlError}</p>}
            </div>
            <div>
              <label>Status:</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group-inline">
            <div>
              <label>Type:</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Validated On:</label>
              <input
                type="text"
                name="validatedOn"
                value={formData.validatedOn}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Comment:</label>
            <input
              type="text"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="button-container">
            <button type="submit" className="button">Create Item</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
