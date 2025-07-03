import React from 'react';

const ProductDetail = ({ match }) => {
  const productId = match.params.id;
  const product = products.find(product => product._id === productId);

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductDetail;