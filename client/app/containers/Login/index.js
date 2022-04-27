/*
 *
 * Login
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class Login extends React.PureComponent {
  render() {
    const {
      authenticated,
      loginFormData,
      loginChange,
      login,
      formErrors,
      isLoading,
      isSubmitting,
    } = this.props;

    if (authenticated) return <Redirect to="/dashboard" />;

    const registerLink = () => {
      this.props.history.push('/register');
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      login();
    };

    return (
      <div className="login-form">
        {isLoading && <LoadingIndicator />}
        <form onSubmit={handleSubmit} noValidate>
          <Row>
            <Col
              xs={{ size: 12, order: 2 }}
              md={{ size: '6', order: 1 }}
              className="px-0 mx-auto py-5"
            >
              <h1 className="text-center mb-5">Welcome back shopper!</h1>
              <Col xs="12" md="12">
                <Input
                  type={'text'}
                  error={formErrors['email']}
                  label={'Email Address'}
                  name={'email'}
                  placeholder={'Enter Your Email'}
                  value={loginFormData.email}
                  onInputChange={(name, value) => {
                    loginChange(name, value);
                  }}
                />
              </Col>
              <Col xs="12" md="12" className="mt-4">
                <Input
                  type={'password'}
                  error={formErrors['password']}
                  label={'Password'}
                  name={'password'}
                  placeholder={'Enter Your Password'}
                  value={loginFormData.password}
                  onInputChange={(name, value) => {
                    loginChange(name, value);
                  }}
                />
              </Col>
            </Col>
          </Row>
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3 mb-md-0 mx-auto">
              <Button
                type="submit"
                variant="primary"
                text="Login"
                disabled={isSubmitting}
              />
              <Button
                text="Create an account"
                variant="link"
                className="ml-md-3"
                onClick={registerLink}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authentication.authenticated,
    loginFormData: state.login.loginFormData,
    formErrors: state.login.formErrors,
    isLoading: state.login.isLoading,
    isSubmitting: state.login.isSubmitting,
  };
};

export default connect(mapStateToProps, actions)(Login);
