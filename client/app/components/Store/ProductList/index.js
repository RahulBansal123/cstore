import React from 'react';

import { Link } from 'react-router-dom';

const ProductList = (props) => {
  const { products } = props;

  return (
    <div className="product-list">
      {products.map((product, index) => (
        <div key={index} className="mb-3 mb-md-0">
          <div
            className="product-container overflow-hidden"
            style={{ borderRadius: '12px' }}
          >
            <div className="item-box">
              <div className="item-link">
                <Link
                  to={`/product/${product.slug}`}
                  className="d-flex flex-column h-100"
                >
                  <div className="item-image-container">
                    <div className="item-image-box">
                      <img
                        className="item-image"
                        src={`${
                          product.image
                            ? product.image
                            : '/images/placeholder.png'
                        }`}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                  <div className="item-body">
                    <div className="item-details p-3">
                      <div className="d-flex align-items-baseline justify-content-between">
                        <h1 className="item-name text-black">{product.name}</h1>
                        <p
                          className="price mb-0 text-right"
                          style={{ color: 'blue' }}
                        >
                          ${product.price}
                        </p>
                      </div>
                      <p className="item-desc mb-0">{product.description}</p>
                    </div>
                  </div>
                  <div className="d-flex flex-row justify-content-end align-items-center px-4 mb-2 item-footer text-right">
                    {product.totalReviews > 0 && (
                      <p className="mb-0">
                        <span className="fs-16 fw-1 mr-1">
                          {parseFloat(product?.averageRating).toFixed(1)}
                        </span>
                        <span
                          className={`fa fa-star ${
                            product.totalReviews !== 0 ? 'checked' : ''
                          }`}
                          style={{ color: '#ffb302' }}
                        ></span>
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
