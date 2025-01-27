/*
 *
 * Signup
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';

import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import Loading from '../../components/Common/Loading';

class Signup extends React.PureComponent {
  render() {
    const {
      authenticated,
      signupFormData,
      formErrors,
      isLoading,
      isSubmitting,
      signupChange,
      signUp,
      subscribeChange,
    } = this.props;

    if (authenticated) return <Redirect to="/dashboard" />;

    const handleSubmit = (event) => {
      event.preventDefault();
      signUp();
    };

    return (
      <div className="signup-form">
        {isLoading && <Loading />}
        <h1 className="text-center">Sign Up! and don't miss the FOMO</h1>
        <form onSubmit={handleSubmit} noValidate>
          <Row>
            <Col
              xs={{ size: 12, order: 2 }}
              md={{ size: '6', order: 1 }}
              className="p-0 mx-auto py-4"
            >
              <Col xs="12" md="12">
                <Input
                  type={'text'}
                  error={formErrors['name']}
                  label={'First Name'}
                  name={'name'}
                  placeholder={'Please Enter Your First Name'}
                  value={signupFormData.name}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
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
                    signupChange(name, value);
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
                    signupChange(name, value);
                  }}
                />
              </Col>
            </Col>
          </Row>
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-center mt-3">
            <Button
              type="submit"
              variant="primary"
              text="Sign Up"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authentication.authenticated,
    signupFormData: state.signup.signupFormData,
    formErrors: state.signup.formErrors,
    isLoading: state.signup.isLoading,
    isSubmitting: state.signup.isSubmitting,
  };
};

export default connect(mapStateToProps, actions)(Signup);
