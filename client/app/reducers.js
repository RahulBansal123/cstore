import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as notifications } from 'react-notification-system-redux';
import signup from './containers/Signup/reducer';
import login from './containers/Login/reducer';
import navigation from './containers/Navigation/reducer';
import authentication from './containers/Authentication/reducer';
import cart from './containers/Cart/reducer';
import dashboard from './containers/Dashboard/reducer';
import account from './containers/Account/reducer';
import address from './containers/Address/reducer';
import users from './containers/Users/reducer';
import product from './containers/Product/reducer';
import category from './containers/Category/reducer';
import brand from './containers/Brand/reducer';
import menu from './containers/NavigationMenu/reducer';
import shop from './containers/Shop/reducer';
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
    dashboard,
    account,
    address,
    users,
    product,
    category,
    brand,
    menu: menu,
    shop,
    seller,
    order,
    review,
  });

export default createReducer;
