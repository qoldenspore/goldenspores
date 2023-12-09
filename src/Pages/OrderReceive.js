import React, { useEffect, useState } from 'react';
import './OrderReceive.css';
import Tick from '../Assets/img/tick.png';
import axios from 'axios';

const OrderReceive = () => {
  const [number, setNumber] = useState(null);
console.log(number)
  useEffect(() => {
    fetchNumber();
  }, []);
  const fetchNumber = async () => {
    try {
      const response = await axios.get(
        'https://goldensporesstore.000webhostapp.com/receipts.php',
      );
      setNumber(response.data[0]?.receipt_number);
    } catch (error) {
      console.error('Error fetching number', error.message);
    }
  };

  return (
    <section className="orderR">
      <div className="tickImg">
        <img src={Tick} alt="" />
        <h2>Order Received!</h2>
      </div>
      <h5>
        To track your Order, Click on this link
        <a href={`https://wa.me/${number}`} className="w-num">
          {number}
        </a>
      </h5>
    </section>
  );
};

export default OrderReceive;
