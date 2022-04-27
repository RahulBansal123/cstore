/*
 *
 * Seller
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import Loading from '../../components/Common/Loading';
import NotFound from '../../components/Common/NotFound';
import SellerList from '../../components/Manager/SellerList';

class Seller extends React.PureComponent {
  componentDidMount() {
    this.props.fetchSellers();
  }

  render() {
    const { sellers, isLoading, approveSeller, rejectSeller, deleteSeller } =
      this.props;

    return (
      <div className="seller-dashboard">
        <SubPage title={'Sellers'} isMenuOpen={null} />
        {isLoading ? (
          <Loading inline />
        ) : sellers.length > 0 ? (
          <SellerList
            sellers={sellers}
            approveSeller={approveSeller}
            rejectSeller={rejectSeller}
            deleteSeller={deleteSeller}
          />
        ) : (
          <NotFound message="no sellers found." />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sellers: state.seller.sellers,
    isLoading: state.seller.isLoading,
  };
};

export default connect(mapStateToProps, actions)(Seller);
