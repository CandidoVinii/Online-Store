import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Style from '../style/Header.module.css';

export default class Header extends React.Component {
  render() {
    const { totalProducts, cartItems } = this.props;
    return (
      <div className={ Style.Header }>
        <span>Lojinha dos filhos da main</span>
        <Link to="/cart" data-testid="shopping-cart-button">
          <span className={ Style.span }>Carrinho </span>
          {cartItems.length > 0
            && <span data-testid="shopping-cart-size">{totalProducts()}</span>}
        </Link>
      </div>
    );
  }
}

Header.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape).isRequired,
  totalProducts: PropTypes.func.isRequired,
};
