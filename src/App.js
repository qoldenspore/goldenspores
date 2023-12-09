import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Shop from './Pages/Shop';
import ProductContextProvider from './Context/ProductContextProvider';
import SingleProduct from './Pages/SingleProduct';
import { useState, useEffect, useContext } from 'react';
import ContactUs from './Pages/ContactUs';
import Cart from './Components/Cart/Cart';
import CartProvider from './Context/CartContextProvider';
import SignInContext from './Context/signin-context';
import Checkout from './Pages/Checkout';
import ConfirmPay from './Pages/ConfirmPay';
import OrderReceive from './Pages/OrderReceive';

function App() {
  const { isLoggedIn } = useContext(SignInContext);
  const [login, setLogin] = useState(true);

  const winLocation = window.location.pathname;
  console.log(isLoggedIn);
  useEffect(() => {
    if (winLocation === '/'|| winLocation==='/sign-up') {
      setLogin(false);
    } else {
      setLogin(true);
    }
  }, [winLocation, login]);

  return (
    <ProductContextProvider>
      <CartProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/products/:id" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirm-payment" element={<ConfirmPay />} />
            <Route path="/order-received" element={<OrderReceive />} />
          </Routes>
        </div>
      </CartProvider>
    </ProductContextProvider>
  );
}

export default App;
