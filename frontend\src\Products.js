import React from 'react';
import { Link } from 'react-router-dom';

const Products = ({ products, searchTerm, onSearch }) => {
  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <input type="search" value={searchTerm} onChange={onSearch} placeholder="Search products" />
      <ul>
        {filteredProducts.map(product => (
          <li key={product._id}>
            <Link to={`/products/${product._id}`}>
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;