import React from 'react';
import './CartItem.css';
import CartContext from '../../Context/cart-context';
import { useContext } from 'react';

const CartItem = (props) => {
  /*
  const cartCtx = useContext(CartContext);

  const subTotal = (props.price * props.amount).toFixed(2);
  // Assuming you have a function to remove items from the cart
  const removeFromCart = (itemId) => {
    // Retrieve existing cart items from localStorage
    // Other logic for updating state or UI
  };

  const cartItemRemoveHandler = (id) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    const updatedCart = existingCart.filter((item) => item.id !== id);
    const storedTotalAmount =
      JSON.parse(localStorage.getItem('totalAmount')) || 0;
    const updateTotalAmount = storedTotalAmount - cartCtx.totalAmount;

    localStorage.setItem('cart', JSON.stringify(updatedCart));

    const chkAmount = localStorage.getItem('cart');
    console.log(chkAmount);
  };
  const chkAmount = JSON.parse(localStorage.getItem('cart'));
  console.log(chkAmount);
  if (chkAmount.length > 0) {
    chkAmount.forEach((el) => {
      if (el.id) console.log(el);
    });
  }
  */
  const cartCtx = useContext(CartContext);

  const subTotal = (props.price * props.amount).toFixed(2);

  const cartItemRemoveHandler = () => {
    cartCtx.removeItem(props.id);
  };

  const cartItemAddHandler = () => {
    cartCtx.addItem({ ...props, amount: 1 });
    console.log(cartCtx.items);

  };
    const cartItemDecrementHandler = () => {
      cartCtx.decrementItem(props.id);
    };


  return (
    <tr>
      <td>
        <div className="change">
          <button onClick={cartItemRemoveHandler}>
            <i class="fas fa-trash-alt"></i>
          </button>
          <button onClick={cartItemDecrementHandler}>-</button>
          <button onClick={cartItemAddHandler}>+</button>
        </div>
      </td>
      <td>
        <img src={props.image} alt="" />
      </td>
      <td>{props.name}</td>
      <td>${props.price}</td>
      <td>
        {/* <input type="number"  /> */}
        {props.amount}
      </td>
      <td>${subTotal}</td>
    </tr>
  );
};

export default CartItem;