/**
 *
 * CartIcon
 *
 */

import React from 'react';

import Button from '../Button';

const CartIcon = (props) => {
  const { className, onClick, cartItems } = props;

  const Icon = (
    <span className="cart-icon" style={{ marginTop: '-17px' }}>
      <span style={{ color: '#65676b' }}>Cart</span>
    </span>
  );

  const items = cartItems.length;

  return (
    <Button
      borderless
      variant="empty"
      className={className}
      ariaLabel={
        items > 0 ? `your cart have ${items} items` : 'your cart is empty'
      }
      icon={Icon}
      onClick={onClick}
    />
  );
};

export default CartIcon;
