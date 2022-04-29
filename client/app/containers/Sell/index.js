/*
 *
 * Sell
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import Loading from '../../components/Common/Loading';

class Sell extends React.PureComponent {
  render() {
    const {
      sellFormData,
      formErrors,
      sellFormChange,
      sellWithUs,
      isSubmitting,
      isLoading,
    } = this.props;

    const handleSubmit = (event) => {
      event.preventDefault();
      sellWithUs();
    };

    return (
      <div className="sell">
        {isLoading && <Loading />}
        <h2>Become A CStore Seller!</h2>
        <hr />
        <Row>
          <Col xs="12" md="6" className="order-2 order-md-1">
            <form onSubmit={handleSubmit}>
              <Row>
                <Col xs="12">
                  <Input
                    type={'text'}
                    error={formErrors['name']}
                    label={'Name'}
                    name={'name'}
                    placeholder={'You Full Name'}
                    value={sellFormData.name}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs="12">
                  <Input
                    type={'text'}
                    error={formErrors['email']}
                    label={'Email Address'}
                    name={'email'}
                    placeholder={'Your Email Address'}
                    value={sellFormData.email}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs="12">
                  <Input
                    type={'text'}
                    error={formErrors['password']}
                    label={'Password'}
                    name={'email'}
                    placeholder={'Password'}
                    value={sellFormData.password}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs="12">
                  <Input
                    type={'text'}
                    error={formErrors['phone']}
                    label={'Phone Number'}
                    name={'phone'}
                    placeholder={'Your Phone Number'}
                    value={sellFormData.phone}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs="12">
                  <Input
                    type={'text'}
                    error={formErrors['brand']}
                    label={'Brand'}
                    name={'brand'}
                    placeholder={'Your Business Brand'}
                    value={sellFormData.brand}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs="12">
                  <Input
                    type={'textarea'}
                    error={formErrors['business']}
                    label={'Business'}
                    name={'business'}
                    placeholder={'Please Describe Your Business'}
                    value={sellFormData.business}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
              </Row>
              <hr />
              <div className="sell-actions">
                <Button type="submit" text="Submit" disabled={isSubmitting} />
              </div>
            </form>
          </Col>
          <Col xs="12" md="6" className="order-1 order-md-2">
            <Row>
              <Col xs="12" className="order-2 order-md-1 text-md-center mb-3">
                <div className="agreement-banner-text">
                  <h3>Would you like to sell your products on CStore!</h3>
                  <h4>Grow your business with CStore</h4>
                  <b>Apply Today</b>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sellFormData: state.seller.sellFormData,
    formErrors: state.seller.formErrors,
    isSubmitting: state.seller.isSellSubmitting,
    isLoading: state.seller.isSellLoading,
  };
};

export default connect(mapStateToProps, actions)(Sell);
