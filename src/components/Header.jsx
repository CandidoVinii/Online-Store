/* eslint-disable max-len */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';

export default class Header extends React.Component {
  render() {
    const { totalProducts, cartItems } = this.props;
    return (

      <div className="border-2 h-14 flex justify-between items-center bg-[#E4572E] ">
        <h1 className="text-center left-7">Online Store</h1>
        <Link to="/cart" data-testid="shopping-cart-button">
          <span><ShoppingCart className="z-0 mr-6" size={ 22 } color="#151414" /></span>
          {cartItems.length > 0
            && <span
              className="w-6 h-6 text-center z-10 absolute -top-[0.1px] right-4 bg-[#FFC914] rounded-full"
              data-testid="shopping-cart-size"
            >
              {totalProducts()}
            </span>}
        </Link>
      </div>
    );
  }
}

Header.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape).isRequired,
  totalProducts: PropTypes.func.isRequired,
};
