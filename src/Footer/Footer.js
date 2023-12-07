import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom';
import Pay from '../Assets/img/pay/pay.png';
import logo from '../Assets/img/logo.png';


const Footer = () => {
  return (
    <footer className="section-p1">
      <div className="col">
        <Link to='/home'>
          <img className="logo" src={logo} alt="" />
        </Link>
        <h4>Contact</h4>
        <p>
          <strong>Email Address: </strong> test@gmail.ccom
        </p>
        <p>
          <strong>Phone: </strong> +01 2222 365 /(+9) 01 2345 6789
        </p>
        <p>
          <strong>Hours: </strong> Open 24/7
        </p>
        <div className="follow">
          <h4>Follow us</h4>
          <div className="icon">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-pinterest"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>
      </div>
      <div className="col">
        <h4>About</h4>
        <Link to="/about">About us</Link>
        <Link to="/contactUs">Contact Us</Link>
      </div>
      <div className="col">
        <h4>My Account</h4>
        <Link to="/cart">View Cart</Link>
      </div>
      <div className="col install">
        <p>Secured Payment Gateways</p>
        <img src={Pay} alt="" />
      </div>

      <div className="copyright">
        <p>&copy; 2021, Tech2 etc - HTML CSS Ecommerce Template</p>
      </div>
    </footer>
  );
}

export default Footer