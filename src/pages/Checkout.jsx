import React from 'react';
import PropTypes from 'prop-types';

export default class Checkout extends React.Component {
  render() {
    const { cartItems, totalPayable } = this.props;
    return (
      <div>
        <div>
          <h3>Revise seus Produtos!</h3>
          <ol>
            { cartItems.map((item) => {
              const { product, id, quantity } = item;
              const { title, thumbnail, price } = product;
              return (
                <li key={ id }>
                  <img src={ thumbnail } alt={ title } />
                  <h3>
                    quantidade:
                    {' '}
                    {quantity}
                  </h3>
                  <p>{title}</p>
                  <p>
                    R$
                    {' '}
                    {price}
                  </p>
                </li>
              );
            })}
          </ol>
          <p>
            Total:
            {' '}
            R$
            {totalPayable}
          </p>
        </div>
        <div>
          <h3>Informações do Comprador</h3>
          <form action="">
            <input
              type="text"
              placeholder="Nome completo"
              data-testid="checkout-fullname"
            />
            <input type="email" placeholder="Email" data-testid="checkout-email" />
            <input type="text" placeholder="CPF" data-testid="checkout-cpf" />
            <input type="tel" placeholder="Telefone" data-testid="checkout-phone" />
            <input type="text" placeholder="CEP" data-testid="checkout-cep" />
            <input type="text" placeholder="Endereço" data-testid="checkout-address" />
          </form>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape).isRequired,
  totalPayable: PropTypes.number.isRequired,
};
