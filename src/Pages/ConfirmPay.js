import React, { useEffect, useState, useContext } from 'react';
import './ConfirmPay.css';
import axios from 'axios';
import Button from '../Components/UI/Button';
import { Link } from 'react-router-dom';
import CartContext from '../Context/cart-context';

const ConfirmPay = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [payments, setPayments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const cartCtx = useContext(CartContext);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const isAnyFieldEmpty = !selectedFile;

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(
        'https://goldensporesstore.000webhostapp.com/paymentReceive.php',
      ); // Update the URL
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments', error.message);
    }
  };

  const handleAccordionClick = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <Link to="/checkout" className="bk">
        <Button>Back</Button>
      </Link>
      <div className="accordion-container">
        <div className="accordion-fit">
          <h4>CHOOSE A PAYMENT METHOD</h4>
          {payments.map((payment, index) => {
            console.log(payment.account_name);
            return (
              <div key={index} className="accordion-item">
                <div
                  className={`accordion-header ${
                    index === expandedIndex ? 'expanded' : ''
                  }`}
                  onClick={() => handleAccordionClick(index)}
                >
                  <h3>{payment.payment_method}</h3>
                </div>
                {index === expandedIndex && (
                  <div className="accordion-content">
                    {payment.account_name !== '' ? (
                      <p>Name: {payment.account_name}</p>
                    ) : (
                      ''
                    )}
                    <p>{payment.account_number}</p>
                    <p>Charge: ${payment.charge}</p>
                    {payment.description !== '' ? (
                      <p>Description: {payment.description}</p>
                    ) : (
                      ''
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <h4>
          Total Amount:
          <input
            type="text"
            name="totalAmount"
            readOnly
            defaultValue={`$${cartCtx.totalAmount.toFixed(2)}`}
            required
          />
        </h4>
        <div className="proof">
          <h5>Upload Proof of Payment</h5>
          <form className="form">
            <input type="file" onChange={handleFileChange} className="file" />
            <button className="button" disabled={isAnyFieldEmpty}>
              Upload
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConfirmPay;
