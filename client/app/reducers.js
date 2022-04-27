/*
 *
 * reducers.js
 * reducers configuration
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as notifications } from 'react-notification-system-redux';

// import reducers
import signupReducer from './containers/Signup/reducer';
import loginReducer from './containers/Login/reducer';
import forgotPasswordReducer from './containers/ForgotPassword/reducer';
import navigationReducer from './containers/Navigation/reducer';
import authenticationReducer from './containers/Authentication/reducer';
import cartReducer from './containers/Cart/reducer';
import dashboardReducer from './containers/Dashboard/reducer';
import accountReducer from './containers/Account/reducer';
import addressReducer from './containers/Address/reducer';
import resetPasswordReducer from './containers/ResetPassword/reducer';
import usersReducer from './containers/Users/reducer';
import productReducer from './containers/Product/reducer';
import categoryReducer from './containers/Category/reducer';
import brandReducer from './containers/Brand/reducer';
import navigationMenuReducer from './containers/NavigationMenu/reducer';
import shopReducer from './containers/Shop/reducer';
import merchantReducer from './containers/Merchant/reducer';
import orderReducer from './containers/Order/reducer';
import reviewReducer from './containers/Review/reducer';

const createReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    notifications,
    signup: signupReducer,
    login: loginReducer,
    forgotPassword: forgotPasswordReducer,
    navigation: navigationReducer,
    authentication: authenticationReducer,
    cart: cartReducer,
    dashboard: dashboardReducer,
    account: accountReducer,
    address: addressReducer,
    resetPassword: resetPasswordReducer,
    users: usersReducer,
    product: productReducer,
    category: categoryReducer,
    brand: brandReducer,
    menu: navigationMenuReducer,
    shop: shopReducer,
    merchant: merchantReducer,
    order: orderReducer,
    review: reviewReducer,
  });

export default createReducer;
