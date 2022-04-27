/**
 *
 * AuthSuccess
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import actions from '../../actions';
import setToken from '../../utils/token';
import Loading from '../../components/Common/Loading';

class AuthSuccess extends React.PureComponent {
  componentDidMount() {
    const token = localStorage.getItem('token');
    setToken(token);
  }

  render() {
    const { authenticated } = this.props;

    if (authenticated) return <Redirect to="/dashboard" />;

    return <Loading />;
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authentication.authenticated,
  };
};

export default connect(mapStateToProps, actions)(AuthSuccess);
