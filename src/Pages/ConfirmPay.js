import React, { useEffect, useState, useContext } from 'react';
import './ConfirmPay.css';
import axios from 'axios';
import Button from '../Components/UI/Button';
import { Link } from 'react-router-dom';
import CartContext from '../Context/cart-context';
import { useNavigate } from 'react-router-dom';

const ConfirmPay = () => {
  const navigate = useNavigate();

  const navig = () => {
    navigate('/order-received')
  }
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

  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopyClick = (text, index) => {
    let textToCopy = text;

    if (text.includes(':')) {
      textToCopy = text.split(': ')[1];
    }

    navigator.clipboard.writeText(textToCopy);
    setCopiedIndex(index);
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
                    <div className="cop">
                      <p>{payment.account_number}</p>
                      <button
                        className="copy_btn"
                        onClick={() =>
                          handleCopyClick(payment.account_number, index)
                        }
                      >
                        Copy
                      </button>
                      {copiedIndex === index && <span> Copied!</span>}
                    </div>

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
          {
            <h5>
              Upload Proof of Payment
            </h5>
          }
          <form className="form">
            <input type="file" onChange={handleFileChange} className="file" />
            <button
              className="button"
              onClick={navig}
              disabled={isAnyFieldEmpty}
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConfirmPay;
