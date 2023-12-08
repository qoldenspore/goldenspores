import React from 'react'
import './Hero.css'
import {useNavigate} from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <h1>Buy Magic Mushrooms </h1>
      <p>
        Buy Magic Mushrooms  for sale at our  Magic Mushrooms Store Online.
        Buy Shrooms , Magic Truffles for sale , Buy Psilocybe Spores  and
        Magic Mushroom Spore  for sale, Buy Shroom Edibles  and Microdosing
        Mushrooms  for sale.
      </p>
      <button onClick={()=>navigate('/shop')}>Buy Now</button>
    </section>
  );
}

export default Hero