import React from 'react'
import Footer from '../Footer/Footer'
import './ContactUs.css'

const ContactUs = () => {
  return (
    <>
      <section id="page-header" className="about-header">
        <h2>#lets_talk</h2>
        <p>LEAVE A MESSAGE. We love to hear from you!</p>
      </section>
      <section id="contact-details" className="section-p1">
        <div className="details">
          <span>GET IN TOUCH</span>
          <h2>Reach Out to Us Through:</h2>
          <h3>Head Office</h3>
          <div>
            <li>
              <i className="far fa-envelope"></i>
              <p>goldensporesstore@gmail.com</p>
            </li>
            <li>
              <i className="fas fa-phone-alt"></i>
              <p>++447404413772</p>
            </li>
            <li>
              <i className="far fa-clock"></i>
              <p>Open 24/7</p>
            </li>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ContactUs