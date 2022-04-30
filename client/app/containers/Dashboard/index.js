/**
 *
 * Dashboard
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import Admin from '../../components/Manager/Dashboard/Admin';
import Seller from '../../components/Manager/Dashboard/Seller';
import Customer from '../../components/Manager/Dashboard/Customer';

import Loading from '../../components/Common/Loading';

import dashboardLinks from './links.json';

class Dashboard extends React.PureComponent {
  componentDidMount() {
    this.props.fetchProfile();
  }

  render() {
    const { user, isLoading, isMenuOpen, toggleDashboardMenu } = this.props;
    console.log('user', user);
    return (
      <>
        {isLoading ? (
          <Loading inline />
        ) : user.role === 'ADMIN' ? (
          <Admin
            isMenuOpen={isMenuOpen}
            links={dashboardLinks['ADMIN']}
            toggleMenu={toggleDashboardMenu}
          />
        ) : user.role === 'SELLER' && user.seller ? (
          <Seller
            isMenuOpen={isMenuOpen}
            links={dashboardLinks['SELLER']}
            toggleMenu={toggleDashboardMenu}
          />
        ) : (
          <Customer
            isMenuOpen={isMenuOpen}
            links={dashboardLinks['MEMBER']}
            toggleMenu={toggleDashboardMenu}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.account.user,
    isLoading: state.account.isLoading,
    isMenuOpen: state.dashboard.isMenuOpen,
  };
};

export default connect(mapStateToProps, actions)(Dashboard);
