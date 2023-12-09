import React, { useEffect, useState } from 'react';
import './SingleProduct.css';
import Button from '../Components/UI/Button';
import { useContext, useRef } from 'react';
import ProductContext from '../Context/ProductContext';
import { Link, useParams } from 'react-router-dom';
import Input from '../Components/UI/Input';
import CartContext from '../Context/cart-context';

const SingleProduct = () => {
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});

  const { isFetching } = useContext(ProductContext);

  const { product } = useContext(ProductContext);

  const [newPath, setNewPath] = useState('');

  const cartCtx = useContext(CartContext);

  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  useEffect(() => {
    if (!isFetching) {
      const newProduct = product.find((item) => item.id === id);
      setCurrentProduct({ ...newProduct });
    }
    const fetchData = () => {
      setNewPath(
        'https://goldensporesstore.000webhostapp.com/reactecomphp/uploads/',
      );
    };
    fetchData();
  }, [isFetching, product, id]);

  const fileNameWithExtension = currentProduct?.itemName;
  const fileNameWithoutExtension = currentProduct?.itemName?.split('.')[0];

  const mainPath = newPath + fileNameWithExtension;

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    cartCtx.addItem({
      id: currentProduct.id,
      name: fileNameWithoutExtension,
      image: mainPath,
      category: currentProduct.category,
      amount: +enteredAmount,
      price: +currentProduct.price,
    });


  };
  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, ...cartCtx.items];
    localStorage.setItem('cart', JSON.stringify(updatedCart));


    const storedTotalAmount =
      JSON.parse(localStorage.getItem('totalAmount')) || 0;
    const updateTotalAmount = storedTotalAmount + cartCtx.totalAmount;
    localStorage.setItem('totalAmount', updateTotalAmount);

    
  }, [cartCtx.items, cartCtx.totalAmount]);

  const description = () => {
    if (currentProduct?.category === 'LSD') {
      return (
        <span>
          Buy 100ML 1P-LSD Microdosing Kit online. The bottle contains a 100
          micogram tab into 100ml of distilled water, which means every 1 ml of
          water will have 1 microgram of 1P-LSD (1-propionyl-lysergic acid
          diethylamide). The average microdose of 1P-LSD is 10MLs or 10
          Micrograms. When you’re ready to dose, use a plunger syringe (no
          needle necessary) or dropper to measure the amount that you want. Use
          the plunger to squirt it into your mouth. Swish it around in your
          mouth for 3-5 minutes, then swallow.
        </span>
      );
    } else if (currentProduct?.category === 'DMT') {
      return (
        <span>
          100ML 4-ACO-DMT Microdosing Kit and 1P-LSD are very potent chemicals,
          even at the microdose level. Please secure and store your 4-ACO-DMT
          bottles in lockable container in the freezer inaccessible by children
          and pets.
        </span>
      );
    } else if (currentProduct?.category === 'IBOGAINE') {
      return (
        <span>
          Iboga TA for sale from our iboga online shop is the extract of the
          ibogaine alkaloid, mixed with other un researched compounds found in
          Iboga root bark responsible for its psychedelic properties. It is
          extracted from Iboga Root bark powder , It is composed of an estimated
          60-70% ibogaine. It appears as brown clumps or ground brown powder.
        </span>
      );
    } else if (currentProduct?.category === 'SHROOM EDIBLES') {
      return (
        <span>
          Buy Alice Green Apple Mushroom Gummy (1000mg) online. Whether you’re
          looking to take a trip to a land far beyond your imagination, or want
          to enhance your day to day reality, Alice has you covered. By using
          the highest quality Psilocybin Mushrooms, we have created reliably
          dosed, yet unbelievably delicious edibles to take you wherever your
          mind wanders.
        </span>
      );
    } else if (currentProduct?.category === 'MDMA') {
      return (
        <span>
          MDMA has been described as an empathogenic drug because of its
          empathy-producing effects. Results of several studies show the effects
          of increased empathy with others. When testing MDMA for medium and
          high doses, it showed increased hedonic and arousal continuum. The
          effect of MDMA increasing sociability is consistent, while its effects
          on empathy have been more mixed.
        </span>
      );
    } else if (currentProduct?.category === 'Peyote') {
      return (
        <span>
          Buy Peyote online. It is always good news when a new breed is added to
          the psychedelic cactus family. Unique nuances are always welcome in
          the netherworld of mescaline. Lophophora decipiens is now being
          considered a separate species of peyote cactus and not a variety of
          williamsii.
        </span>
      );
    } else if (currentProduct?.category === 'shrooms') {
      return (
        <span>
          The chemical compound (tryptophan) of the magical shrooms enhances
          serotonin production. Serotonin is a neurotransmitter in the brain
          responsible for mental wellness and a feeling of happiness. Patients
          with serotonin deficiency suffer depression, post-traumatic stress
          disorder, anxiety, and bipolar mood disorders. Dietary supplementation
          of serotonin through the Amazonian magic mushrooms will enhance a
          patient’s mood and relieve them from their distresses.
        </span>
      );
    } else if (currentProduct?.category === 'MAGIC TRUFFLES') {
      return (
        <span>
          The Mushrocks Truffles are one of our medium/strong magic truffles.
          They are therefore suitable for more medium or somewhat experienced
          users. These magic truffles give you a sense of euphoria. Colors look
          more vivid and you might get a laughing kick. Real hallucinations do
          not occur. These truffles guarantee an intense visuals trip. Suitable
          for beginners/experienced users.
        </span>
      );
    } else if (currentProduct?.category === 'MICRODOSING MUSHROOMS') {
      return (
        <span>
          {' '}
          Maca is generally a known aphrodisiac and energy booster. Helping to
          balance hormones in the body it is also packed full of vitamins and
          minerals to keep you going. Alongside cordyceps, known for increasing
          stamina and energy, Be Passionate will be your go to bedside addition.
        </span>
      );
    } else if (currentProduct?.category === 'Ketamine') {
      return (
        <span>
          Ketamine is known for its rapid onset and strong efficacy. A survey
          which was conducted by the National Institute of Mental Health in the
          year 2006 discovered that 18 individuals who utilized the medication
          (Ketamine) reported a swift change in mood within a few hours. It
          should be noted that the mechanism of action of Ketamine is yet to be
          well-understood,
        </span>
      );
    } else if (currentProduct?.category === 'Bag') {
      return (
        <span>
          Our grow kit includes everything you need to grow your own mushrooms–
          just add your own spores or liquid culture! Every bag contains our
          blend of sterilized grain and substrate, instructional guides, and
          links to tutorial videos to make your growing experience safe and
          simple.
        </span>
      );
    } else if (currentProduct?.category === 'MAGIC MUSHROOM SPORES') {
      return (
        <span>
          The spore prints we receive have been produced in sterile,
          professionally equipped laboratories that operate to the highest
          standards. This ensures quality genetic specimens for your microscopy
          research.
        </span>
      );
    } else if (currentProduct?.category === 'ayahuasca') {
      return (
        <span>
          Ayahuasca is indigenous to the Amazon basin, where it was prepared as
          a drink by shamans. Their goal was to learn about the mental and
          spiritual conditions of their patients. The primary ingredient in
          ayahuasca is the Banisteriopsis caapi vine, but the beverage is a
          blend of multiple plants. In any combination, ayahuasca tea always
          contains MAO inhibitors, which can result in spiritual experiences.{' '}
        </span>
      );
    }
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };


  return (
    !isFetching && (
      <form onSubmit={submitHandler}>
        <div key={currentProduct?.id} id="prodetails" className="section-p1">
          <div className="single-pro-image">
            <Link to="/"> 
              <button className="close">Back</button>
            </Link>
            <img
              src={mainPath}
              width="100%"
              id="MainImg"
              alt=""
              className="spi-img"
            />
          </div>
          <div className="single-pro-details">
            <h6>
              <Link className='homeLink' to='/'>Home</Link> / {currentProduct?.category}
            </h6>
            <h4>{fileNameWithoutExtension?.replace(/-/g, ' ')}</h4>
            <h2>${+currentProduct?.price}</h2>
            <Input
              type="number"
              ref={amountInputRef}
              input={{
                id: 'amount',
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1',
              }}
            />
            {!amountIsValid && <p>Please enter a valid amount (1 - 5).</p>}

            <Button
              className="normal addBtn"
              onClick={() => cartItemAddHandler(currentProduct)}
            >
              Add To Cart
            </Button>
            <h4>Product Details</h4>
            <span>{description()}</span>
          </div>
        </div>
      </form>
    )
  );
};

export default SingleProduct;
