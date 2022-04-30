import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as notifications } from 'react-notification-system-redux';
import signup from './containers/Signup/reducer';
import login from './containers/Login/reducer';
import navigation from './containers/Navigation/reducer';
import authentication from './containers/Authentication/reducer';
import cart from './containers/Cart/reducer';
import account from './containers/Account/reducer';
import address from './containers/Address/reducer';
import users from './containers/Users/reducer';
import product from './containers/Product/reducer';
import brand from './containers/Brand/reducer';
import seller from './containers/Seller/reducer';
import order from './containers/Order/reducer';
import review from './containers/Review/reducer';

const createReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    notifications,
    signup,
    login,
    navigation,
    authentication,
    cart,
    account,
    address,
    users,
    product,
    brand,
    seller,
    order,
    review,
  });

export default createReducer;
