import React, { useState, useEffect } from 'react';
import ProductContext from './ProductContext';
import axios from 'axios';

const ProductContextProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

    const [inputs, setInputs] = useState({
      username: '',
      email: '',
      password: '',
    });
  const [error, setError] = useState('');
  

  
  const setIsCategory = (cat) => {
    setCategory(cat);
  };
  const setIsFetching = (value) => {
    setFetching(value);
  };
  useEffect(() => {

    const fetchData = async () => {
        const formData = {
          username: inputs.username,
          email: inputs.email,
          password: inputs.password,
        };

      try {
        const res = await axios.post(
          'https://goldensporesstore.000webhostapp.com/login.php',
          { ...formData },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        console.log(res)

        if (res) {
          console.log(res);
        } else {
          setError(res.data);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
    fetchData();
  },[])



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
