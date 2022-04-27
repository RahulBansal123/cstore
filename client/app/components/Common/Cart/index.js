import React from 'react';
import Button from '../Button';

const Cart = (props) => {
  const { className, onClick } = props;

  return (
    <Button
      borderless
      variant="empty"
      className={className}
      icon={
        <span className="cart-icon" style={{ marginTop: '-17px' }}>
          <span style={{ color: '#65676b' }}>Cart</span>
        </span>
      }
      onClick={onClick}
    />
  );
};

export default Cart;
