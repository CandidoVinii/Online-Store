/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MinusCircle, PlusCircle, Rewind } from 'phosphor-react';

export default class ShoppingCart extends React.Component {
  renderItemsShoppingCart = () => {
    const { cartItems, modifyQuantity, onRemove } = this.props;
    if (cartItems.length < 1) {
      return (
        <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
      );
    }
    return cartItems.map((cartItem, index) => {
      const { id, product, quantity } = cartItem;
      const { title, thumbnail } = product;
      return (
        <div
          className="bg-white border-zinc-600 rounded hover:bg-zinc-100 transition-all text-zinc-900 border text-center justify-center flex-col w-60 h-72"
          key={ index }
        >
          <img className="pt-6 w-48 pl-12" src={ thumbnail } alt={ `imagem do produto ${title}` } />
          <button type="button" value={ id } onClick={ onRemove }>X</button>
          <h3 className="truncate" data-testid="shopping-cart-product-name">{title}</h3>
          <div className="flex justify-center mt-5 ">
            <button
              type="button"
              className="mr-2"
              data-testid="product-decrease-quantity"
              name="decrease-quantity"
              onClick={ modifyQuantity }
              value={ id }
            >
              <MinusCircle size={ 24 } color="#151414" weight="bold" />
            </button>
            <p data-testid="shopping-cart-product-quantity">
              {quantity}
            </p>
            <button
              type="button"
              data-testid="product-increase-quantity"
              className="ml-2"
              name="increase-quantity"
              onClick={ modifyQuantity }
              value={ id }
              disabled={ !cartItem.stockAvailable }
            >
              <PlusCircle size={ 24 } color="#151414" weight="bold" />
            </button>
          </div>
        </div>
      );
    });
  };

  onRenderTotalPayable = () => {
    const { totalPayable } = this.props;
    return (
      <div className="flex justify-between items-center pt-2">
        <p>{ `Valor Total da Compra:  R$ ${Number(totalPayable).toFixed(2)}` }</p>
        <Link to="/checkout">
          <button
            type="button"
            className="bg-[#17BEBB] rounded text-zinc-900 p-1 mr-2 hover:bg-[#37E6E3] transition-all"
            data-testid="checkout-products"
          >
            Finalizar Compra
          </button>
        </Link>
      </div>
    );
  }

  render() {
    const { cartItems } = this.props;
    return (
      <>
        <div className="border-2 h-14 flex justify-between items-center bg-[#E4572E] ">
          <Link exact to="/"><Rewind size={ 24 } color="#151414" weight="bold" /></Link>
          <h2>Carrinho</h2>
        </div>
        <div className="mt-14 grid grid-cols-3 p-12 pl-40 bg-zinc-300 rounded">
          {this.renderItemsShoppingCart()}
        </div>
        <div className="mt-6 border-2 h-12">
          {cartItems.length > 0 && this.onRenderTotalPayable()}
        </div>
      </>
    );
  }
}

ShoppingCart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape).isRequired,
  modifyQuantity: PropTypes.func.isRequired,
  totalPayable: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
};
