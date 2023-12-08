import React, { useContext, useEffect, useState } from 'react';
import { NavLink , useNavigate} from 'react-router-dom';
import logo from '../../Assets/img/logo.png';
import './Navbar.css';
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  const open_navbar = () => {
    setOpen(true);
  };
  const close_navbar = () => {
    setOpen(false);
  };
    const onLogout = () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      navigate('/login')
      window.location.reload();
    };

  return (
    <section id="header">
      <NavLink to="/">
        <img src={logo} className="logo" alt="" />
      </NavLink>
      <ul id="navbar" className={open === true ? 'activ' : ''}>
        <li>
          <NavLink to="/" activeclassname="active" className="navLink">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop" activeclassname="active" className="navLink">
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeclassname="active" className="navLink">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contactUs" activeclassname="active" className="navLink">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink activeclassname="active" to="/cart" className="navLink">
            <i className="fas fa-shopping-bag"></i>
          </NavLink>
        </li>
        <span id="close" onClick={() => close_navbar()}>
          <i className="fas fa-times"></i>
        </span>
      </ul>
      <div id="mobile">
        <NavLink to="/cart">
          <i className="fas fa-shopping-bag"></i>
        </NavLink>
        <span onClick={() => open_navbar()} className="bars">
          <i id="bar" className="fas fa-bars"></i>
        </span>
      </div>
    </section>
  );
};

export default Navbar;
