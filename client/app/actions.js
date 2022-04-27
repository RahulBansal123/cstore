import { bindActionCreators } from 'redux';

import * as authenticationAction from './containers/Authentication/actions';
import * as signupAction from './containers/Signup/actions';
import * as loginAction from './containers/Login/actions';
import * as navigationAction from './containers/Navigation/actions';
import * as cartAction from './containers/Cart/actions';
import * as dashboardAction from './containers/Dashboard/actions';
import * as accountAction from './containers/Account/actions';
import * as addressAction from './containers/Address/actions';
import * as usersAction from './containers/Users/actions';
import * as productAction from './containers/Product/actions';
import * as categoryAction from './containers/Category/actions';
import * as brandAction from './containers/Brand/actions';
import * as menuAction from './containers/NavigationMenu/actions';
import * as shopAction from './containers/Shop/actions';
import * as sellerAction from './containers/Seller/actions';
import * as orderAction from './containers/Order/actions';
import * as reviewAction from './containers/Review/actions';

export default function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...authenticationAction,
      ...signupAction,
      ...loginAction,
      ...navigationAction,
      ...cartAction,
      ...dashboardAction,
      ...accountAction,
      ...addressAction,
      ...usersAction,
      ...productAction,
      ...categoryAction,
      ...brandAction,
      ...menuAction,
      ...shopAction,
      ...sellerAction,
      ...orderAction,
      ...reviewAction,
    },
    dispatch
  );
}
