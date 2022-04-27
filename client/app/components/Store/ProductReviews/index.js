import React from 'react';
import { Row, Col } from 'reactstrap';

import AddReview from './Add';
import ReviewList from './List';
import ReviewSummary from './Summary';

const ProductReviews = (props) => {
  return (
    <div className="mt-md-4 product-reviews overflow-hidden">
      <Row className="d-flex flex-column w-100 m-0">
        <Col xs="12" md="12" lg="12" className="mb-3">
          {Object.keys(props.reviewsSummary).length > 0 && (
            <ReviewSummary reviewsSummary={props.reviewsSummary} />
          )}
        </Col>
        <Col xs="12" md="12" lg="12" className="mb-3">
          {props.reviews.length > 0 && <ReviewList reviews={props.reviews} />}
          <AddReview
            reviewFormData={props.reviewFormData}
            reviewChange={props.reviewChange}
            reviewFormErrors={props.reviewFormErrors}
            addReview={props.addReview}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProductReviews;
