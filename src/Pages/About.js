import React, { Fragment } from 'react'
import './About.css'
import Footer from '../Footer/Footer';
import AboutUs from '../Assets/img/about/about-us.jpg';

const About = () => {
  return (
    <Fragment>
      <section id="page-header" className="about-header">
        <h2>#KnowUs</h2>
        <p></p>
      </section>
      <section id="about-head" className="section-p1">
        <img src={AboutUs} alt="" />
        <div>
          <h2>Who We Are?</h2>
          <p>
            Our Psychedelic movement is not only providing
            psychedelic products for sale on our shelves. We are pushing
            for psychedelic decriminalization globally for both
            medical or therapeutic reasons and recreational reasons.
          </p>
        </div>
      </section>
      <section id="about-app" className="section-p1">
      </section>
      <Footer />
    </Fragment>
  );
}

export default About