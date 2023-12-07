import { useReducer, useEffect } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id,
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    localStorage.setItem('cart', JSON.stringify(updatedItems));
    localStorage.setItem('totalAmount', JSON.stringify(updatedTotalAmount));

    return {
      ...state,
      items: updatedItems,
      totalAmount: calculateTotalAmount(updatedItems),
    };
  }
  if (action.type === 'REMOVE') {
    const updatedItemsRemove = state.items.filter(
      (item) => item.id !== action.id,
    );

    // Save to local storage
    localStorage.setItem('cart', JSON.stringify(updatedItemsRemove));
    localStorage.setItem(
      'totalAmount',
      JSON.stringify(calculateTotalAmount(updatedItemsRemove)),
    );

    return {
      items: updatedItemsRemove,
      totalAmount: calculateTotalAmount(updatedItemsRemove),
    };
  }

  if (action.type === 'DECREMENT') {
    const updatedItemsDecrement = state.items.map((item) => {
      if (item.id === action.id) {
        return {
          ...item,
          amount: item.amount - 1,
        };
      }
      return item;
    });

    const filteredItems = updatedItemsDecrement.filter(
      (item) => item.amount > 0,
    );

    localStorage.setItem('cart', JSON.stringify(filteredItems));
    localStorage.setItem(
      'totalAmount',
      JSON.stringify(calculateTotalAmount(filteredItems)),
    );

    return {
      items: filteredItems,
      totalAmount: calculateTotalAmount(filteredItems),
    };
  }

  return defaultCartState;
};

const calculateTotalAmount = (items) => {
  console.log(items);
  return items.reduce(
    (total, item) => total + item.price * item.amount,
    0,
  );
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState,
  );

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedTotalAmount =
      JSON.parse(localStorage.getItem('totalAmount')) || 0;

    dispatchCartAction({
      type: 'ADD',
      item: existingCart,
      totalAmount: storedTotalAmount,
    });
  }, []);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id, amount) => {
    if (amount > 1) {
      dispatchCartAction({ type: 'DECREMENT', id: id });
    } else {
      dispatchCartAction({ type: 'REMOVE', id: id });
    }
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    decrementItem: (id) => dispatchCartAction({ type: 'DECREMENT', id: id }),
  };


  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
