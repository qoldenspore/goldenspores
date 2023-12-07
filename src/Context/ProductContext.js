import React from 'react';

const ProductContext = React.createContext({
  isFetching: true,
  setIsFetching: ()=>{},
  product: {},
  setProduct: [],
  setIsCategory:()=>{}
});
export default ProductContext;
