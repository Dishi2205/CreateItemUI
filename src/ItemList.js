import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ItemList.css';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch the list of items from the server
    axios.get('http://localhost:5000/cart/tickets')
      .then(response => {
        setItems(response.data.ticket.cartTickets);
      })
      .catch(error => {
        console.error(error);
      });

    // Add the resizer functionality when component mounts
    const handleMouseDown = (e, col) => {
      document.addEventListener('mousemove', resizeColumn);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', resizeColumn);
      });

      function resizeColumn(event) {
        col.style.width = (event.pageX - col.offsetLeft) + 'px';
      }
    };

    const table = document.querySelector('.item-table');
    const cols = table.querySelectorAll('th');

    cols.forEach(col => {
      const resizer = document.createElement('div');
      resizer.classList.add('resizer');
      col.appendChild(resizer);
      resizer.addEventListener('mousedown', e => handleMouseDown(e, col));
    });

  }, []);

  return (
    <div className="table-container">
      <h2 className="table-heading">Item List</h2>
      <table className="item-table">
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Actual Price</th>
            <th>Comment</th>
            <th>Event Venues ID</th>
            <th>Image URL</th>
            <th>Listing Price</th>
            <th>Orders ID</th>
            <th>Seller ID</th>
            <th>Selling Price</th>
            <th>Status</th>
            <th>Type</th>
            <th>Validated On</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.actualPrice}</td>
              <td>{item.comment}</td>
              <td>{item.eventVenuesID}</td>
              <td>{item.imageUrl}</td>
              <td>{item.listingPrice}</td>
              <td>{item.ordersID}</td>
              <td>{item.sellerID}</td>
              <td>{item.sellingPrice}</td>
              <td>{item.status}</td>
              <td>{item.type}</td>
              <td>{item.validatedOn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
