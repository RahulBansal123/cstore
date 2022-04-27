/**
 *
 * CategoryShop
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import ProductList from '../../components/Store/ProductList';
import NotFound from '../../components/Common/NotFound';
import Loading from '../../components/Common/Loading';

class CategoryShop extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.filterProducts('category', slug);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.filterProducts('category', slug);
    }
  }

  render() {
    const { products, isLoading, authenticated } = this.props;

    return (
      <div className="category-shop">
        {isLoading && <Loading />}
        {products && products.length > 0 && (
          <ProductList products={products} authenticated={authenticated} />
        )}
        {!isLoading && products && products.length <= 0 && (
          <NotFound message="no products found." />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product.storeProducts,
    isLoading: state.product.isLoading,
    authenticated: state.authentication.authenticated,
  };
};

export default connect(mapStateToProps, actions)(CategoryShop);
