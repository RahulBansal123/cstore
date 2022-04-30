import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import ProductsShop from '../ProductsShop';
import BrandsShop from '../BrandsShop';

import Page404 from '../../components/Common/Page404';

class Shop extends React.PureComponent {
  componentDidMount() {
    document.body.classList.add('shop-page');
  }

  componentWillUnmount() {
    document.body.classList.remove('shop-page');
  }

  render() {
    return (
      <div className="shop">
        <Row xs="12">
          <Col
            xs="9"
            sm={{ size: 12, order: 2 }}
            md={{ size: 12, order: 2 }}
            lg={{ size: 12, order: 2 }}
          >
            <Switch>
              <Route exact path="/shop" component={ProductsShop} />
              <Route path="/shop/brand/:slug" component={BrandsShop} />
              <Route path="*" component={Page404} />
            </Switch>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Shop;
