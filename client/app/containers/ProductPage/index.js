import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import Loading from '../../components/Common/Loading';
import NotFound from '../../components/Common/NotFound';
import ProductReviews from '../../components/Store/ProductReviews';

class ProductPage extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchStoreProduct(slug);
    this.props.fetchProductReviews(slug);
    document.body.classList.add('product-page');
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.fetchStoreProduct(slug);
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('product-page');
  }

  render() {
    const {
      isLoading,
      product,
      productShopData,
      shopFormErrors,
      itemsInCart,
      productShopChange,
      handleAddToCart,
      handleRemoveFromCart,
      addProductReview,
      reviewsSummary,
      reviews,
      reviewFormData,
      reviewChange,
      reviewFormErrors,
    } = this.props;

    return (
      <div className="product-shop">
        {isLoading ? (
          <Loading />
        ) : Object.keys(product).length > 0 ? (
          <>
            <Row className="flex-row">
              <Col xs="12" md="5" lg="5" className="mb-3 px-3 px-md-2">
                <div className="position-relative">
                  <img
                    className="item-image"
                    src={`${
                      product.imageUrl
                        ? product.imageUrl
                        : '/images/placeholder.png'
                    }`}
                    style={{ borderRadius: '12px' }}
                  />
                </div>
              </Col>
              <Col xs="12" md="7" lg="7" className="mb-3 px-3 px-md-2">
                <div className="product-container">
                  <div className="item-box">
                    <div className="item-details">
                      <div className="d-flex align-items-center justify-content-between">
                        <h1 className="item-name one-line-ellipsis">
                          {product.name}
                        </h1>
                        <p className="price">${product.price}</p>
                      </div>
                      <p className="item-desc">{product.description}</p>
                    </div>
                    <div className="item-customize">
                      <Input
                        type={'number'}
                        error={shopFormErrors['quantity']}
                        label={'Quantity'}
                        name={'quantity'}
                        decimals={false}
                        min={1}
                        max={product.inventory}
                        placeholder={'Product Quantity'}
                        disabled={
                          product.inventory <= 0 && !shopFormErrors['quantity']
                        }
                        value={productShopData.quantity}
                        onInputChange={(name, value) => {
                          productShopChange(name, value);
                        }}
                      />
                    </div>
                    <div className="item-actions h-100 d-flex align-items-center justify-content-center">
                      {itemsInCart.includes(product._id) ? (
                        <Button
                          variant="primary"
                          disabled={
                            product.inventory <= 0 &&
                            !shopFormErrors['quantity']
                          }
                          text="Remove From Basket"
                          className="bag-btn"
                          onClick={() => handleRemoveFromCart(product)}
                        />
                      ) : (
                        <Button
                          variant="primary"
                          disabled={
                            product.quantity <= 0 && !shopFormErrors['quantity']
                          }
                          text="Add To Basket"
                          className="bag-btn"
                          onClick={() => handleAddToCart(product)}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <ProductReviews
                  reviewFormData={reviewFormData}
                  reviewFormErrors={reviewFormErrors}
                  reviews={reviews}
                  reviewsSummary={reviewsSummary}
                  reviewChange={reviewChange}
                  addReview={addProductReview}
                />
              </Col>
            </Row>
          </>
        ) : (
          <NotFound message="no product found." />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product.storeProduct,
    productShopData: state.product.productShopData,
    shopFormErrors: state.product.shopFormErrors,
    isLoading: state.product.isLoading,
    reviews: state.review.productReviews,
    reviewsSummary: state.review.reviewsSummary,
    reviewFormData: state.review.reviewFormData,
    reviewFormErrors: state.review.reviewFormErrors,
    itemsInCart: state.cart.itemsInCart,
  };
};

export default connect(mapStateToProps, actions)(ProductPage);
