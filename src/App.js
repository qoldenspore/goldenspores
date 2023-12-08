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
import Login from './Login';
import SignUp from './SignUp';
import Cart from './Components/Cart/Cart';
import CartProvider from './Context/CartContextProvider';
import SignInProvider from './Context/SignInProvider';
import SignInContext from './Context/signin-context';
import Checkout from './Pages/Checkout';
import ConfirmPay from './Pages/ConfirmPay';

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
    <SignInProvider>
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
            </Routes>
          </div>
        </CartProvider>
        <Routes>
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ProductContextProvider>
    </SignInProvider>
  );
}

export default App;
