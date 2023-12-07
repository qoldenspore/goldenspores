import React, { useContext } from 'react';
import './Feature.css';
import feature1 from '../../Assets/img/features/f1.jpg';
import feature2 from '../../Assets/img/features/f2.jpg';
import feature3 from '../../Assets/img/features/f3.png';
import feature4 from '../../Assets/img/features/f4.png';
import feature5 from '../../Assets/img/features/f5.jpg';
import feature6 from '../../Assets/img/features/f6.png';

import ProductContext from '../../Context/ProductContext';

const Feature = () => {
  const { product } = useContext(ProductContext);
  return (
    <section id="feature" className="section-p1">
      <div className="fe-box">
        <img
          src={feature1}
          alt=""
        />
      </div>
      <div className="fe-box">
        <img src={feature2} alt="" />
      </div>
      <div className="fe-box">
        <img src={feature3} alt="" />
      </div>
      <div className="fe-box">
        <img src={feature4} alt="" />
      </div>
      <div className="fe-box">
        <img src={feature5} alt="" />
      </div>
      <div className="fe-box">
        <img src={feature6} alt="" />
      </div>
    </section>
  );
};

export default Feature;
