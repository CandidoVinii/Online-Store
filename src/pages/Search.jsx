import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Componentes
import { MagnifyingGlass } from 'phosphor-react';
import ProductList from '../components/ProductList';
import Header from '../components/Header';

// funções
import * as api from '../services/api';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      category: '',
      productSearch: [],
    };
  }

  onFetchProducts = async () => {
    const { value, category } = this.state;
    const search = await api.getProductsFromCategoryAndQuery(category, value);
    return search;
  }

  onSearchProduct = async () => {
    const { productList } = this.props;
    const search = await this.onFetchProducts();
    const { results } = search;
    productList(results);
    this.setState({
      productSearch: results,
    });
  }

  onChangeHandle = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, async () => {
      if (name === 'category') {
        this.onSearchProduct();
      }
    });
  }

  onClickButton = async () => {
    this.onSearchProduct();
  }

  onDrawComponents = () => {
    const { productSearch } = this.state;
    const { addItem } = this.props;
    if (productSearch.length <= 0) {
      return (
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      );
    }
    return <ProductList produts={ productSearch } onClick={ addItem } />;
  }

  render() {
    const { value } = this.state;
    const { categories, totalProducts, cartItems } = this.props;
    return (
      <main>
        <Link to="/cart" />
        <Header
          cartItems={ cartItems }
          totalProducts={ totalProducts }
        />
        <div className="mt-4 rounded overflow-hidden flex justify-center">
          <input
            data-testid="query-input"
            className="border border-gray-300 shadow p-1 w-80 rounded mb-"
            type="text"
            placeholder="Pesquisar..."
            name="value"
            value={ value }
            onChange={ this.onChangeHandle }
          />
          <button
            className="flex items-center justify-center px-4"
            data-testid="query-button"
            type="button"
            onClick={ this.onClickButton }
          >
            <MagnifyingGlass
              className=""
              size={ 24 }
              color="#fafafa"
              weight="bold"
            />
          </button>
        </div>
        <div className="flex justify-center">
          { this.onDrawComponents() }
        </div>
        <div>
          <section className="flex-col bg-[#FFC914] mt-8 w-fit">
            {categories.map((element) => (
              <>
                <label htmlFor={ element.id } data-testid="category" key={ element.id }>
                  <button
                    type="button"
                    // eslint-disable-next-line max-len
                    className="border-[0.1px] text-zinc-900 text-left h-8 w-full hover:bg-[#fddc63] transition-all border-black"
                    id={ element.id }
                    name="category"
                    value={ element.id }
                    onClick={ this.onChangeHandle }
                  >
                    {element.name}
                  </button>
                </label>
                <br />
              </>
            ))}
          </section>
        </div>
      </main>
    );
  }
}

Search.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape).isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.shape).isRequired,
  addItem: PropTypes.func.isRequired,
  productList: PropTypes.func.isRequired,
  totalProducts: PropTypes.func.isRequired,
};
