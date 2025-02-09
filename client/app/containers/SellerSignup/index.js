/*
 *
 * SellerSignup
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';
import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';

class SellerSignup extends React.PureComponent {
  componentDidMount() {
    const email = this.props.location.search.split('=')[1];
    this.props.sellerSignupChange('email', email);
  }

  render() {
    const { signupFormData, formErrors, sellerSignupChange, sellerSignUp } =
      this.props;

    const handleSubmit = (event) => {
      const token = this.props.match.params.token;
      event.preventDefault();

      sellerSignUp(token);
    };

    return (
      <div className="seller-signup-form">
        <form onSubmit={handleSubmit} noValidate>
          <Row>
            <Col xs={{ size: 12 }} md={{ size: 6, offset: 3 }} className="p-0">
              <Col xs="12" md="12">
                <h2 className="text-center">Complete Sign Up</h2>
                <hr />
              </Col>

              <Col xs="12" md="12">
                <Input
                  type={'text'}
                  error={formErrors['email']}
                  label={'Email Address'}
                  name={'email'}
                  placeholder={'Please Enter Your Email'}
                  value={signupFormData.email}
                  onInputChange={(name, value) => {
                    sellerSignupChange(name, value);
                  }}
                />
              </Col>
              <Col xs="12" md="12">
                <Input
                  type={'text'}
                  error={formErrors['name']}
                  label={'First Name'}
                  name={'name'}
                  placeholder={'Please Enter Your First Name'}
                  value={signupFormData.name}
                  onInputChange={(name, value) => {
                    sellerSignupChange(name, value);
                  }}
                />
              </Col>
              <Col xs="12" md="12">
                <Input
                  type={'password'}
                  label={'Password'}
                  error={formErrors['password']}
                  name={'password'}
                  placeholder={'Please Enter Your Password'}
                  value={signupFormData.password}
                  onInputChange={(name, value) => {
                    sellerSignupChange(name, value);
                  }}
                />
              </Col>
              <Col xs="12" md="12">
                <Button
                  className="mt-3"
                  type="submit"
                  variant="primary"
                  text="Get Started"
                />
              </Col>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signupFormData: state.seller.signupFormData,
    formErrors: state.seller.signupFormErrors,
  };
};

export default connect(mapStateToProps, actions)(SellerSignup);
