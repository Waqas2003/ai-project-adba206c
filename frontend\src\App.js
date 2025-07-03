import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Products from './Products';
import ProductDetail from './ProductDetail';
import Header from './Header';
import Footer from './Footer';

const App = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('/products')
      .then(response => {
        dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', products: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" render={() => (
          <Products products={products} searchTerm={searchTerm} onSearch={handleSearch} />
        )} />
        <Route path="/products/:id" component={ProductDetail} />
      </Switch>
      <Footer />
    </div>
  );
};

const mapStateToProps = state => {
  return { products: state.products };
};

export default connect(mapStateToProps)(App);