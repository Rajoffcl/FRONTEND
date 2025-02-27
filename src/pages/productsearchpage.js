import React, { useState } from 'react';
import axios from 'axios';
import './ProductSearchPage.css';
import SearchBar from './SearchBar';
import ProductList from './ProductList';

const ProductSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:8080/api/`, {
        params: { name: query }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="product-search-page">
      <SearchBar onSearch={handleSearch} />
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <ProductList products={products} />
    </div>
  );
};

export default ProductSearchPage;
