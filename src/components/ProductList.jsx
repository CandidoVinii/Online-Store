import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductList extends React.Component {
  render() {
    const { produts, onClick } = this.props;
    return (
      <div className="left-60 absolute grid gap-2 grid-cols-4 mt-8">
        {
          produts.map((product, index) => {
            console.log(product);
            const { id, title, thumbnail, price } = product;
            return (
              <div
                // eslint-disable-next-line max-len
                className="rounded border border-zinc-700 text-zinc-900 bg-white text-center justify-center flex-col w-60 h-72"
                data-testid="product"
                key={ id }
              >
                <Link
                  style={ { textDecoration: 'none' } }
                  data-testid="product-detail-link"
                  to={ `/product/${id}` }
                >
                  <img
                    src={ thumbnail }
                    className="pt-6 w-40 pl-20"
                    alt={ `imagem do produto ${title}` }
                  />
                  <h3 className="truncate pt-5">{title}</h3>
                  {
                    product.shipping.free_shipping ? (
                      <p
                        data-testid="free-shipping"
                        className="text-blue-900"
                      >
                        Frete Grátis
                      </p>
                    ) : (<p className="text-red-800">Frete Pago</p>)
                  }
                  <div className="mt-6 w-fit ml-[85px] rounded-md bg-[#76B041]">
                    <p>{`R$ ${Number(price).toFixed(2)}`}</p>
                  </div>
                </Link>
                <div className="">
                  <button
                    type="button"
                    data-testid="product-add-to-cart"
                    className="mt-7 bg-[#17BEBB] h-10 w-full"
                    onClick={ onClick }
                    id={ index }
                    name={ id }
                  >
                    Adicionar ao carrinho!
                  </button>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

ProductList.propTypes = {
  produts: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onClick: PropTypes.func.isRequired,
};
