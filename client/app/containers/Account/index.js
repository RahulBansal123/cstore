import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import AccountDetails from '../../components/Manager/AccountDetails';
import SubPage from '../../components/Manager/SubPage';

class Account extends React.PureComponent {
  render() {
    const { user, updateAccount, updateProfile } = this.props;

    return (
      <div className="account">
        <SubPage title={'Account Details'} isMenuOpen={null}>
          <AccountDetails
            user={user}
            updateAccount={updateAccount}
            updateProfile={updateProfile}
          />
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.account.user,
  };
};

export default connect(mapStateToProps, actions)(Account);
