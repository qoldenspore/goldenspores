import React from 'react'
import './Cart.css'
import CartItem from './CartItem';
import CartContext from '../../Context/cart-context';
import { useContext } from 'react';
import Button from '../UI/Button';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);

    const hasItems = cartCtx.items.length > 0;

const existingCart = cartCtx.items;
    const handleRemoveItem = (id) => {
      cartCtx.removeItem(id);
    };

    const handleAddItem = (item) => {
      cartCtx.additem({ ...item, amount: 1 });
  };
  const checkoutHandler = () => {
    navigate('/checkout');
  }

  console.log(existingCart)
  return (
    <>
      <section id="cart" className="section-p1">
        <table width="100%">
          <thead>
            <tr>
              <td>Remove</td>
              <td>Image</td>
              <td>Product</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Subtotal</td>
            </tr>
          </thead>
          <tbody>
            {existingCart.map((item) => {
              console.log(item);
              return (
                <CartItem
                  id={item.id}
                  key={item.id}
                  name={item.name}
                  amount={item.amount}
                  image={item.image}
                  price={item.price}
                  onRemove={handleRemoveItem}
                  onAdd={handleAddItem}
                />
              );
            })}
          </tbody>
        </table>
        {hasItems === false ? <p className="hasItems">No Item Added</p> : ''}
      </section>
      <section id="cart-add" className="section-p1">
        <div id="coupon">
          <h3>Apply Coupon</h3>
          <div>
            <input type="text" placeholder="Enter Your Coupon" />
            <Button className="normal">Apply</Button>
          </div>
        </div>
        <div id="subtotal">
          <h3>Cart Totals</h3>
          <table>
            <tr>
              <td>Cart Subtotals</td>
              <td>${cartCtx.totalAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>Free</td>
            </tr>
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>${cartCtx.totalAmount.toFixed(2)}</strong>
              </td>
            </tr>
          </table>
          <Link to="/checkout">
            <button className="button normal" disabled={existingCart.length === 0}>
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Cart