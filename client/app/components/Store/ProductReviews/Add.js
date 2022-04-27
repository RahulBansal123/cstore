import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';

const Add = (props) => {
  const { reviewFormData, reviewChange, reviewFormErrors, addReview } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    addReview();
  };

  return (
    <div
      className="bg-white p-4 box-shadow-primary add-review"
      style={{ borderRadius: '12px' }}
    >
      <form onSubmit={handleSubmit} noValidate>
        <h2 className="mb-3">Add Review</h2>
        <Row>
          <Col xs="12" md="12">
            <Input
              type={'text'}
              error={reviewFormErrors['title']}
              label={'Title'}
              name={'title'}
              placeholder={'Enter Review title'}
              value={reviewFormData.title}
              onInputChange={(name, value) => {
                reviewChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              type={'stars'}
              error={reviewFormErrors['rating']}
              label={'Rating'}
              name={'rating'}
              value={reviewFormData.rating}
              onInputChange={(name, value) => {
                reviewChange(name, value);
              }}
            />
          </Col>
        </Row>
        <div className="mt-4">
          <Button type="submit" text="Publish Review" />
        </div>
      </form>
    </div>
  );
};

export default Add;
