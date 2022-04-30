import { bindActionCreators } from 'redux';

import * as account from './containers/Account/actions';
import * as seller from './containers/Seller/actions';
import * as authentication from './containers/Authentication/actions';
import * as signup from './containers/Signup/actions';
import * as cart from './containers/Cart/actions';
import * as navigation from './containers/Navigation/actions';
import * as brand from './containers/Brand/actions';
import * as review from './containers/Review/actions';
import * as address from './containers/Address/actions';
import * as product from './containers/Product/actions';
import * as login from './containers/Login/actions';
import * as users from './containers/Users/actions';
import * as order from './containers/Order/actions';

export default function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...login,
      ...signup,
      ...authentication,
      ...account,
      ...cart,
      ...seller,
      ...navigation,
      ...address,
      ...review,
      ...brand,
      ...product,
      ...order,
      ...users,
    },
    dispatch
  );
}
