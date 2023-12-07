import React, { useState, useEffect } from 'react';
import ProductContext from './ProductContext';
import axios from 'axios';

const ProductContextProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const setIsCategory = (cat) => {
    setCategory(cat);
  };
  const setIsFetching = (value) => {
    setFetching(value);
  };



  useEffect(() => {
    setIsFetching(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'https://goldensporesstore.000webhostapp.com/apiData.php',
        );
        if (res.status === 200) {
          setIsFetching(false);
          setProduct(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
    if (loading) {
      return (
        <div className='loader-container'>
          <div className="loader"></div>
        </div>
      );
    }

  return (
    <ProductContext.Provider
      value={{
        product,
        isFetching: fetching,
        setIsFetching: setIsFetching,
        category,
        setIsCategory: setIsCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
