/**
 *
 * BrandList
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const BrandList = (props) => {
  const { brands } = props;

  return (
    <div className="brand-list">
      <h2>Top Brands in the collection</h2>
      <Row className="flex-sm-row mt-4">
        {brands.map((brand, index) => (
          <Col xs="8" md="4" lg="3" key={index} className="mb-3 px-2">
            <Link
              to={`/shop/brand/${brand.slug}`}
              className="d-block brand-box p-5"
            >
              <h4>{brand.name}</h4>
              <p className="brand-desc">{brand.description}</p>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BrandList;
