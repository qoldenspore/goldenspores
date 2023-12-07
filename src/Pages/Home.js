import React from 'react';
import Hero from '../Components/Body/Hero';
import Feature from '../Components/Body/Feature';
import Product from './Shop/Products';
import Footer from '../Footer/Footer';

const Home = () => {
  return (
    <div>
      <Hero />
      <Feature />
      <Product />
      <Footer />
    </div>
  );
};

export default Home;
