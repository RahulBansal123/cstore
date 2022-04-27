import React from 'react';

import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const BrandList = (props) => {
  const { brands } = props;

  return (
    <div className="brand-list">
      <h1>Top Brands in the collection</h1>
      <h3 className="text-muted">
        Shop with the exclusive brands out in the town!
      </h3>
      <Row className="flex-sm-row mt-4">
        {brands.map((brand, index) => (
          <Col xs="8" md="4" lg="3" key={index} className="mb-3 px-2">
            <Link
              to={`/shop/brand/${brand.slug}`}
              className="d-block brand-box p-5"
              style={{ borderRadius: '12px' }}
            >
              <h3>{brand.name}</h3>
              <p className="brand-desc">{brand.description}</p>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BrandList;
