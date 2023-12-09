import React from 'react';
import './CartItem.css';
import CartContext from '../../Context/cart-context';
import { useContext } from 'react';

const CartItem = (props) => {
  const cartCtx = useContext(CartContext);

  const subTotal = (props.price * props.amount).toFixed(2);

  const cartItemRemoveHandler = () => {
    cartCtx.removeItem(props.id);
  };

  const cartItemAddHandler = () => {
    cartCtx.addItem({ ...props, amount: 1 });

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