import React from 'react';

const Product = ({ title, price, imageUrl, productUrl }) => {
  const openProduct = () => {
    window.open(productUrl, '_blank'); // Open product link in a new tab
  };

  return (
    <div style={productCardStyle}>
      <img src={imageUrl} alt={title} style={imageStyle} />
      <h2>{title}</h2>
      <p>${price}</p>
      <button onClick={openProduct}>View on Shopify</button>
    </div>
  );
};

// Simple styling for the product card
const productCardStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  margin: '10px',
  textAlign: 'center',
  maxWidth: '250px',
};

const imageStyle = {
  width: '150px',
  height: '150px',
};

export default Product;