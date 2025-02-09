/*
 *
 * Customer
 *
 */

import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import AccountMenu from '../AccountMenu';
import Page404 from '../../Common/Page404';

import Account from '../../../containers/Account';
import Address from '../../../containers/Address';
import Product from '../../../containers/Product';
import Brand from '../../../containers/Brand';
import Order from '../../../containers/Order';

const Customer = (props) => {
  return (
    <div className="seller">
      <Row>
        <Col xs="12" md="5" xl="3">
          <AccountMenu {...props} />
        </Col>
        <Col xs="12" md="7" xl="9">
          <div className="panel-body">
            <Switch>
              <Route exact path="/dashboard" component={Account} />
              <Route path="/dashboard/address" component={Address} />
              <Route path="/dashboard/product" component={Product} />
              <Route path="/dashboard/brand" component={Brand} />
              <Route path="/dashboard/orders" component={Order} />
              <Route path="*" component={Page404} />
            </Switch>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Customer;
