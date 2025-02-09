import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';

import actions from '../../actions';

import Login from '../Login';
import Signup from '../Signup';
import SellerSignup from '../SellerSignup';
import Dashboard from '../Dashboard';
import Navigation from '../Navigation';
import Authentication from '../Authentication';
import Notification from '../Notification';
import Shop from '../Shop';
import BrandsPage from '../BrandsPage';
import ProductPage from '../ProductPage';
import Sell from '../Sell';
import OrderSuccess from '../OrderSuccess';
import OrderPage from '../OrderPage';
import AuthSuccess from '../AuthSuccess';

import Footer from '../../components/Common/Footer';
import Page404 from '../../components/Common/Page404';

class Application extends React.PureComponent {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.fetchProfile();
    }

    this.props.handleCart();
  }

  render() {
    return (
      <div className="application">
        <Notification />
        <Navigation />
        <main className="main mt-5">
          <Container>
            <div className="wrapper">
              <Switch>
                <Route exact path="/">
                  <Redirect to="/shop" />
                </Route>
                <Route path="/shop" component={Shop} />
                <Route path="/sell" component={Sell} />
                <Route path="/brands" component={BrandsPage} />
                <Route path="/product/:slug" component={ProductPage} />
                <Route path="/order/success/:id" component={OrderSuccess} />
                <Route path="/order/:id" component={OrderPage} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Signup} />
                <Route path="/seller-signup/:token" component={SellerSignup} />
                <Route path="/auth/success" component={AuthSuccess} />
                <Route
                  path="/dashboard"
                  component={Authentication(Dashboard)}
                />
                <Route path="/404" component={Page404} />
                <Route path="*" component={Page404} />
              </Switch>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authentication.authenticated,
    products: state.product.storeProducts,
  };
};

export default connect(mapStateToProps, actions)(Application);
